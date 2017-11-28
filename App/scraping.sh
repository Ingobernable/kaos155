#!/bin/bash
# kaos155 bash script para lanzar el scrapeo

dbu="kaosuser"		# Usuario base de datos
dbp="kaospassword"	# Password base de datos
dbh="localhost"		# Host base de datos

anoInicioBOE=2001	# año de inicio del BOE
anoInicioBORME=2009	# año de inicio del BORME
anoInicioBOCM=2010	# año de inicio del BOCM
anoActual=$(date +"%Y")	# Fecha del año actual

# COMPROBAMOS PARAMETROS

if [[ $1 == "" ]]; then
	echo "Ha de introducir un parametro. Para más información use --help"; exit
fi

if [[ $1 == "--help" ]]; then
	echo "--help Muestra esta ayuda."
	echo "--version Muestra la versión"
	echo "--stop Para el scrapeo"
	echo "--start Inicia el scrapeo"
	echo "--monitor Monitorizar scrapeo"
	exit
fi

if [[ $1 == "--version" ]]; then
        echo "Scraping kaos155 bash script 0.1"; exit
fi

if [[ $1 == "--stop" ]]; then
	# PARAR PROCESOS DE SCRAP ABIERTOS (BOE BORME Y BOCM)
	mysql -u"$dbu" -p"$dbp" -h"$dbh" bbdd_kaos155_text -e "update lastread set STOP = '1' WHERE Type = 'BOE';" 2>/dev/null | grep -v "mysql: [Warning] Using a password on the command line interface can be insecure."
	mysql -u"$dbu" -p"$dbp" -h"$dbh" bbdd_kaos155_text -e "update lastread set STOP = '1' WHERE Type = 'BORME';" 2>/dev/null | grep -v "mysql: [Warning] Using a password on the command line interface can be insecure."
	mysql -u"$dbu" -p"$dbp" -h"$dbh" bbdd_kaos155_text -e "update lastread set STOP = '1' WHERE Type = 'BOCM';" 2>/dev/null | grep -v "mysql: [Warning] Using a password on the command line interface can be insecure."

	cboe=$(pgrep -fa "node app SCRAP BOE" | awk '{ print $1, $5,$6 }' | wc -l)
	cborme=$(pgrep -fa "node app SCRAP BORME" | awk '{ print $1, $5,$6 }' | wc -l)
	cbocm=$(pgrep -fa "node app SCRAP BOCM" | awk '{ print $1, $5,$6 }' | wc -l)
	tboletin=$(($cboe + $cborme + $cbocm))

	while [ $tboletin != 0 ] ; do
		cboe=$(pgrep -fa "node app SCRAP BOE" | awk '{ print $1, $5,$6 }' | wc -l)
		pboe=$(pgrep -fa "node app SCRAP BOE" | awk '{ print $1, $5,$6 }')

		cborme=$(pgrep -fa "node app SCRAP BORME" | awk '{ print $1, $5,$6 }' | wc -l)
		pborme=$(pgrep -fa "node app SCRAP BORME" | awk '{ print $1, $5,$6 }')

		cbocm=$(pgrep -fa "node app SCRAP BOCM" | awk '{ print $1, $5,$6 }' | wc -l)
		pbocm=$(pgrep -fa "node app SCRAP BOCM" | awk '{ print $1, $5,$6 }')

		tboletin=$(($cboe + $cborme + $cbocm))
		echo "Parando Procesos [ BOE ($cboe) | BORME ($cborme) | BOCM ($cbocm) ]"; sleep 1
	done

	mysql -u"$dbu" -p"$dbp" -h"$dbh" bbdd_kaos155_text -e "update lastread set STOP = '0' WHERE Type = 'BOE';" 2>/dev/null | grep -v "mysql: [Warning] Using a password on the command line interface can be insecure."
	mysql -u"$dbu" -p"$dbp" -h"$dbh" bbdd_kaos155_text -e "update lastread set STOP = '0' WHERE Type = 'BORME';" 2>/dev/null | grep -v "mysql: [Warning] Using a password on the command line interface can be insecure."
	mysql -u"$dbu" -p"$dbp" -h"$dbh" bbdd_kaos155_text -e "update lastread set STOP = '0' WHERE Type = 'BOCM';" 2>/dev/null | grep -v "mysql: [Warning] Using a password on the command line interface can be insecure."

	echo " "
	echo "Scrapeo parado. Use --start para iniciarlo"
	exit
fi

if [[ $1 == "--start" ]]; then
	# SCRAP BOE
	echo "LANZANDO SCRAP BOE:"
	for boe in `seq $anoInicioBOE $anoActual`;
	do
		echo -n "$boe "
		node app SCRAP BOE $boe >> /dev/null &
		sleep 1 # metemos un segundo de retardo por placer
	done
	echo " "

	# SCRAP BORME

	echo "LANZANDO SCRAP BORME:"
	for borme in `seq $anoInicioBORME $anoActual`;
	do
		echo -n "$borme "
		node app SCRAP BORME $borme >> /dev/null &
		sleep 1 # metemos un segundo de retardo por placer
	done
	echo " "

	# SCRAP BOCM

	echo "LANZANDO SCRAP BOCM:"
	for bocm in `seq $anoInicioBOCM $anoActual`;
	do
        	echo -n "$bocm "
        	node app SCRAP BOCM $bocm >> /dev/null &
        	sleep 1 # metemos un segundo de retardo por placer
	done
	echo " "
	exit
fi

if [[ $1 == "--monitor" ]]; then
	# MONITOR
	while :
	do
		mysql -u"kaosuser" -p"kaospassword" -h"localhost" bbdd_kaos155_text -e "SELECT Type,Anyo,SUMARIO_LAST FROM lastread WHERE Type='BOE' AND stop='0';" | grep -v "SUMARIO_LAST" | awk '{ print $2 $3 }' | sed 's/BOE-S-20[0-9][0-9]/-/g' | rev | cut -c 3-10 | rev | tr "-" " " | awk '{ print $1 , "[" , $2 , "/ 12 ]  " }' | sed 's/ //g' > /tmp/boe.tmp ; clear
		mysql -u"kaosuser" -p"kaospassword" -h"localhost" bbdd_kaos155_text -e "SELECT Type,Anyo,SUMARIO_LAST FROM lastread WHERE Type='BORME' AND stop='0';" | grep -v "SUMARIO_LAST" | awk '{ print $2 $3 }' | sed 's/BORME-S-20[0-9][0-9]/-/g' | rev | cut -c 3-10 | rev | tr "-" " " | awk '{ print $1 , "[" , $2 , "/ 12 ]  " }' | sed 's/ //g' > /tmp/borme.tmp ; clear

		echo "BOE: "
		for lineaboe in `cat /tmp/boe.tmp`
		do
			echo -n "$lineaboe "
		done
                echo -en "\n\nBORME: "
		for lineaborme in `cat /tmp/borme.tmp`
		do
			echo -n "$lineaborme "
		done

		echo " "
		echo "Para salir de la monitorización pulse control+C"

		sleep 2
	done
	exit
fi
