#!/bin/bash

# ------------------------------------------------------------------------------
# Este script selecciona una imagen aleatoria de ~/wallpapers y la establece
# como fondo de pantalla usando swww con una animación personalizada.
# ------------------------------------------------------------------------------

WALLPAPER_DIR="$HOME/Pictures/wallpapers/"

# Verifica si el directorio existe
if [ ! -d "$WALLPAPER_DIR" ]; then
  echo "El directorio $WALLPAPER_DIR no existe. Por favor, crea la carpeta y pon ahí tus fondos."
  exit 1
fi

# Obtiene una imagen aleatoria (considerando extensiones comunes)
RANDOM_WALLPAPER=$(find "$WALLPAPER_DIR" -type f \( -iname "*.jpg" -o -iname "*.gif" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.bmp" \) | shuf -n 1)

# Verifica que se haya encontrado al menos un archivo
if [ -z "$RANDOM_WALLPAPER" ]; then
  echo "No se encontraron imágenes en $WALLPAPER_DIR."
  exit 1
fi

# Si swww no está iniciado, lo iniciamos
if ! pgrep -x "swww-daemon" > /dev/null; then
  swww-daemon
  sleep 1  # Una pequeña espera para que swww arranque correctamente
fi

# Establece el fondo con una animación bonita
# Puedes ajustar los parámetros --transition-type, --transition-duration y --transition-step
#swww img "$RANDOM_WALLPAPER" \
#  --transition-type grow \
#  --transition-step 60 \
#  --transition-duration 2 \
#  --transition-fps 60

matugen image "$RANDOM_WALLPAPER"

echo "Fondo de pantalla cambiado a: $RANDOM_WALLPAPER"
