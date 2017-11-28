#!/bin/bash
# kaos155 bash script para lanzar el scrapeo

dbu="kaosuser"		# Usuario base de datos
dbp="kaospassword"	# Password base de datos
dbh="localhost"		# Host base de datos

anoInicioBOE=2001	# año de inicio del BOE
anoInicioBORME=2009	# año de inicio del BORME
anoInicioBOCM=2010	# año de inicio del BOCM
anoActual=$(date +"%Y")	# Fecha del año actual

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

# SCRAP BOE

for boe in `seq $anoInicioBOE $anoActual`;
do
	echo "[+] node app SCRAP BOE $boe"
	node app SCRAP BOE $boe >> /dev/null &
	sleep 1 # metemos un segundo de retardo por placer
done

# SCRAP BORME

for borme in `seq $anoInicioBORME $anoActual`;
do
	echo "[+] node app SCRAP BORME $borme"
	node app SCRAP BORME $borme >> /dev/null &
	sleep 1 # metemos un segundo de retardo por placer
done


# SCRAP BOCM

for bocm in `seq $anoInicioBOCM $anoActual`;
do
        echo "[+] node app SCRAP BOCM $bocm"
        node app SCRAP BOCM $bocm >> /dev/null &
        sleep 1 # metemos un segundo de retardo por placer
done
