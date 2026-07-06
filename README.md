# Landing Papelera El Clan

Landing inicial estatica para Papelera El Clan, lista para deploy en Vercel.

## Estructura

- `index.html`: contenido principal de la landing.
- `styles.css`: estilos responsive y visuales.
- `assets/site-data.js`: fuente unica para datos comerciales repetidos.
- `assets/site-render.js`: aplica los datos comerciales en las paginas estaticas.
- `assets/brand`: imagenes de marca y recursos visuales del negocio.
- `assets/icons`: favicons e iconos para navegadores y dispositivos.
- `tools/check-site-data.mjs`: control antidrift para datos comerciales.
- `vercel.json`: configuracion minima para servir archivos estaticos.

## Desarrollo local

Abrir `index.html` en el navegador o servir la carpeta con cualquier servidor estatico.

## Datos comerciales

Telefono, WhatsApp, direccion, horarios, redes, Maps, valoracion y textos
comerciales repetidos se actualizan solo en `assets/site-data.js`.

Las paginas deben consumir esos datos con atributos `data-site-*` y conservar
fallbacks legibles para apertura directa del HTML.

Antes de agregar o tocar paginas, correr:

```sh
node tools/check-site-data.mjs
```

## Deploy en Vercel

1. Importar el repositorio en Vercel.
2. Dejar el framework como `Other`.
3. Usar la raiz del proyecto como directorio de salida.
