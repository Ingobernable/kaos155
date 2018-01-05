# INSTALACION MANUAL DE KAOS155 EN GNU/Linux

Estos pasos son para montar la versión "Cospedal" de kaos155. La versión "Cospedal" solamente contempla la parte de SCRAP.
Futuras versiones contemplarán la parte PARSER y WEB. Por el momento "Cospedal" es solo para SCRAP de datos.

### Debian 9

Paso 0: Actualizar repositorios y sistema:

```
# apt-get update && apt-get upgrade
```

Paso 1: Instalar dependencias:

```
# apt-get install git wget curl software-properties-common gnupg2 man nano
```

Paso 2: Instalar nodejs y npm

```
# curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
# apt-get install nodejs
```

Paso 3: Instalar MySQL 5.7

```
# wget -O /tmp/RPM-GPG-KEY-mysql https://repo.mysql.com/RPM-GPG-KEY-mysql
# apt-key add /tmp/RPM-GPG-KEY-mysql
# apt-get update
# wget https://dev.mysql.com/get/mysql-apt-config_0.8.9-1_all.deb
# dpkg -i mysql-apt-config_0.8.9-1_all.deb
# apt-get update
# apt-get install mysql-server
```

Paso 4: Descargar e instalar xpdf tools 4.0


```
# wget https://xpdfreader-dl.s3.amazonaws.com/xpdf-tools-linux-4.00.tar.gz  (new)
# tar xfvz xpdf-tools-linux-4.00.tar.gz
# cd xpdf-tools-linux-4.00
# cp -pRv bin64/* /usr/local/bin/
# mkdir /usr/local/man/man1 /usr/local/man/man5
# cp -pRv doc/*.1 /usr/local/man/man1/
# cp -pRv doc/*.5 /usr/local/man/man5/
```

Paso 5: Clonamos el repositorio Kaos155

```
# git clone https://github.com/Ingobernable/kaos155
# cd kaos155
```

Paso 6: Creamos las base de datos y el/los usuarios/password

Para ello accederemos como root a mysql. Por ejemplo así: mysql -u root -p (en el caso de no tener password para el usuario root simplemente mysql -u root)

Una vez dentro de la consola de MySQL los comandos son los siguientes:

```
mysql> CREATE DATABASE bbdd_kaos155_text;
mysql> GRANT ALL ON bbdd_kaos155_text.* TO 'kaosuser'@'localhost' IDENTIFIED BY 'kaospassword';
```

Con control+D podemos salir de la consola MySQL.
Anotamos el usuario y password ya que luego lo tendremos que meter.

Paso 7: Importamos las tablas del archivo CREATE_DB_SCRAP.sql y  CREATE_DB_PARSER.sql

Para ello hemos de acceder al directorio app/sqlfiles y luego importarlo con mysql

```
# cd app/sqlfiles
# mysql -u root -p bbdd_kaos155 < CREATE_DB_SCRAP.sql
```

Paso 8: cargar los plugins/dependencias externas de NODE JS

```
# cd ..
# chown -R root:root *
# npm upgrade
```

Paso 9: arrancar la aplicación y proporcionarle las credenciales de acceso a las DB mysql

```
# node app
    SCRAP
    DELETE
    EXIT
    --------------
    mysql IP?
    mysql user?
    mysql passw?

```
seleccionar del menu la opción SCRAP y pedirá credenciales para la DB de textos(bbdd_kaos155_text), la opcion PARSER pedira credenciales para la DB de resultados(bbdd_kaos155)

Paso 10: Comenzar con el scraping

Hemos de tener en cuenta que dependiendo del boletín que se va a scrapear hemos de saber desde cuando.
El BOE desde el 2001, el BORME desde el 2009 y el BOCM desde 2010.

Con "node app" ejecutaremos Kaos155 "Cospedal" para poder realizar scrapeo de BOE, BORME y BOCM.
Irá realizandose el scrapeo por cada año que indiquemos. 

Los caracteres que salen en el SCRAP tienen significado. En el caso de BOE/BOCM:

```
.   = BOLETIN leyendo
xxx = BOLETIN fallido 
%   = BOLETIN ya analizado
S   = SUMARIO leyendo
fff = SUMARIO no encontrado
#   = SUMARIO duplicado
+   = CONTRATO anotando
-   = NO CONTRATO anotando
```

En el caso de BORME veremos el nombre de la Provincia y el indicativo de leyendo:

```
.   = BOLETIN leyendo 
```

En resumen: 

BOE BOCM = Contratos
BORME = Temas de empresas, altas, bajas, quiebras, cargos, cambios de dirección, etc ...

Para realizar el SCRAP de golpe existen unos script en bash que pueden ejecutarse para que se realice del tirón.

Se deben de lanzar simultaneamente todos los años de cada tipo, el proceso de SCRAPEO completo dura en torno a 8 horas dependiendo este factor de la capacidad de procesamiento, el tamaño final de la DB de textos es de 3.4 GB
