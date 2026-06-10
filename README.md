<div align="center">

# 🐾 API Estética Canina

### Sistema de administración para un negocio de baño y estética canina

![Node.js](https://img.shields.io/badge/Node.js-ES6_Modules-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Framework-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Base_de_Datos-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

</div>

---

## 📚 Datos del Proyecto

| Campo | Detalle |
|---|---|
| **Materia** | Desarrollo de Aplicaciones con Base de Datos |
| **Profesor** | Jesús Alejandro Flores Hernández |
| **Semestre** | Octavo Semestre |
| **Institución** | UNACAR |

## 👤 Integrante

| # | Nombre | Matrícula |
|---|---|---|
| 1 | Fernando Alfaro Montalvo | 221204 |

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| **Node.js** | Runtime (módulos ES6) |
| **Express.js** | Framework web |
| **SQLite / sql.js** | Base de datos |
| **cors** | Manejo de CORS |

---

## 📁 Estructura del Proyecto

```
estetica-canina-api/
├── index.js                          # Punto de entrada
├── package.json                      # Config ES6 modules
├── .env                              # Variables de entorno (local)
├── .gitignore
├── README.md
└── src/
    ├── database/
    │   ├── connection.js             # Conexión a SQLite
    │   └── initDB.js                 # Creación y seed de la BD
    ├── controllers/
    │   ├── clienteController.js
    │   ├── mascotaController.js
    │   ├── razaController.js
    │   ├── empleadoController.js
    │   ├── servicioController.js
    │   ├── citaController.js
    │   ├── detalleCitaController.js
    │   └── pagoController.js
    └── routes/
        ├── clienteRoutes.js
        ├── mascotaRoutes.js
        ├── razaRoutes.js
        ├── empleadoRoutes.js
        ├── servicioRoutes.js
        ├── citaRoutes.js
        ├── detalleCitaRoutes.js
        └── pagoRoutes.js
```

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/FerAlfaro24/EsteticaCanina.git
cd estetica-canina-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

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

### 5. Iniciar el servidor

```bash
# Producción
npm start

# Desarrollo (con hot reload)
npm run dev
```

> **Nota:** `npm run dev` usa `node --watch index.js`, que reinicia el servidor automáticamente al detectar cambios.

---

## 📡 Endpoints

**Base URL:** `http://localhost:3000/api`

### 🧑 Clientes — `/api/clientes`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/clientes` | Obtener todos los clientes |
| `GET` | `/api/clientes/:id` | Obtener cliente por ID |
| `POST` | `/api/clientes` | Crear cliente |
| `PUT` | `/api/clientes/:id` | Actualizar cliente |
| `DELETE` | `/api/clientes/:id` | Eliminar cliente |

<details>
<summary>Body (POST / PUT)</summary>

```json
{
  "nombre": "María García López",
  "telefono": "6141234567",
  "direccion": "Av. Universidad 1200, Chihuahua",
  "email": "maria.garcia@email.com"
}
```
</details>

---

### 🐕 Mascotas — `/api/mascotas`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/mascotas` | Obtener todas las mascotas |
| `GET` | `/api/mascotas/:id` | Obtener mascota por ID |
| `GET` | `/api/mascotas/cliente/:clienteId` | Mascotas de un cliente |
| `POST` | `/api/mascotas` | Crear mascota |
| `PUT` | `/api/mascotas/:id` | Actualizar mascota |
| `DELETE` | `/api/mascotas/:id` | Eliminar mascota |

<details>
<summary>Body (POST / PUT)</summary>

```json
{
  "nombre": "Max",
  "edad": 3,
  "peso": 30.50,
  "id_cliente": 1,
  "id_raza": 1
}
```
</details>

---

### 🏷️ Razas — `/api/razas`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/razas` | Obtener todas las razas |
| `GET` | `/api/razas/:id` | Obtener raza por ID |
| `POST` | `/api/razas` | Crear raza |
| `PUT` | `/api/razas/:id` | Actualizar raza |
| `DELETE` | `/api/razas/:id` | Eliminar raza |

<details>
<summary>Body (POST / PUT)</summary>

```json
{
  "nombre_raza": "Golden Retriever",
  "tamano": "Grande"
}
```
</details>

---

### 👷 Empleados — `/api/empleados`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/empleados` | Obtener todos los empleados |
| `GET` | `/api/empleados/:id` | Obtener empleado por ID |
| `POST` | `/api/empleados` | Crear empleado |
| `PUT` | `/api/empleados/:id` | Actualizar empleado |
| `DELETE` | `/api/empleados/:id` | Eliminar empleado |

<details>
<summary>Body (POST / PUT)</summary>

```json
{
  "nombre": "Roberto Flores",
  "telefono": "6142223344",
  "puesto": "Estilista Canino Senior"
}
```
</details>

---

### ✂️ Servicios — `/api/servicios`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/servicios` | Obtener todos los servicios |
| `GET` | `/api/servicios/:id` | Obtener servicio por ID |
| `POST` | `/api/servicios` | Crear servicio |
| `PUT` | `/api/servicios/:id` | Actualizar servicio |
| `DELETE` | `/api/servicios/:id` | Eliminar servicio |

<details>
<summary>Body (POST / PUT)</summary>

```json
{
  "nombre": "Baño Básico",
  "precio": 250.00,
  "descripcion": "Baño con shampoo especial, secado y cepillado"
}
```
</details>

---

### 📅 Citas — `/api/citas`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/citas` | Obtener todas las citas (con mascota y empleado) |
| `GET` | `/api/citas/:id` | Obtener cita por ID (incluye servicios) |
| `POST` | `/api/citas` | Crear cita |
| `PUT` | `/api/citas/:id` | Actualizar cita |
| `DELETE` | `/api/citas/:id` | Eliminar cita |

<details>
<summary>Body (POST / PUT)</summary>

```json
{
  "fecha": "2026-05-10",
  "hora": "10:00:00",
  "estado": "pendiente",
  "id_mascota": 1,
  "id_empleado": 1
}
```
</details>

---

### 📋 Detalles de Cita — `/api/detalles-cita`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/detalles-cita` | Obtener todos los detalles |
| `GET` | `/api/detalles-cita/cita/:citaId` | Detalles de una cita específica |
| `POST` | `/api/detalles-cita` | Agregar servicio a una cita |
| `DELETE` | `/api/detalles-cita/:id` | Eliminar detalle de cita |

<details>
<summary>Body (POST)</summary>

```json
{
  "id_cita": 1,
  "id_servicio": 2,
  "precio": 400.00
}
```
</details>

---

### 💰 Pagos — `/api/pagos`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/pagos` | Obtener todos los pagos (con datos de cliente) |
| `GET` | `/api/pagos/:id` | Obtener pago por ID |
| `POST` | `/api/pagos` | Registrar pago |
| `PUT` | `/api/pagos/:id` | Actualizar pago |
| `DELETE` | `/api/pagos/:id` | Eliminar pago |

<details>
<summary>Body (POST / PUT)</summary>

```json
{
  "id_cita": 1,
  "fecha_pago": "2026-05-01",
  "total": 780.00,
  "metodo_pago": "Tarjeta de crédito"
}
```
</details>

---

## 🗄️ Modelo de Base de Datos

| Tabla | Descripción |
|---|---|
| `CLIENTE` | Información de los dueños de las mascotas |
| `RAZA` | Catálogo de razas de perros |
| `MASCOTA` | Mascotas registradas (vinculada a Cliente y Raza) |
| `EMPLEADO` | Personal del establecimiento |
| `SERVICIO` | Catálogo de servicios ofrecidos |
| `CITA` | Citas agendadas (vinculada a Mascota y Empleado) |
| `DETALLE_CITA` | Servicios incluidos en cada cita |
| `PAGO` | Pagos realizados por los clientes |

### Diagrama Entidad-Relación

```
┌──────────┐          ┌──────────┐          ┌──────────┐
│  CLIENTE │ 1──────N │  MASCOTA │ N──────1 │   RAZA   │
└──────────┘          └────┬─────┘          └──────────┘
                           │ N
                           │
                      ┌────▼─────┐          ┌──────────┐
                      │   CITA   │ N──────1 │ EMPLEADO │
                      └────┬─────┘          └──────────┘
                           │ 1
                    ┌──────┴──────┐
                    │             │
               ┌────▼──────┐  ┌──▼──────┐
               │DETALLE_CITA│  │  PAGO   │
               └─────┬──────┘  └─────────┘
                     │ N
                ┌────▼─────┐
                │ SERVICIO │
                └──────────┘
```

---

## 📝 Notas

- El proyecto usa **módulos ES6** (`import`/`export`) — asegúrate de tener `"type": "module"` en `package.json`.
- El archivo `.env` **no se sube a GitHub**. Cada integrante debe crear el suyo con su configuración local.
- La carpeta `node_modules` está en `.gitignore` — ejecuta `npm install` después de clonar.
