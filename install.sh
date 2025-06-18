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
)

yay_packages=(
	swaync-widgets-git
	matugen-bin
	vscodium-bin
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

function copy_conf() {
	echo ""
	echo "Copying configuration..."

	cp -r "$1/config/"* "$HOME/.config/"
}

function conf_zsh() {
	echo -n "Configuring zsh..."
	sudo usermod --shell /usr/bin/zsh "$USER" > /dev/null 2>&1
	sudo usermod --shell /usr/bin/zsh root > /dev/null 2>&1
	cp "$1/zsh/.zshrc" "$HOME/"
	sudo ln -s -f "$HOME/.zshrc" "/root/.zshrc"

	git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k > /dev/null 2>&1

	sudo mkdir -p /usr/share/zsh-sudo
	sudo chown "$USER":"$USER" /usr/share/zsh-sudo/
	sudo cp "$1/zsh/sudo.plugin.zsh" /usr/share/zsh-sudo/

	echo "OK"
}


function start_install() {
	local current_dir
	current_dir="$(pwd)"
	update
	install_yay
	setup "$current_dir"
	copy_conf "$current_dir"
	conf_zsh "$current_dir"

	echo "Installation completed."
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
	
