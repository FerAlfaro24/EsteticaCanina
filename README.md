# 🐾 API Estética Canina - Baño Perros

API REST para la administración de un negocio de baño y estética canina. Este sistema permite gestionar clientes, mascotas, empleados, servicios, citas y pagos.

---

## 📚 Datos del Proyecto

| Campo          | Detalle                                      |
|----------------|----------------------------------------------|
| **Materia**    | Desarrollo de Aplicaciones con Base de Datos |
| **Profesor**   | JESUS ALEJANDRO FLORES HERNANDEZ             |
| **Semestre**   | Octavo Semestre                              |
| **Institución**| UNACAR                                       |

## 👥 Integrantes del Equipo

| #  | Nombre Completo          | Matrícula    |
|----|--------------------------|--------------|
| 1  | Fernando Alfaro Montalvo | 221204 |

---

## 🛠️ Tecnologías Utilizadas

- **Runtime:** Node.js (módulos ES6)
- **Framework:** Express.js
- **Base de Datos:** SQLite (sql.js)
- **CORS:** cors

---

## 📁 Estructura del Proyecto

```
estetica-canina-api/
├── index.js                          # Punto de entrada principal
├── package.json                      # Configuración del proyecto (ES6 modules)
├── .gitignore                        # Archivos ignorados por Git
├── .env                              # Variables de entorno (NO se sube a GitHub)
├── README.md                         # Documentación del proyecto
└── src/
    ├── database/
    │   ├── connection.js             # Conexión a SQLite
    │   └── initDB.js                 # Script para crear y poblar la BD
    ├── controllers/
    │   ├── clienteController.js      # Lógica de negocio - Clientes
    │   ├── mascotaController.js      # Lógica de negocio - Mascotas
    │   ├── razaController.js         # Lógica de negocio - Razas
    │   ├── empleadoController.js     # Lógica de negocio - Empleados
    │   ├── servicioController.js     # Lógica de negocio - Servicios
    │   ├── citaController.js         # Lógica de negocio - Citas
    │   ├── detalleCitaController.js  # Lógica de negocio - Detalles de Cita
    │   └── pagoController.js         # Lógica de negocio - Pagos
    └── routes/
        ├── clienteRoutes.js          # Rutas - Clientes
        ├── mascotaRoutes.js          # Rutas - Mascotas
        ├── razaRoutes.js             # Rutas - Razas
        ├── empleadoRoutes.js         # Rutas - Empleados
        ├── servicioRoutes.js         # Rutas - Servicios
        ├── citaRoutes.js             # Rutas - Citas
        ├── detalleCitaRoutes.js      # Rutas - Detalles de Cita
        └── pagoRoutes.js             # Rutas - Pagos
```

---

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd estetica-canina-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=bano_perros
DB_PORT=3306
PORT=3000
```

### 4. Crear y poblar la base de datos

```bash
npm run db:create
```

Este script creará la base de datos `bano_perros`, todas las tablas y las poblará con datos de prueba.

### 5. Iniciar el servidor

```bash
npm start
```

Para desarrollo con recarga automática:

```bash
npm run dev
```

> **Nota:** El comando `npm run dev` utiliza `node --watch index.js` que reinicia automáticamente el servidor cuando detecta cambios en los archivos.

---

## 📡 Lista de Endpoints

### Base URL: `http://localhost:3000/api`

---

### 🧑 Clientes (`/api/clientes`)

| Método   | Endpoint             | Descripción                  |
|----------|----------------------|------------------------------|
| `GET`    | `/api/clientes`      | Obtener todos los clientes   |
| `GET`    | `/api/clientes/:id`  | Obtener un cliente por ID    |
| `POST`   | `/api/clientes`      | Crear un nuevo cliente       |
| `PUT`    | `/api/clientes/:id`  | Actualizar un cliente        |
| `DELETE` | `/api/clientes/:id`  | Eliminar un cliente          |

**Body (POST/PUT):**
```json
{
  "nombre": "María García López",
  "telefono": "6141234567",
  "direccion": "Av. Universidad 1200, Chihuahua",
  "email": "maria.garcia@email.com"
}
```

---

### 🐕 Mascotas (`/api/mascotas`)

| Método   | Endpoint                           | Descripción                            |
|----------|------------------------------------|----------------------------------------|
| `GET`    | `/api/mascotas`                    | Obtener todas las mascotas             |
| `GET`    | `/api/mascotas/:id`                | Obtener una mascota por ID             |
| `GET`    | `/api/mascotas/cliente/:clienteId` | Obtener mascotas de un cliente         |
| `POST`   | `/api/mascotas`                    | Crear una nueva mascota                |
| `PUT`    | `/api/mascotas/:id`                | Actualizar una mascota                 |
| `DELETE` | `/api/mascotas/:id`                | Eliminar una mascota                   |

**Body (POST/PUT):**
```json
{
  "nombre": "Max",
  "edad": 3,
  "peso": 30.50,
  "id_cliente": 1,
  "id_raza": 1
}
```

---

### 🏷️ Razas (`/api/razas`)

| Método   | Endpoint          | Descripción               |
|----------|-------------------|---------------------------|
| `GET`    | `/api/razas`      | Obtener todas las razas   |
| `GET`    | `/api/razas/:id`  | Obtener una raza por ID   |
| `POST`   | `/api/razas`      | Crear una nueva raza      |
| `PUT`    | `/api/razas/:id`  | Actualizar una raza       |
| `DELETE` | `/api/razas/:id`  | Eliminar una raza         |

