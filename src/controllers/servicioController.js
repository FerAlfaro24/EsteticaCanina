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

export const getServicios = async (req, res) => {
  try {
    const db = await getDB();
    res.json(queryAll(db, 'SELECT * FROM SERVICIO'));
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener servicios', error: error.message });
  }
};

export const getServicioById = async (req, res) => {
  try {
    const db = await getDB();
    const row = queryOne(db, 'SELECT * FROM SERVICIO WHERE id_servicio = ?', [Number(req.params.id)]);
    if (!row) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json(row);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener servicio', error: error.message });
  }
};

export const createServicio = async (req, res) => {
  try {
    const db = await getDB();
    const { nombre, precio, descripcion } = req.body;
    execute(db, 'INSERT INTO SERVICIO (nombre, precio, descripcion) VALUES (?, ?, ?)', [nombre, precio, descripcion]);
    const id = db.exec('SELECT last_insert_rowid()')[0].values[0][0];
    res.status(201).json({ id, nombre, precio, descripcion });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear servicio', error: error.message });
  }
};

export const updateServicio = async (req, res) => {
  try {
    const db = await getDB();
    const { nombre, precio, descripcion } = req.body;
    const existing = queryOne(db, 'SELECT * FROM SERVICIO WHERE id_servicio = ?', [Number(req.params.id)]);
    if (!existing) return res.status(404).json({ message: 'Servicio no encontrado' });
    execute(db, 'UPDATE SERVICIO SET nombre = ?, precio = ?, descripcion = ? WHERE id_servicio = ?',
      [nombre, precio, descripcion, Number(req.params.id)]);
    res.json({ message: 'Servicio actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar servicio', error: error.message });
  }
};

export const deleteServicio = async (req, res) => {
  try {
    const db = await getDB();
    const existing = queryOne(db, 'SELECT * FROM SERVICIO WHERE id_servicio = ?', [Number(req.params.id)]);
    if (!existing) return res.status(404).json({ message: 'Servicio no encontrado' });
    execute(db, 'DELETE FROM SERVICIO WHERE id_servicio = ?', [Number(req.params.id)]);
    res.json({ message: 'Servicio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar servicio', error: error.message });
  }
};
