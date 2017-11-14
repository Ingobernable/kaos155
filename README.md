kaos155

Herramienta para la obtención de datos de Contratación con la administración pública y relaciones societarias en España.

Es una herramienta de software libre bajo los terminos de la licencia GPL 3 (ver archivo LICENSE para más detalles).

Formas de contactar

Puedes contactar con nosotros/as de varias formas ya sea para sumarte al proyecto, participar puntualmente, realizarnos preguntas, ...

De forma presencial.

De forma presencial nos reunimos cada x tiempo en el centro social de comunes urbanos la Ingobernable. Concretamente nos reunimos en la sala 301, el Hacklab del centro. Las reuniones presenciales son un buen momento para conocernos fisicamente y seguir trabajando. La Ingobernable es un centro social que se encuentra en Madrid, en la calle Gobernador 39.

Unirse a la lista de correo

Puedes subscribirte a la lista de correo ( kaos@listas.ingobernable.net ) desde aquí: https://listas.ingobernable.net/cgi-bin/mailman/listinfo/kaos

Instalación en GNU/Linux

Debian 9

Para instalar Kaos155 en Debian GNU/Linux 9 podemos seguir los siguientes pasos. Recomendable montar Kaos155 en una debian 9 recien instalada.

Paso 0: Actualizar repositorios y sistema:

# apt-get update && apt-get upgrade
Paso 1: Instalar dependencias:

# apt-get install git wget curl software-properties-common gnupg2 man nano
Paso 2: Instalar nodejs y npm

# curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
# apt-get install nodejs
Paso 3: Instalar MySQL 5.7

# wget -O /tmp/RPM-GPG-KEY-mysql https://repo.mysql.com/RPM-GPG-KEY-mysql
# apt-key add /tmp/RPM-GPG-KEY-mysql
# apt-get update
# wget https://dev.mysql.com/get/mysql-apt-config_0.8.9-1_all.deb
# dpkg -i mysql-apt-config_0.8.9-1_all.deb 
# apt-get update
# apt-get install mysql-server
Paso 4: Descargar e instalar xpdf tools 4.0

# wget http://www.xpdfreader.com/dl/xpdf-tools-linux-4.00.tar.gz
# tar xfvz xpdf-tools-linux-4.00.tar.gz
# cd xpdf-tools-linux-4.00
# cp -pRv bin64/* /usr/local/bin/
# mkdir /usr/local/man/man1 /usr/local/man/man5
# cp -pRv doc/*.1 /usr/local/man/man1/
# cp -pRv doc/*.5 /usr/local/man/man5/
Paso 5: Clonamos el repositorio Kaos155

# git clone https://github.com/Ingobernable/kaos155
# cd kaos155
Paso 6: Creamos la base de datos y el usuario/password

Para ello accederemos como root a mysql. Por ejemplo así: mysql -u root -p (en el caso de no tener password para el usuario root simplemente mysql -u root)

Una vez dentro de la consola de MySQL los comandos son los siguientes:

mysql> CREATE DATABASE bbdd_kaos155;
mysql> GRANT ALL ON bbdd_kaos155.* TO 'kaosuser'@'localhost' IDENTIFIED BY 'kaospassword';
Con control+D podemos salir de la consola MySQL.

Paso 7: Anotamos el usuario y password creados en el archivo ACCESO_mysql.json

Encontraremos uno llamado ACCESO_mysql-example.json en el directorio sqlfiles que renombraremos a ACCESO_mysql.json

cd sqlfiles/
mv ACCESO_mysql-example.json ACCESO_mysql.json
nano ACCESO_mysql.json
Anotaremos los cambios (usuario y password) en el archivo tal que así:

{"mySQL":{"host":"127.0.0.1","user":"kaosuser","password":"kaospassword"}}
Para guardar los cambios con el editor nano usaremos Control+o y para salir Control+x

Paso 8: Importamos las tablas del archivo CREATE_COMPLETO.sql

# mysql -u root -p bbdd_kaos155 < CREATE_COMPLETO.sql
Paso 9: Comenzar con el scraping

# cd ..
# chown -R root:root *
# cd BormeApp
# npm upgrade
# node app BOE 2001
# node app BORME 2009
# node app BOCM 2010
Actualmente se lanza así para cada año y tipo pero en unos días esto cambiará y se realizará ejecutando un script en bash.







