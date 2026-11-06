
# Manhwa System

Catálogo responsive de manhwas coreanos construido con Vite, React, TypeScript y Tailwind CSS. Consume la API GraphQL de AniList para consultar listados y detalles, y permite gestionar favoritos durante la navegación.

## Desarrollo

```bash
npm install
npm run dev
```

Para validar el proyecto:

```bash
npm run lint
npm run build
```

La aplicación usa el endpoint `https://graphql.anilist.co`.

## Estructura

- `src/components`: componentes reutilizables.
- `src/pages`: páginas asociadas a las rutas.
- `src/context`: contextos globales de React.
- `src/hooks`: hooks personalizados.
- `src/types`: tipos compartidos.
- `src/services`: comunicación con APIs y servicios externos.

Tailwind CSS está integrado mediante `@tailwindcss/vite`. Las notificaciones se mostrarán con `sonner`.
