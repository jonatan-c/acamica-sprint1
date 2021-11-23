## Acamica-Backend-Sprint-Project-02

### Introducciónes

API para app de un restaurante.

### Instrucciones de instalación

```
git clone https://github.com/jonatan-c/acamica-sprint1.git
o descargar el repositorio de github
```

```
npm install

```

Crea la base de datos:

```

create database persistencia_sprint2;

```

Importa la base de datos de la carpeta SQL en mysql Workbench

Crea el archivo .env en la carpeta principal e ingresa los siguientes datos:

```

MYSQL_DB_NAME=persistencia_sprint2
MYSQL_USER="tu usuario"
MYSQL_PASS="tu password"
MYSQL_HOST=localhost
MYSQL_PORT=3306
SECRETA=SECRETA

```

Por defecto ya viene cargados algunos datos en la base de datos

```

Usuario 1 - Admin - Online --> name: admin , password: admin
Usuario 2 - User - Online --> name:user , password: user

```

Para iniciar app

```

npm run dev

```

Documentancion Swagger

```

http://localhost:4001/api-docs

```

Para correr test

```

npm run test

```
