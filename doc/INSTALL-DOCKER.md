# INSTALAR VIA DOCKER
## Dependencias:
* demonio docker:
Docker se puede instalar facilmente en multitud de sistemas:
https://docs.docker.com/engine/installation/
* docker-compose [OPCIONAL]
docker-compose se puede instalar via pip
```sh
pip install docker-compose
```
En windows / mac viene junto con el instalador:
https://docs.docker.com/compose/install/


## instalar
### con docker-compose

La manera mas comoda es usar el docker-compose.
Una vez clonado el repo y dentro del proyecto:

```sh
git clone https://github.com/Ingobernable/kaos155
cd kaos155
```

Ejecutamos el docker compose:

```sh
docker-compose up --build
```

Para mas opciones del comando "docker-compose" visita la documentacion:
https://docs.docker.com/compose/reference/overview/

La aplicación se levanta con varios valores por defecto que puedes cambiar en el
fichero **docker-compose.yml**, como el comando node (junto con sus parametros),
o el usuario/ contraseña de acceso a la Base de datos (por defecto: kaos / password)
Puedes mapear puertos del host al container o hacer la Base de datos persistente.


## instalar
### con docker CLI

Primero hay que hacer build de las imagenes:

```sh
docker build -t kaos155_database docker/database
docker build -t kaos155_app docker/app
```
despues podremos lanzar instancias de las imagenes:

mysql:
```sh
docker run -d --name kaos_mysql -e "MYSQL_ROOT_PASSWORD=mypassword" \
-e "MYSQL_USER=kaos" -e "MYSQL_PASSWORD=mypassword" kaos155_database
```

node:
```sh
docker run -d --name kaos_node -e "KAOS_MYSQL_SCRAP_HOST=kaos_mysql" \
-e "KAOS_MYSQL_SCRAP_USER=kaos" -e "KAOS_MYSQL_SCRAP_PASS=mypassword" \
--link "kaos_mysql" kaos155_app node app.js SCRAP BOE 2011
```

Para mas informacion de los comandos y opciones disponibles
```sh
docker --help
```
O visita la documentacion:
https://docs.docker.com/engine/reference/run
