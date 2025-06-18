is_hdmi_enabled() {

  # 2. Obtener la salida completa
  local monitor_info
  monitor_info="$(hyprctl monitors all)"

  # 3. Verificar que exista el texto "HDMI-A-1" en la salida
  #    (Asegúrate de que sea el nombre real exacto de tu salida)
  if echo "$monitor_info" | grep 'HDMI-A-1'; then
    
    return "HDMI-A-1 Salida no encontrada"
  fi

}