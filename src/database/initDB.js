/**
 * Script para crear y poblar la base de datos "bano_perros"
 * con datos de prueba usando SQLite (sql.js).
 *
 * Uso: npm run db:create
 */

import initSqlJs from 'sql.js';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'bano_perros.db');

async function initDatabase() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  console.log('🔌 SQLite inicializado');
  console.log(`📂 Archivo de BD: ${dbPath}`);

  db.run('PRAGMA foreign_keys = ON');

  // ─── Crear tablas ───────────────────────────────────────────────────

  db.run(`
    CREATE TABLE CLIENTE (
        id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(100) NOT NULL,
        telefono VARCHAR(20),
        direccion VARCHAR(150),
        email VARCHAR(100)
    )
  `);

  db.run(`
    CREATE TABLE RAZA (
        id_raza INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_raza VARCHAR(50) NOT NULL,
        tamano VARCHAR(30)
    )
  `);

  db.run(`
    CREATE TABLE MASCOTA (
        id_mascota INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(100) NOT NULL,
        edad INTEGER,
        peso DECIMAL(5,2),
        id_cliente INTEGER,
        id_raza INTEGER,
        FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente),
        FOREIGN KEY (id_raza) REFERENCES RAZA(id_raza)
    )
  `);

  db.run(`
    CREATE TABLE EMPLEADO (
        id_empleado INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(100) NOT NULL,
        telefono VARCHAR(20),
        puesto VARCHAR(50)
    )
  `);

  db.run(`
    CREATE TABLE SERVICIO (
        id_servicio INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(100) NOT NULL,
        precio DECIMAL(8,2),
        descripcion VARCHAR(200)
    )
  `);

  db.run(`
    CREATE TABLE CITA (
        id_cita INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha DATE,
        hora TIME,
        estado VARCHAR(30) DEFAULT 'pendiente',
        id_mascota INTEGER,
        id_empleado INTEGER,
        FOREIGN KEY (id_mascota) REFERENCES MASCOTA(id_mascota),
        FOREIGN KEY (id_empleado) REFERENCES EMPLEADO(id_empleado)
    )
  `);

  db.run(`
    CREATE TABLE DETALLE_CITA (
        id_detalle INTEGER PRIMARY KEY AUTOINCREMENT,
        id_cita INTEGER,
        id_servicio INTEGER,
        precio DECIMAL(8,2),
        FOREIGN KEY (id_cita) REFERENCES CITA(id_cita),
        FOREIGN KEY (id_servicio) REFERENCES SERVICIO(id_servicio)
    )
  `);

  db.run(`
    CREATE TABLE PAGO (
        id_pago INTEGER PRIMARY KEY AUTOINCREMENT,
        id_cita INTEGER,
        fecha_pago DATE,
        total DECIMAL(10,2),
        metodo_pago VARCHAR(50),
        FOREIGN KEY (id_cita) REFERENCES CITA(id_cita)
    )
  `);

  console.log('📋 Tablas creadas exitosamente');

  // ─── Datos de prueba ────────────────────────────────────────────────

  // Clientes
  const stmtCliente = db.prepare('INSERT INTO CLIENTE (nombre, telefono, direccion, email) VALUES (?, ?, ?, ?)');
  [
    ['María García López', '6141234567', 'Av. Universidad 1200, Chihuahua', 'maria.garcia@email.com'],
    ['Juan Pérez Hernández', '6149876543', 'Calle Aldama 456, Chihuahua', 'juan.perez@email.com'],
    ['Ana Martínez Ruiz', '6145551234', 'Blvd. Ortiz Mena 890, Chihuahua', 'ana.martinez@email.com'],
    ['Carlos Rodríguez Soto', '6143216789', 'Calle Victoria 321, Chihuahua', 'carlos.rodriguez@email.com'],
    ['Laura Sánchez Díaz', '6147891011', 'Periférico de la Juventud 1500, Chihuahua', 'laura.sanchez@email.com'],
  ].forEach(c => { stmtCliente.bind(c); stmtCliente.step(); stmtCliente.reset(); });
  stmtCliente.free();

  // Razas
  const stmtRaza = db.prepare('INSERT INTO RAZA (nombre_raza, tamano) VALUES (?, ?)');
  [
    ['Golden Retriever', 'Grande'],
    ['Bulldog Francés', 'Pequeño'],
    ['Pastor Alemán', 'Grande'],
    ['Chihuahueño', 'Pequeño'],
    ['Labrador', 'Grande'],
    ['Poodle', 'Mediano'],
    ['Schnauzer', 'Mediano'],
    ['Husky Siberiano', 'Grande'],
  ].forEach(r => { stmtRaza.bind(r); stmtRaza.step(); stmtRaza.reset(); });
  stmtRaza.free();

  // Mascotas
  const stmtMascota = db.prepare('INSERT INTO MASCOTA (nombre, edad, peso, id_cliente, id_raza) VALUES (?, ?, ?, ?, ?)');
  [
    ['Max', 3, 30.50, 1, 1],
    ['Luna', 2, 11.20, 1, 2],
    ['Rocky', 5, 35.00, 2, 3],
    ['Coco', 1, 2.50, 3, 4],
    ['Buddy', 4, 28.00, 4, 5],
    ['Bella', 3, 8.50, 4, 6],
    ['Thor', 2, 12.00, 5, 7],
    ['Nala', 6, 22.00, 5, 8],
  ].forEach(m => { stmtMascota.bind(m); stmtMascota.step(); stmtMascota.reset(); });
  stmtMascota.free();

  // Empleados
  const stmtEmpleado = db.prepare('INSERT INTO EMPLEADO (nombre, telefono, puesto) VALUES (?, ?, ?)');
  [
    ['Roberto Flores', '6142223344', 'Estilista Canino Senior'],
    ['Sofía Ramírez', '6143334455', 'Estilista Canino'],
    ['Diego Morales', '6144445566', 'Bañador'],
    ['Valentina Torres', '6145556677', 'Recepcionista'],
  ].forEach(e => { stmtEmpleado.bind(e); stmtEmpleado.step(); stmtEmpleado.reset(); });
  stmtEmpleado.free();

  // Servicios
  const stmtServicio = db.prepare('INSERT INTO SERVICIO (nombre, precio, descripcion) VALUES (?, ?, ?)');
  [
    ['Baño Básico', 250.00, 'Baño con shampoo especial, secado y cepillado'],
    ['Baño Premium', 400.00, 'Baño con shampoo premium, acondicionador, secado y perfume'],
    ['Corte de Pelo', 300.00, 'Corte de pelo según el estilo de la raza'],
    ['Limpieza de Oídos', 100.00, 'Limpieza profunda de oídos con solución especial'],
    ['Corte de Uñas', 80.00, 'Corte y limado de uñas'],
    ['Cepillado Dental', 150.00, 'Limpieza dental con pasta especial para perros'],
    ['Tratamiento Antipulgas', 200.00, 'Aplicación de tratamiento antipulgas y garrapatas'],
    ['Paquete Completo', 650.00, 'Baño premium + corte + uñas + oídos + cepillado dental'],
  ].forEach(s => { stmtServicio.bind(s); stmtServicio.step(); stmtServicio.reset(); });
  stmtServicio.free();

  // Citas
  const stmtCita = db.prepare('INSERT INTO CITA (fecha, hora, estado, id_mascota, id_empleado) VALUES (?, ?, ?, ?, ?)');
  [
    ['2026-05-01', '09:00:00', 'completada', 1, 1],
    ['2026-05-01', '10:30:00', 'completada', 3, 2],
    ['2026-05-02', '09:00:00', 'completada', 2, 3],
    ['2026-05-02', '11:00:00', 'pendiente', 5, 1],
    ['2026-05-03', '09:30:00', 'pendiente', 4, 2],
    ['2026-05-03', '14:00:00', 'cancelada', 6, 3],
    ['2026-05-04', '10:00:00', 'pendiente', 7, 1],
    ['2026-05-04', '12:00:00', 'pendiente', 8, 2],
  ].forEach(c => { stmtCita.bind(c); stmtCita.step(); stmtCita.reset(); });
  stmtCita.free();

  // Detalles de cita
  const stmtDetalle = db.prepare('INSERT INTO DETALLE_CITA (id_cita, id_servicio, precio) VALUES (?, ?, ?)');
  [
    [1, 2, 400.00], [1, 3, 300.00], [1, 5, 80.00],
    [2, 1, 250.00], [2, 4, 100.00],
    [3, 8, 650.00],
    [4, 1, 250.00], [4, 5, 80.00],
    [5, 2, 400.00], [5, 6, 150.00],
    [7, 7, 200.00], [7, 1, 250.00],
    [8, 8, 650.00],
  ].forEach(d => { stmtDetalle.bind(d); stmtDetalle.step(); stmtDetalle.reset(); });
  stmtDetalle.free();

  // Pagos
  const stmtPago = db.prepare('INSERT INTO PAGO (id_cita, fecha_pago, total, metodo_pago) VALUES (?, ?, ?, ?)');
  [
    [1, '2026-05-01', 780.00, 'Tarjeta de crédito'],
    [2, '2026-05-01', 350.00, 'Efectivo'],
    [3, '2026-05-02', 650.00, 'Transferencia'],
  ].forEach(p => { stmtPago.bind(p); stmtPago.step(); stmtPago.reset(); });
  stmtPago.free();

  console.log('🌱 Datos de prueba insertados exitosamente');

  // Mostrar resumen
  const tablas = ['CLIENTE', 'RAZA', 'MASCOTA', 'EMPLEADO', 'SERVICIO', 'CITA', 'DETALLE_CITA', 'PAGO'];
  console.log('\n✅ Base de datos inicializada correctamente');
  console.log('   Registros insertados:');
  tablas.forEach(t => {
    const [result] = db.exec(`SELECT COUNT(*) as n FROM ${t}`);
    console.log(`   - ${t}: ${result.values[0][0]}`);
  });

  // Guardar al disco
  const data = db.export();
  const buffer = Buffer.from(data);
  writeFileSync(dbPath, buffer);

  db.close();
  console.log(`\n💾 Base de datos guardada en: ${dbPath}`);
}

initDatabase().catch(err => {
  console.error('❌ Error al inicializar la base de datos:', err.message);
  process.exit(1);
});
