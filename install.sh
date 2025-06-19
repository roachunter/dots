#!/bin/bash

packages=(
	kitty
	hyprland
	waybar
	hyprshot
	hyprpicker
	hyprlock
	hypridle
	hyprsunset
	nautilus
	slurp
	brightnessctl
	bluez
	bluez-utils
	neovim
	zsh
	zsh-syntax-highlighting
	zsh-autosuggestions
	wget
	unzip
	gtk3
	rofi-wayland
	swww
	cliphist
	ttf-jetbrains-mono-nerd
	rofi-calc
	rofimoji
	swaync
	gnome-tweaks
	lsd
	zoxide
	npm
)

yay_packages=(
	swaync-widgets-git
	matugen-bin
	vscodium-bin
	spotify
	spicetify-cli
)

INSTLOG="install.log"

function install_package() {
	echo -n "$1..."
	sudo pacman -S --noconfirm "$1" &>> "$INSTLOG"

	if pacman -Q "$1" &>> /dev/null; then
		echo "OK"
	else 
		echo "Failed to install $1. Check the logs in $INSTLOG."
		exit 0
	fi
}


function install_yay_package() {
	echo -n "$1..."
	yay -S --noconfirm "$1" &>> "$INSTLOG"

	if yay -Q "$1" &>> /dev/null; then
		echo "OK"
	else 
		echo "Failed to install $1. Check the logs in $INSTLOG."
		exit 0
	fi
}

function update() {
	echo "Updating system..."
	sudo pacman -Syu --noconfirm &>> "$INSTLOG"
	echo ""
}

function install_yay() {
	if [ ! -f /sbin/yay ]; then
		echo "Installing yay..."
		git clone https://aur.archlinux.org/yay.git &>> "$INSTLOG"
		cd yay || exit 1
		makepkg -si --noconfirm &>> ../"$INSTLOG"

		if [ -f /sbin/yay ]; then
			:
		else
			echo "Failed to install yay. Check the logs in $INSTLOG."
			exit 0
		fi
		cd ..
	fi
}


function setup() {
	echo ""
	echo -e "Installing pacman packages...\n"

	for SOFTWR in "${packages[@]}"; do
		install_package "$SOFTWR"
	done

	echo ""
	echo -e "Installing yay packages...\n"

	for SOFTWR in "${yay_packages[@]}"; do
		install_yay_package "$SOFTWR"
	done
}

function create_config_links() {
	echo ""
	echo "Creating links to configs..."

	ln -s "$1/config/"* "$HOME/.config/"
}

function conf_zsh() {
	echo -n "Configuring zsh..."
	sudo usermod --shell /usr/bin/zsh "$USER" > /dev/null 2>&1
	sudo usermod --shell /usr/bin/zsh root > /dev/null 2>&1
	ln -s "$1/zsh/.zshrc" "$HOME/"
	sudo ln -s -f "$HOME/.zshrc" "/root/.zshrc"

	git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k > /dev/null 2>&1

	sudo mkdir -p /usr/share/zsh-sudo
	sudo chown "$USER":"$USER" /usr/share/zsh-sudo/
	sudo cp "$1/zsh/sudo.plugin.zsh" /usr/share/zsh-sudo/

	echo "OK"
}

function conf_vscodium() {
	echo -n "Creating link to vscodium extensions..."
	ln -s "$1/codium" "$HOME/.vscode-oss"
	echo "OK"
}

function create_wallpaper_links() {
	mkdir -p "$HOME/Pictures"
	ln -s "$1/wallpapers" "$HOME/Pictures"
}

function enable_services() {
	sudo systemctl enable bluetooth.service
}

function conf_spicetify() {
	sudo chmod a+wr /opt/spotify
	sudo chmod a+wr /opt/spotify/Apps -R

	spicetify config prefs_path ~/.config/spotify/prefs

	mkdir "$1/spicetify"
	cd "$1/spicetify"
	wget https://github.com/spicetify/marketplace/releases/latest/download/marketplace.zip
	unzip marketplace.zip
	mv marketplace-dist marketplace
	cp -r marketplace "$HOME/.config/spicetify/CustomApps/"
	cd "$1"
	rm -rdf spicetify

	spicetify config custom_apps marketplace
	spicetify apply
}

function start_install() {
	local current_dir
	current_dir="$(pwd)"
	update
	install_yay
	setup "$current_dir"
	create_config_links "$current_dir"
	conf_zsh "$current_dir"
	conf_vscodium "$current_dir"
	create_wallpaper_links "$current_dir"
	conf_spicetify "$current_dir"

	echo "Installation completed. You can restart now."
}

if [ "$(whoami)" != "root" ]; then
	read -rep "Install? (y,n)? " CONTINST

	if [[ "$CONTINST" == "Y" || "$CONTINST" == "y" || "$CONTINST" == "yes" ]]; then
		echo "Installing..."
		start_install
	else
		echo "Exiting. No changes have been made."
		exit 0
	fi
else
	echo "Don't run this script as root."
	exit 0
fi
	
