En este proyecto se crear un SaaS de comidas
iniciamos creando el proyecto de next
- npx create-next-app@latest
Limpiamos el proyecto

Instalamos prisma e inciamos con proveedor de PostgreSQL
- pnpm add -D prisma tsx
- pnpm add @prisma/adapter-pg @prisma/client dotenv

Inicalizamos prisma
- npx prisma init --db --output ../app/generated/prisma (--db te permite iniciar la base de datos prostgrest en la nube de prisma)

creamos el archivo pisma.config.ts y el archivo para las variables de entorno.
ademas del directorio prisma/schema.prisma

Subir schema y generar cliente
- npx prisma db push --force-reset (solo por ser la primera ves usamos el force-reset)
- npx prisma generate

Agregamos script en package.json para hacer una prueba de coneccion con la base de datos y para abrir prisma studio
"db:test":   "tsx scripts/test-database.ts",
"db:studio": "prisma studio"
