# Diseño de Base de Datos - Estética Canina

## Índice

1. Objetivo del sistema  
2. Narrativa del sistema  
3. Modelo E-R  
4. Sentencias SQL  

---

# Objetivo del sistema

El objetivo del sistema es administrar la información de un negocio de baño y estética canina mediante una base de datos relacional que permita registrar clientes, mascotas, empleados, servicios ofrecidos, citas de atención y pagos realizados.

El sistema busca facilitar la organización de la información del negocio, permitiendo llevar un control eficiente de las mascotas atendidas, los servicios realizados y los ingresos generados, mejorando así la gestión y el seguimiento de las actividades diarias del establecimiento.

---

# Narrativa del sistema

El sistema está diseñado para gestionar la información de un negocio dedicado al baño y estética de perros. En este establecimiento, los clientes llevan a sus mascotas para recibir diferentes servicios de higiene y cuidado, como baño, corte de pelo, limpieza de oídos o corte de uñas.

El sistema permitirá registrar a los clientes que acuden al negocio, almacenando información básica como su nombre, teléfono y dirección. Cada cliente puede tener una o varias mascotas registradas en el sistema, donde se guardarán datos como el nombre de la mascota, su raza, edad y peso.

Además, el sistema permitirá registrar a los empleados que trabajan en el establecimiento, quienes son responsables de realizar los servicios de baño y estética.

Cuando un cliente solicita un servicio para su mascota, se registra una cita en la que se indica la fecha, la mascota que será atendida y el empleado encargado de realizar el servicio.

Durante cada cita, una mascota puede recibir uno o varios servicios, por lo que el sistema registrará el detalle de los servicios realizados y su costo correspondiente.

Finalmente, el sistema permitirá registrar los pagos realizados por los clientes después de que los servicios han sido completados.

De esta manera, la base de datos permitirá llevar un control organizado de los clientes, sus mascotas, los servicios prestados, los empleados que los realizan y los pagos generados, facilitando la administración del negocio.

---

# Modelo E-R

```mermaid
erDiagram

CLIENTE {
    int id_cliente PK
    string nombre
    string telefono
    string direccion
    string email
}

MASCOTA {
    int id_mascota PK
    string nombre
    int edad
    float peso
    int id_cliente FK
    int id_raza FK
}

RAZA {
    int id_raza PK
    string nombre_raza
    string tamano
}

EMPLEADO {
    int id_empleado PK
    string nombre
    string telefono
    string puesto
}

SERVICIO {
    int id_servicio PK
    string nombre
    float precio
    string descripcion
}

CITA {
    int id_cita PK
    date fecha
    time hora
    string estado
    int id_mascota FK
    int id_empleado FK
}

DETALLE_CITA {
    int id_detalle PK
    int id_cita FK
    int id_servicio FK
    float precio
}

PAGO {
    int id_pago PK
    int id_cita FK
    date fecha_pago
    float total
    string metodo_pago
}

CLIENTE ||--o{ MASCOTA : tiene
RAZA ||--o{ MASCOTA : clasifica
MASCOTA ||--o{ CITA : agenda
EMPLEADO ||--o{ CITA : atiende
CITA ||--o{ DETALLE_CITA : incluye
SERVICIO ||--o{ DETALLE_CITA : contiene
CITA ||--|| PAGO : genera
```

---

# Sentencias SQL

```sql
CREATE DATABASE bano_perros;

USE bano_perros;

CREATE TABLE CLIENTE (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    telefono VARCHAR(20),
    direccion VARCHAR(150),
    email VARCHAR(100)
);

CREATE TABLE RAZA (
    id_raza INT AUTO_INCREMENT PRIMARY KEY,
    nombre_raza VARCHAR(50),
    tamano VARCHAR(30)
);

CREATE TABLE MASCOTA (
    id_mascota INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    edad INT,
    peso DECIMAL(5,2),
    id_cliente INT,
    id_raza INT,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente),
    FOREIGN KEY (id_raza) REFERENCES RAZA(id_raza)
);

CREATE TABLE EMPLEADO (
    id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    telefono VARCHAR(20),
    puesto VARCHAR(50)
);

CREATE TABLE SERVICIO (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    precio DECIMAL(8,2),
    descripcion VARCHAR(200)
);

CREATE TABLE CITA (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    hora TIME,
    estado VARCHAR(30),
    id_mascota INT,
    id_empleado INT,
    FOREIGN KEY (id_mascota) REFERENCES MASCOTA(id_mascota),
    FOREIGN KEY (id_empleado) REFERENCES EMPLEADO(id_empleado)
);

CREATE TABLE DETALLE_CITA (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_cita INT,
    id_servicio INT,
    precio DECIMAL(8,2),
    FOREIGN KEY (id_cita) REFERENCES CITA(id_cita),
    FOREIGN KEY (id_servicio) REFERENCES SERVICIO(id_servicio)
);

CREATE TABLE PAGO (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_cita INT,
    fecha_pago DATE,
    total DECIMAL(10,2),
    metodo_pago VARCHAR(50),
    FOREIGN KEY (id_cita) REFERENCES CITA(id_cita)
);
```