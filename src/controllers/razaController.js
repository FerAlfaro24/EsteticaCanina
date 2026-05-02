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

export const getRazas = async (req, res) => {
  try {
    const db = await getDB();
    res.json(queryAll(db, 'SELECT * FROM RAZA'));
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener razas', error: error.message });
  }
};

export const getRazaById = async (req, res) => {
  try {
    const db = await getDB();
    const row = queryOne(db, 'SELECT * FROM RAZA WHERE id_raza = ?', [Number(req.params.id)]);
    if (!row) return res.status(404).json({ message: 'Raza no encontrada' });
    res.json(row);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener raza', error: error.message });
  }
};

export const createRaza = async (req, res) => {
  try {
    const db = await getDB();
    const { nombre_raza, tamano } = req.body;
    execute(db, 'INSERT INTO RAZA (nombre_raza, tamano) VALUES (?, ?)', [nombre_raza, tamano]);
    const id = db.exec('SELECT last_insert_rowid()')[0].values[0][0];
    res.status(201).json({ id, nombre_raza, tamano });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear raza', error: error.message });
  }
};

export const updateRaza = async (req, res) => {
  try {
    const db = await getDB();
    const { nombre_raza, tamano } = req.body;
    const existing = queryOne(db, 'SELECT * FROM RAZA WHERE id_raza = ?', [Number(req.params.id)]);
    if (!existing) return res.status(404).json({ message: 'Raza no encontrada' });
    execute(db, 'UPDATE RAZA SET nombre_raza = ?, tamano = ? WHERE id_raza = ?', [nombre_raza, tamano, Number(req.params.id)]);
    res.json({ message: 'Raza actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar raza', error: error.message });
  }
};

export const deleteRaza = async (req, res) => {
  try {
    const db = await getDB();
    const existing = queryOne(db, 'SELECT * FROM RAZA WHERE id_raza = ?', [Number(req.params.id)]);
    if (!existing) return res.status(404).json({ message: 'Raza no encontrada' });
    execute(db, 'DELETE FROM RAZA WHERE id_raza = ?', [Number(req.params.id)]);
    res.json({ message: 'Raza eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar raza', error: error.message });
  }
};