**Body (POST/PUT):**
```json
{
  "nombre_raza": "Golden Retriever",
  "tamano": "Grande"
}
```

---

### 👷 Empleados (`/api/empleados`)

| Método   | Endpoint              | Descripción                   |
|----------|-----------------------|-------------------------------|
| `GET`    | `/api/empleados`      | Obtener todos los empleados   |
| `GET`    | `/api/empleados/:id`  | Obtener un empleado por ID    |
| `POST`   | `/api/empleados`      | Crear un nuevo empleado       |
| `PUT`    | `/api/empleados/:id`  | Actualizar un empleado        |
| `DELETE` | `/api/empleados/:id`  | Eliminar un empleado          |

**Body (POST/PUT):**
```json
{
  "nombre": "Roberto Flores",
  "telefono": "6142223344",
  "puesto": "Estilista Canino Senior"
}
```

---

### ✂️ Servicios (`/api/servicios`)

| Método   | Endpoint              | Descripción                   |
|----------|-----------------------|-------------------------------|
| `GET`    | `/api/servicios`      | Obtener todos los servicios   |
| `GET`    | `/api/servicios/:id`  | Obtener un servicio por ID    |
| `POST`   | `/api/servicios`      | Crear un nuevo servicio       |
| `PUT`    | `/api/servicios/:id`  | Actualizar un servicio        |
| `DELETE` | `/api/servicios/:id`  | Eliminar un servicio          |

**Body (POST/PUT):**
```json
{
  "nombre": "Baño Básico",
  "precio": 250.00,
  "descripcion": "Baño con shampoo especial, secado y cepillado"
}
```

---

### 📅 Citas (`/api/citas`)

| Método   | Endpoint          | Descripción                                        |
|----------|-------------------|----------------------------------------------------|
| `GET`    | `/api/citas`      | Obtener todas las citas (con mascota y empleado)   |
| `GET`    | `/api/citas/:id`  | Obtener una cita por ID (incluye servicios)        |
| `POST`   | `/api/citas`      | Crear una nueva cita                               |
| `PUT`    | `/api/citas/:id`  | Actualizar una cita                                |
| `DELETE` | `/api/citas/:id`  | Eliminar una cita                                  |

**Body (POST/PUT):**
```json
{
  "fecha": "2026-05-10",
  "hora": "10:00:00",
  "estado": "pendiente",
  "id_mascota": 1,
  "id_empleado": 1
}
```

---

### 📋 Detalles de Cita (`/api/detalles-cita`)

| Método   | Endpoint                          | Descripción                              |
|----------|-----------------------------------|------------------------------------------|
| `GET`    | `/api/detalles-cita`              | Obtener todos los detalles               |
| `GET`    | `/api/detalles-cita/cita/:citaId` | Obtener detalles de una cita específica  |
| `POST`   | `/api/detalles-cita`              | Agregar un servicio a una cita           |
| `DELETE` | `/api/detalles-cita/:id`          | Eliminar un detalle de cita              |

**Body (POST):**
```json
{
  "id_cita": 1,
  "id_servicio": 2,
  "precio": 400.00
}
```

---

### 💰 Pagos (`/api/pagos`)

| Método   | Endpoint          | Descripción                                    |
|----------|-------------------|------------------------------------------------|
| `GET`    | `/api/pagos`      | Obtener todos los pagos (con datos de cliente) |
| `GET`    | `/api/pagos/:id`  | Obtener un pago por ID                         |
| `POST`   | `/api/pagos`      | Registrar un nuevo pago                        |
| `PUT`    | `/api/pagos/:id`  | Actualizar un pago                             |
| `DELETE` | `/api/pagos/:id`  | Eliminar un pago                               |

**Body (POST/PUT):**
```json
{
  "id_cita": 1,
  "fecha_pago": "2026-05-01",
  "total": 780.00,
  "metodo_pago": "Tarjeta de crédito"
}
```

---

## 🗄️ Modelo de Base de Datos

La base de datos `bano_perros` contiene las siguientes tablas:

| Tabla          | Descripción                                         |
|----------------|-----------------------------------------------------|
| `CLIENTE`      | Información de los dueños de las mascotas           |
| `RAZA`         | Catálogo de razas de perros                         |
| `MASCOTA`      | Mascotas registradas (relacionada con Cliente y Raza)|
| `EMPLEADO`     | Personal del establecimiento                        |
| `SERVICIO`     | Catálogo de servicios ofrecidos                     |
| `CITA`         | Citas agendadas (relacionada con Mascota y Empleado)|
| `DETALLE_CITA` | Servicios incluidos en cada cita                    |
| `PAGO`         | Pagos realizados por los clientes                   |

### Diagrama E-R

```
CLIENTE 1──────N MASCOTA N──────1 RAZA
                   │
                   N
                   │
                  CITA N──────1 EMPLEADO
                   │
              ┌────┤
              │    N
              │    │
              │  DETALLE_CITA N──────1 SERVICIO
              │
              1
              │
             PAGO
```

---

## 📝 Notas Importantes

- El proyecto utiliza **módulos ES6** (`import`/`export`) habilitado con `"type": "module"` en `package.json`.
- Para desarrollo se recomienda usar `node --watch index.js` (o `npm run dev`) que reinicia automáticamente el servidor al detectar cambios.
- El archivo `.env` **NO** se sube a GitHub (está en `.gitignore`). Cada integrante debe crear su propio archivo `.env` con la configuración de su MySQL local.
- La carpeta `node_modules` **NO** se sube a GitHub (está en `.gitignore`).
#   E s t - t i c a C a n i n a  
 