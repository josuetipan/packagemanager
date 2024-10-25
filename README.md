<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Plantilla para crear un microservicio

## Descripción

Esta plantilla te permite crear un microservicio basado en [NestJS](https://nestjs.com/) con el ejemplo de gestión de usuarios. Incluye configuración para Prisma como gestor de bases de datos y está diseñada con una arquitectura hexagonal.

## Como empezar

Clona el repositorio usando el metodo que gustes

Usando HTTP

```bash
git clone https://github.com/UnCompa/microservicio-plantilla
```

Usando SSH

```bash
git clone git@github.com:UnCompa/microservicio-plantilla.git
```

## Instalar dependecias

Al clonar la plantilla ejecuta el comando para instalar los paquetes necesarios

Usando NPM

```bash
npm install
```

Usando PNPM

```bash
pnpm install
```

## Creacion de tablas con prisma

Dado que el proyecto usa prisma como gestor de la base de datos debes seguir estos pasos

```bash
#1. Empezar prisma
$ npx prisma init
#2. Generar tablas
$ npx prisma generate
#3. Generar migracion
$ npx prisma migrate dev
```

> [!IMPORTANT]
> Ejecutar el paso 1 y 2 dos para que el proyecto funcione ademas de colocar correctamente las variables de entorno de tu base de datos local

### Sincronizar tablas

Para traer los datos de la tabla se usa el comando:

```bash
#Para traer los datos de la tabla
$ npx prisma db pull
```

Para enviar los cambios en los modelos

```bash
#Para traer los datos de la tabla
$ npx prisma db push
```

## Ejecutar el proyecto 🚀

Una vez que hayas configurado Prisma y las variables de entorno, puedes compilar y ejecutar el proyecto con los siguientes comandos:

Con NPM

```bash
# Desarrollo
$ npm run start

# Modo watch
$ npm run start:dev

# Construir aplicación
$ npm run build

# Produccion
$ npm run start:prod
```

Con PNPM

```bash
# Desarrollo
$ pnpm run start

# Modo watch
$ pnpm run start:dev

# Construir aplicación
$ pnpm run build

# Produccion
$ pnpm run start:prod
```

## Ejecutar tests

Con NPM

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Con PNPM

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Uso de docker 💿

La plantilla ya tiene un dockerfile que permitira crear una imagen de tu proyecto

```bash
docker build -t <nombre-de-imagen> .
```

Para crear un contenedor

```bash
docker run -p 3000:3000 -e DATABASE_URL="postgresql://user:password@host:port/db" --name nombre-contenedor imagen
```

## Arquitectura 💻

La arquitectura usada esta basada en la hexagonal, adaptada para la creacion de microservicios

![Imagen de la arquitectura](https://i.postimg.cc/t4nvmtWh/Slide-16-9-3-1.png)

## Creacion de swagger

El proyecto viene con documentacion con el uso de swagger, visita la url de tu proyecto y navega a */api* donde encontraras la documentacion generada.

### Exportar a YML

Si deseas exportar la documentacion al formato yml debes seguir ciertos pasos

- Instalar la dependecia

```bash
npm install js-yaml
```

- Uso de la dependencia

```ts
  import * as yaml from 'js-yaml';
  import * as fs from 'fs';

  // Crea el documento JSON de Swagger
  const document = SwaggerModule.createDocument(app, config);

  // Convierte el documento JSON a YAML
  const yamlDocument = yaml.dump(document);

  // Guarda el archivo YAML si es necesario
  fs.writeFileSync('./swagger.yml', yamlDocument);
  SwaggerModule.setup('api', app, document);
```

## Guia de uso 🎉

> [!NOTE]
> La guia de uso estara basada en pruebas hechas anteriormente

Se explicara de forma general como crear un microservicio, para el ejemplo sera para la gestion de usuarios\

### Carpetas claves

Dado que el proyecto sigue una arquitectua hexagonal como ejemplo para esta plantilla, tenemos tres carpetas importantes las cuales son:

- **domain**: Explicacion de las entidades del microservicio, en este caso la de usuario
- **application**: Creacion de servicios que se comunican con la capa de dominio
- **infrastructure**: Manejo de controladores que usan los servicios de la capa de aplicacion

### Dominio

Se especifica como luce la entidad del microservicio

```ts
/*user.entity.ts*/
//Definir entidad para la logica de negocio
export class User {
  id: string;
  name: string;
  email: string;
  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
```

> [!IMPORTANT]
> Dado que el proyecto hace uso de prisma no se usa la entidad como tal, se usa el modelo para la cracion de entidades, entonces esta capa sirve de guia para entender la logica de negocio

```prisma
model User {
  id    String @id @default(uuid()) @db.Uuid
  name  String
  email String @unique
}
```

### Aplicacion

Aqui se crean los esrvicios para comunicarse con la capa de dominio, hay carpetas las cuales son para los DTOs, loggers, conexion con prisma, y el servicio para la entidad

El mas imporntante seria la capeta del servicio para la entidad en este caso el de user

### Infrastructure

Aqui se crea los controladores para hacer la comunicacion entre el cliente y el servidor ademas de establecer el modulo de comunicacion
