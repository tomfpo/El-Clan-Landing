# Landing Papelera El Clan

Landing estática en español para Papelera El Clan, lista para servir directamente
o desplegar en Vercel sin build.

## Estructura

- `index.html`: contenido principal de la landing.
- `styles.css`: estilos responsive y presentación visual.
- `assets/site-data.js`: fuente única para datos comerciales repetidos.
- `assets/site-render.js`: aplica esos datos y conserva fallbacks legibles.
- `assets/brand/`: imágenes de marca y recursos visuales.
- `assets/icons/`: favicons e iconos para navegadores y dispositivos.
- `tools/check-site-data.mjs`: control de divergencias en datos comerciales.
- `vercel.json`: configuración mínima para servir los archivos estáticos.

## Desarrollo local

Abrir `index.html` directamente en el navegador o servir la raíz con cualquier
servidor estático.

## Datos comerciales

Teléfono, WhatsApp, dirección, horarios, redes, Maps, valoración y textos
comerciales repetidos se actualizan en `assets/site-data.js`.

Las páginas consumen esos datos mediante atributos `data-site-*` y mantienen
fallbacks legibles para que la apertura directa del HTML siga funcionando.

Después de cambiar HTML, bindings o datos comerciales, ejecutar:

```sh
node tools/check-site-data.mjs
```

También puede ejecutarse antes de editar para obtener un baseline. Los cambios
visuales o de contenido deben revisarse en el navegador, incluyendo layout
responsive, enlaces, fallbacks, semántica, textos alternativos y metadatos.

## Deploy en Vercel

1. Importar el repositorio en Vercel.
2. Seleccionar `Other` como framework.
3. Usar la raíz del proyecto como directorio de salida.
