# VIA VAGRANT

Este metodo crea una maquina virtual en virtualbox mediante vagrant y la configura
mediante ansible.

Primero debes tener instalado ansible, vagrant y virtualbox en el host.

### instalacion de ansible
No instales ansible mediante paqueteria oficial, pues suelen tener versiones antiguas.
Es mejor instalarlo via pip (python package manager)

#### linux

Previamente instala ciertas dependencias de sistema, en sistemas tipo debian sería:

```sh
sudo apt-get install -y python-dev python-pip libssl-dev libffi-dev
```


```sh
sudo pip install ansible
```
####  macos
puedes instalar pip mediante brew (antes debes tener instalado brew)
https://brew.sh/index_es.html
```sh
brew install pip
```
o tambien puedes instalarlo via easy_install
```sh
sudo easy_install pip
```
Una vez instalado pip, instala ansible:

```sh
sudo pip install ansible
```


#### windows
windows es un sistema privativo y deberias plantear usar alternativas libres.
Aun así puedes instalar ansible siguiendo las instrucciones que se detallan aqui:
https://ericsysmin.com/2016/07/28/install-ansible-on-windows/


### instalacion de vagrant y virtualbox

Vagrant y virtualbox tienen paquetes para todas las plataformas, puedes descargarlos aqui:

https://www.vagrantup.com/downloads.html

https://www.virtualbox.org/wiki/Downloads

### ejecución

Si ya tienes instalado ansible, virtualbox y vagrant, ya puedes levantar el entorno:

```sh
git clone https://github.com/Softman65/kaos155.git
cd kaos155
vagrant up
```

Puedes cambiar la configuracion desde el fichero "vagrant-config"

Por defecto la maquina virtual se levanta con la ip 10.10.0.10
Puedes iniciar una session ssh en la maquina con el comando:
```sh
vagrant ssh
```
Puedes experimentar y destrozar la maquina virtual sin consecuencias. Para regenerarla:
```sh
vagrant destroy -f && vagrant up
```
Puedes editar cualquier fichero del repo, el contenido de la carpeta kaos155 que has clonado, corresponde a la carpeta "/vagrant" dentro de la maquina virtual

# VIA INSTALACION MANUAL EN GNU/Linux
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
# wget http://www.xpdfreader.com/dl/xpdf-tools-linux-4.00.tar.gz
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
# cd kaos155\app
# npm upgrade
```

Paso 6: Creamos la base de datos y el usuario/password

Para ello accederemos como root a mysql. Por ejemplo así: mysql -u root -p (en el caso de no tener password para el usuario root simplemente mysql -u root)

Una vez dentro de la consola de MySQL los comandos son los siguientes:

```
mysql> CREATE DATABASE bbdd_kaos155;
mysql> GRANT ALL ON bbdd_kaos155.* TO 'kaosuser'@'localhost' IDENTIFIED BY 'kaospassword';
```

Con control+D podemos salir de la consola MySQL.

Paso 7: Anotamos el usuario y password creados en el archivo ACCESO_mysql.json

Encontraremos uno llamado ACCESO_mysql-example.json en el directorio sqlfiles que renombraremos a ACCESO_mysql.json

```
cd sqlfiles/
mv ACCESO_mysql-example.json ACCESO_mysql.json
nano ACCESO_mysql.json
```

Anotaremos los cambios (usuario y password) en el archivo tal que así:

```
{"mySQL":{"host":"127.0.0.1","user":"kaosuser","password":"kaospassword"}}
```

Para guardar los cambios con el editor nano usaremos Control+o y para salir Control+x


Paso 8: Importamos las tablas del archivo CREATE_COMPLETO.sql

```
# mysql -u root -p bbdd_kaos155 < CREATE_COMPLETO.sql
```

Paso 9: cargar los plugins externos

```
# cd ..
# chown -R root:root *
# cd app
# npm upgrade
```

Paso 10: Comenzar con el scraping

Hemos de tener en cuenta que dependiendo del boletín que se va a scrapear hemos de saber desde cuando.
El BOE desde el 2001, el BORME desde el 2009 y el BOCM desde 2010.

```

# node app SCRAP BOE 2001
# node app SCRAP BORME 2009
# node app SCRAP BOCM 2010
```


# VIA ANSIBLE

Los datos de ansible estan separados de la lógica en las variables del inventario. Puedes crear un inventario personalizado que instale y configure kaos155 en cualquier maquina[s] (siempre que sea sistema operativo debian-like ) No es requisito pero si recomendable que añadas una relacion de confianza entre las maquinas para la session ssh (importar tu clave publica)
Para mas informacion consulta al equipo de kaos o la documentacion oficial de ansible.


# VIA DOCKER
Pendiente de hacer
