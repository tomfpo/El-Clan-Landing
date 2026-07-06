# AGENTS.md

## Proyecto

Sitio estatico de Papelera El Clan. Los archivos principales son:

- `index.html`: contenido y estructura de la landing.
- `styles.css`: estilos responsive y visuales.
- `assets/`: imagenes de marca, favicons e iconos.
- `vercel.json`: configuracion minima para servir el sitio en Vercel.

## Reglas locales

- Usar datos del README, archivos versionados o confirmacion del usuario. No inventar beneficios, horarios, zonas, condiciones de envio ni datos comerciales.
- Mantener textos visibles en espanol natural; se permiten acentos si el archivo queda UTF-8 correcto.
- Mantener categorias amplias como papelera, bolsas y descartables; no listar productos especificos no confirmados.
- Priorizar consulta directa cuando exista un dato confirmado. Si falta WhatsApp, telefono o email y la tarea lo pide, se puede dejar una estructura con placeholder claramente pendiente, sin presentarlo como dato real.
- Conservar la identidad actual, logo, paleta general y estructura simple salvo pedido explicito.
- Reutilizar assets existentes. Se pueden optimizar si se conserva apariencia, rutas esperadas y marca.
- No agregar frameworks, build steps ni dependencias salvo pedido explicito.
- Mantener compatibilidad con apertura directa de `index.html`.
- Al tocar HTML, conservar semantica, `alt`, labels, meta descripcion y enlaces accesibles.
- Mantener compatibilidad con Vercel como proyecto estatico tipo `Other`.

## Verificacion

- Para cambios visuales o de contenido, abrir `index.html` en navegador y revisar que la pagina cargue sin roturas visibles.
- No asumir que hay npm, tests automatizados o servidor local obligatorio.
- No tratar mojibake de PowerShell como corrupcion sin verificar UTF-8 por otro medio.
