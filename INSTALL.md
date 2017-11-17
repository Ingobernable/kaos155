# Vagrant

Primero debes tener instalado vagrant y virtualbox, puedes descargarlos desde aqui:

https://www.vagrantup.com/downloads.html
https://www.virtualbox.org/wiki/Downloads


Después ya puedes descargar el codigo y levantarlo:

```sh
git clone https://github.com/Softman65/kaos155.git
cd kaos155
vagrant up
```

Puedes cambiar la configuracion desde el fichero "vagrant-config"

Por defecto la maquina virtual se levanta con la ip 10.10.0.10
Puedes entrar en la maquina con el comando:
```sh
vagrant ssh
```
y volver restaurar su configuracion con el comando:

```sh
vagrant provision
```


# DOCKER
in progress
