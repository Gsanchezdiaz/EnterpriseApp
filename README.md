En este proyecto se crear un SaaS de comidas
iniciamos creando el proyecto de next
- npx create-next-app@latest
Limpiamos el proyecto
Instalamos prisma e inciamos con proveedor de SQLite
- npm i prisma --save-dev
- npx prisma init --datasource-provider sqlite --output ../generated/prisma
migramos
- npx prisma migrate dev
