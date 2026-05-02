import { getDB, saveDB } from '../database/connection.js';

/**
 * Helper: ejecuta un SELECT y retorna un array de objetos
 */
function queryAll(db, sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

/**
 * Helper: ejecuta un SELECT y retorna el primer resultado como objeto
 */
function queryOne(db, sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  let row = null;
  if (stmt.step()) {
    row = stmt.getAsObject();
  }
  stmt.free();
  return row;
}

/**
 * Helper: ejecuta un INSERT/UPDATE/DELETE
 */
function execute(db, sql, params = []) {
  db.run(sql, params);
  saveDB();
}

export const getClientes = async (req, res) => {
  try {
    const db = await getDB();
    const rows = queryAll(db, 'SELECT * FROM CLIENTE');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener clientes', error: error.message });
  }
};

export const getClienteById = async (req, res) => {
  try {
    const db = await getDB();
    const row = queryOne(db, 'SELECT * FROM CLIENTE WHERE id_cliente = ?', [Number(req.params.id)]);
    if (!row) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(row);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cliente', error: error.message });
  }
};

export const createCliente = async (req, res) => {
  try {
    const db = await getDB();
    const { nombre, telefono, direccion, email } = req.body;
    execute(db, 'INSERT INTO CLIENTE (nombre, telefono, direccion, email) VALUES (?, ?, ?, ?)',
      [nombre, telefono, direccion, email]);
    const id = db.exec('SELECT last_insert_rowid()')[0].values[0][0];
    res.status(201).json({ id, nombre, telefono, direccion, email });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear cliente', error: error.message });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const db = await getDB();
    const { nombre, telefono, direccion, email } = req.body;
    const existing = queryOne(db, 'SELECT * FROM CLIENTE WHERE id_cliente = ?', [Number(req.params.id)]);
    if (!existing) return res.status(404).json({ message: 'Cliente no encontrado' });
    execute(db, 'UPDATE CLIENTE SET nombre = ?, telefono = ?, direccion = ?, email = ? WHERE id_cliente = ?',
      [nombre, telefono, direccion, email, Number(req.params.id)]);
    res.json({ message: 'Cliente actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar cliente', error: error.message });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const db = await getDB();
    const existing = queryOne(db, 'SELECT * FROM CLIENTE WHERE id_cliente = ?', [Number(req.params.id)]);
    if (!existing) return res.status(404).json({ message: 'Cliente no encontrado' });
    execute(db, 'DELETE FROM CLIENTE WHERE id_cliente = ?', [Number(req.params.id)]);
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar cliente', error: error.message });
  }
};
