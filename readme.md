PRUEBA FINAL DE Módulo 7 BANCO SOLAR

Creacion de API REST bajo metodologia CRUD.

Para comenzar el proyecto se necesita primero:

- estar ubicado en la carpeta raiz desde el terminal
- Instalar la dependencia con el comando en consola (npm i o npm install)
- Crear Base de datos en postgresql, datos incluidos en el archivo (index.sql)
- agregar credenciales de base de dato postgreSQL man informacion en archivo (consult.js lineas)
Luego para probar que la aplicacion funciona de forma correcta, lo podemos realizar de la siguiente forma.

1. levantar el servidor en el sevidor 3000 con el siguente comando en la consola (node index.js)
2. abrir en navegador con la ruta localhost:3000

Rutas disponibles:

● / GET: Devuelve la aplicación cliente disponible en el apoyo de la prueba.
● /usuario POST: Recibe los datos de un nuevo usuario y los almacena en PostgreSQL.
● /usuarios GET: Devuelve todos los usuarios registrados con sus balances.
● /usuario PUT: Recibe los datos modificados de un usuario registrado y los actualiza.
● /usuario DELETE: Recibe el id de un usuario registrado y lo elimina .
● /transferencia POST: Recibe los datos para realizar una nueva transferencia. Se debe
ocupar una transacción SQL en la consulta a la base de datos.
● /transferencias GET: Devuelve todas las transferencias almacenadas en la base de
datos en formato de ARREGLO. (OJO ES EN FORMATO ARRAY NO EN OBJETO)

Proyecto realizado por:

- Yeminson Sanchez

