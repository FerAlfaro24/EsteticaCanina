import { getDB, saveDB } from '../database/connection.js';

function queryAll(db, sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

function queryOne(db, sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  let row = null;
  if (stmt.step()) row = stmt.getAsObject();
  stmt.free();
  return row;
}

function execute(db, sql, params = []) {
  db.run(sql, params);
  saveDB();
}

export const getMascotas = async (req, res) => {
  try {
    const db = await getDB();
    const rows = queryAll(db, `
      SELECT m.*, c.nombre AS nombre_cliente, r.nombre_raza, r.tamano
      FROM MASCOTA m
      LEFT JOIN CLIENTE c ON m.id_cliente = c.id_cliente
      LEFT JOIN RAZA r ON m.id_raza = r.id_raza
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mascotas', error: error.message });
  }
};

export const getMascotaById = async (req, res) => {
  try {
    const db = await getDB();
    const row = queryOne(db, `
      SELECT m.*, c.nombre AS nombre_cliente, r.nombre_raza, r.tamano
      FROM MASCOTA m
      LEFT JOIN CLIENTE c ON m.id_cliente = c.id_cliente
      LEFT JOIN RAZA r ON m.id_raza = r.id_raza
      WHERE m.id_mascota = ?
    `, [Number(req.params.id)]);
    if (!row) return res.status(404).json({ message: 'Mascota no encontrada' });
    res.json(row);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mascota', error: error.message });
  }
};

export const createMascota = async (req, res) => {
  try {
    const db = await getDB();
    const { nombre, edad, peso, id_cliente, id_raza } = req.body;
    execute(db, 'INSERT INTO MASCOTA (nombre, edad, peso, id_cliente, id_raza) VALUES (?, ?, ?, ?, ?)',
      [nombre, edad, peso, id_cliente, id_raza]);
    const id = db.exec('SELECT last_insert_rowid()')[0].values[0][0];
    res.status(201).json({ id, nombre, edad, peso, id_cliente, id_raza });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear mascota', error: error.message });
  }
};

export const updateMascota = async (req, res) => {
  try {
    const db = await getDB();
    const { nombre, edad, peso, id_cliente, id_raza } = req.body;
    const existing = queryOne(db, 'SELECT * FROM MASCOTA WHERE id_mascota = ?', [Number(req.params.id)]);
    if (!existing) return res.status(404).json({ message: 'Mascota no encontrada' });
    execute(db, 'UPDATE MASCOTA SET nombre = ?, edad = ?, peso = ?, id_cliente = ?, id_raza = ? WHERE id_mascota = ?',
      [nombre, edad, peso, id_cliente, id_raza, Number(req.params.id)]);
    res.json({ message: 'Mascota actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar mascota', error: error.message });
  }
};

export const deleteMascota = async (req, res) => {
  try {
    const db = await getDB();
    const existing = queryOne(db, 'SELECT * FROM MASCOTA WHERE id_mascota = ?', [Number(req.params.id)]);
    if (!existing) return res.status(404).json({ message: 'Mascota no encontrada' });
    execute(db, 'DELETE FROM MASCOTA WHERE id_mascota = ?', [Number(req.params.id)]);
    res.json({ message: 'Mascota eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar mascota', error: error.message });
  }
};

export const getMascotasByCliente = async (req, res) => {
  try {
    const db = await getDB();
    const rows = queryAll(db, `
      SELECT m.*, r.nombre_raza, r.tamano
      FROM MASCOTA m
      LEFT JOIN RAZA r ON m.id_raza = r.id_raza
      WHERE m.id_cliente = ?
    `, [Number(req.params.clienteId)]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mascotas del cliente', error: error.message });
  }
};
