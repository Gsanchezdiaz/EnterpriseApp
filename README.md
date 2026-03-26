En este proyecto se crear un SaaS de comidas
iniciamos creando el proyecto de next
- npx create-next-app@latest
Limpiamos el proyecto

Instalamos prisma e inciamos con proveedor de PostgreSQL
- pnpm add -D prisma tsx
- pnpm add @prisma/adapter-pg @prisma/client dotenv

Inicalizamos prisma
- npx prisma init --db --output ../app/generated/prisma 
(--db te permite iniciar la base de datos prostgrest en la nube de prisma)

Si no nos autenticamos con prisma, debemos:
crear el archivo pisma.config.ts y el archivo para las variables de entorno.
ademas del directorio prisma/schema.prisma

Subir schema y generar cliente
- npx prisma generate (Una sola vez al iniciar el proyecto o si alguien mas del equipo actualizo el esquema)

Para enviar los cambios del esquema a la base de datos usamos los siguientes comandos:
- npx prisma migrate dev --name add_field_table (aplica los cambios guardando un historial de migraciones)
- npx prisma db push --force-reset (solo por ser la primera ves usamos el force-reset) (sin historial)

Agregamos script en package.json para hacer una prueba de coneccion con la base de datos y para abrir prisma studio
- "db:test": "tsx scripts/test-database.ts",
- "db:studio": "prisma studio"

Instalamos paquetes de componentes de ShadCN
- pnpm dlx shadcn@latest init (para este proyecto usamos radix-ui y style nova)
usar este comando instalara la configuracion por defecto de colores y themas,
si deseas perzonalizar, deberias usar la web de shadcn en la opcion create, luego de definir todo te devolverla un comando personalidazado
con toda la configuracion
- pnpm dlx shadcn@latest init --preset b1Kjm7FNPV --template next --force