#!/bin/bash
# Script para automatizar el scrapeo de datos de BOE, BORME, BOCM. Concretamente para BOE
# A mano se lanza así:
# node app SCRAP BOE 2001
# node app SCRAP BORME 2009
# node app SCRAP BOCM 2010
# Es decir, se lanza indicando BOE/BORME/BOCM y luego el AÑO.
# Este script es para no tener que andar lanzando a mano. Lo lanzará todo del tirón.
# bash scraping-BOE

anoInicioBOE=2001
anoInicioBORME=2009
anoInicioBOCM=2010
anoActual=$(date +"%Y")
mkdir -p logs
rm -rf logs/BOE logs/BORME logs/BOCM
mkdir -p logs/BOE
mkdir -p logs/BORME
mkdir -p logs/BOCM


for boe in `seq $anoInicioBOE $anoActual`;
do
	echo "[+] node app SCRAP BOE $boe"
	node app SCRAP BOE $boe >> logs/BOE/BOE$boe.log 2>> logs/BOE/BOE$boe.errores.log &
	sleep 1
done


