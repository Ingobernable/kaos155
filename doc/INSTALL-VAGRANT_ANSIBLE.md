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


# VIA ANSIBLE

Los datos de ansible estan separados de la lógica en las variables del inventario. Puedes crear un inventario personalizado que instale y configure kaos155 en cualquier maquina[s] (siempre que sea sistema operativo debian-like ) No es requisito pero si recomendable que añadas una relacion de confianza entre las maquinas para la session ssh (importar tu clave publica)
Para mas informacion consulta al equipo de kaos o la documentacion oficial de ansible.


