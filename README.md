# Tienda demo

Tienda online estática hecha con Astro. Muestra un catálogo de productos con filtros y carrito; los pedidos se preparan para enviar por WhatsApp.

## Desarrollo local

```sh
npm install
npm run dev
```

## Configuración de la tienda

- Edita `src/data/products.json` para agregar o actualizar productos.
- Edita `src/data/business.json` para cambiar el nombre, los datos del local y el número de WhatsApp (con código de país, solo números).
- Guarda las imágenes de los productos en `public/products/` y referencia cada archivo desde el catálogo.

## Publicar en Cloudflare Pages

Importa este repositorio en Cloudflare Pages y usa estos valores:

| Opción | Valor |
| --- | --- |
| Rama de producción | `main` |
| Comando de compilación | `npm run build` |
| Directorio de salida | `dist` |

El sitio se genera como contenido estático; no necesita un adaptador de servidor de Astro. Pages puede compilar y publicar cada cambio que llegue a la rama conectada.
