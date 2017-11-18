VAGRANTFILE_API_VERSION = "2"

## load config file
require 'yaml'
vagrant_env = ENV['vagrant_env'] ||= "develop"
settings = YAML.load_file 'vagrant-config.yml'
settings = settings[vagrant_env]

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # VARIABLES
  ipadd = settings['ip']
  project_name = settings['name']
# config.vm.box = "bento/ubuntu-16.04"
  config.vm.box = "bento/debian-9.2"
	config.vm.hostname = project_name

	config.vm.provider "virtualbox" do |v|
		v.name = project_name
		v.memory = settings['memory']
		v.cpus = settings['cpus']
	end

	config.vm.provision "ansible" do |ansible|
	    ansible.playbook = settings['ansible_playbook']
      ansible.verbose = "v"
      if settings['verbose']
  	    ansible.verbose = "vvv"
      end
      ansible.inventory_path = settings['ansible_inv_path']
	    ansible.limit = "all"
      ansible.extra_vars = {
        node_target: settings['node_target'],
        node_year: settings['node_year']
       }
	end

  config.vm.network "private_network", ip: ipadd

  if settings['port_forwarding']
    config.vm.network "forwarded_port", guest: 80, host: 80
    config.vm.network "forwarded_port", guest: 443, host: 443
  end

  puts "la ip de la maquina es #{ipadd}"

end
