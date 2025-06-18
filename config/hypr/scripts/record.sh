#!/usr/bin/env bash

################################################################################
# Script para grabar pantalla con wf-recorder, detectando monitores con hyprctl
# o xrandr. Prefiere "HDMI-A-1" si está activo; si no, usa "eDP-1".
#
# Uso:
#   record.sh fullscreen  -> Grabar pantalla completa
#   record.sh section     -> Grabar una región con slurp
#   record.sh stop        -> Detener la grabación
################################################################################

SAVEDIR="$HOME/Videos/record"
mkdir -p "$SAVEDIR"

PIDFILE="/tmp/wf-recorder.pid"
VIDFILE="/tmp/wf-recorder-video.txt"

###############################################################################
# Función para detectar el monitor que usaremos
###############################################################################
detect_output() {
  local ACTIVE_MONITORS=""

  # 1) Detectar herramienta disponible
  if command -v hyprctl &> /dev/null; then
    # hyprctl
    ACTIVE_MONITORS=$(hyprctl monitors | grep "Monitor" | awk '{print $2}')
  elif command -v xrandr &> /dev/null; then
    # xrandr
    ACTIVE_MONITORS=$(xrandr --listactivemonitors | tail -n +2 | awk '{print $NF}')
  else
    # No se encontró hyprctl ni xrandr
    echo "Error: No se detectó hyprctl ni xrandr." >&2
    exit 1
  fi

  # 2) Verificar cuál de los monitores nos interesa
  if echo "$ACTIVE_MONITORS" | grep -q "HDMI-A-1"; then
    OUTPUT="HDMI-A-1"
  elif echo "$ACTIVE_MONITORS" | grep -q "eDP-1"; then
    OUTPUT="eDP-1"
  else
    # Si no detectamos nada, forzamos eDP-1 como fallback
    OUTPUT="eDP-1"
  fi
}

###############################################################################
# Función para generar el siguiente nombre de archivo: Video1.mp4, Video2.mp4, etc.
###############################################################################
get_next_filename() {
  local file_num=1
  while [ -e "$SAVEDIR/Video${file_num}.mp4" ]; do
    ((file_num++))
  done
  echo "$SAVEDIR/Video${file_num}.mp4"
}

###############################################################################
# Grabación de pantalla completa
###############################################################################
start_fullscreen() {
  detect_output  # Determina cuál de los dos monitores usar

  local FILENAME
  FILENAME="$(get_next_filename)"

  wf-recorder \
    -a \
    -o "$OUTPUT" \
    -c h264_vaapi \
    -f "$FILENAME" &

  PID=$!
  echo "$PID" > "$PIDFILE"
  echo "$FILENAME" > "$VIDFILE"

  notify-send "Grabación iniciada" \
              "Grabando en $OUTPUT\nArchivo: $(basename "$FILENAME")"
}

###############################################################################
# Grabación de una sección seleccionada
###############################################################################
start_section() {
  detect_output

  if ! command -v slurp &>/dev/null; then
    notify-send "Error" "No se encontró 'slurp' para seleccionar una región."
    exit 1
  fi

  local GEOMETRY
  GEOMETRY="$(slurp)"
  if [ -z "$GEOMETRY" ]; then
    notify-send "Grabación cancelada" "No se seleccionó ninguna región."
    exit 0
  fi

  local FILENAME
  FILENAME="$(get_next_filename)"

  wf-recorder \
    -a \
    -o "$OUTPUT" \
    -c h264_vaapi \
    -g "$GEOMETRY" \
    -f "$FILENAME" &

  PID=$!
  echo "$PID" > "$PIDFILE"
  echo "$FILENAME" > "$VIDFILE"

  notify-send "Grabación iniciada" \
              "Grabando región: $GEOMETRY en $OUTPUT\nArchivo: $(basename "$FILENAME")"
}

###############################################################################
# Detener la grabación
###############################################################################
stop_recording() {
  if [ -f "$PIDFILE" ]; then
    local PID
    PID="$(cat "$PIDFILE")"
    kill "$PID" 2>/dev/null
    rm "$PIDFILE"

    local FILE_RECORDED="(desconocido)"
    if [ -f "$VIDFILE" ]; then
      FILE_RECORDED="$(cat "$VIDFILE")"
      rm "$VIDFILE"
    fi

    notify-send "Grabación detenida" \
                "Archivo guardado: $(basename "$FILE_RECORDED")"
  else
    notify-send "Error" "No se encontró una grabación en curso."
  fi
}

###############################################################################
# Lógica principal según el parámetro
###############################################################################
case "$1" in
  fullscreen)
    start_fullscreen
    ;;
  section)
    start_section
    ;;
  stop)
    stop_recording
    ;;
  *)
    echo "Uso: $0 {fullscreen|section|stop}"
    exit 1
    ;;
esac
