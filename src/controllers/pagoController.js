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

export const getPagos = async (req, res) => {
  try {
    const db = await getDB();
    res.json(queryAll(db, `SELECT p.*, c.fecha AS fecha_cita, m.nombre AS nombre_mascota, cl.nombre AS nombre_cliente
      FROM PAGO p LEFT JOIN CITA c ON p.id_cita = c.id_cita
      LEFT JOIN MASCOTA m ON c.id_mascota = m.id_mascota
      LEFT JOIN CLIENTE cl ON m.id_cliente = cl.id_cliente`));
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pagos', error: error.message });
  }
};

export const getPagoById = async (req, res) => {
  try {
    const db = await getDB();
    const row = queryOne(db, `SELECT p.*, c.fecha AS fecha_cita, m.nombre AS nombre_mascota, cl.nombre AS nombre_cliente
      FROM PAGO p LEFT JOIN CITA c ON p.id_cita = c.id_cita
      LEFT JOIN MASCOTA m ON c.id_mascota = m.id_mascota
      LEFT JOIN CLIENTE cl ON m.id_cliente = cl.id_cliente
      WHERE p.id_pago = ?`, [Number(req.params.id)]);
    if (!row) return res.status(404).json({ message: 'Pago no encontrado' });
    res.json(row);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pago', error: error.message });
  }
};

export const createPago = async (req, res) => {
  try {
    const db = await getDB();
    const { id_cita, fecha_pago, total, metodo_pago } = req.body;
    execute(db, 'INSERT INTO PAGO (id_cita, fecha_pago, total, metodo_pago) VALUES (?,?,?,?)',
      [id_cita, fecha_pago, total, metodo_pago]);
    const id = db.exec('SELECT last_insert_rowid()')[0].values[0][0];
    res.status(201).json({ id, id_cita, fecha_pago, total, metodo_pago });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear pago', error: error.message });
  }
};

export const updatePago = async (req, res) => {
  try {
    const db = await getDB();
    const { id_cita, fecha_pago, total, metodo_pago } = req.body;
    const existing = queryOne(db, 'SELECT * FROM PAGO WHERE id_pago = ?', [Number(req.params.id)]);
    if (!existing) return res.status(404).json({ message: 'Pago no encontrado' });
    execute(db, 'UPDATE PAGO SET id_cita=?, fecha_pago=?, total=?, metodo_pago=? WHERE id_pago=?',
      [id_cita, fecha_pago, total, metodo_pago, Number(req.params.id)]);
    res.json({ message: 'Pago actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar pago', error: error.message });
  }
};

export const deletePago = async (req, res) => {
  try {
    const db = await getDB();
    const existing = queryOne(db, 'SELECT * FROM PAGO WHERE id_pago = ?', [Number(req.params.id)]);
    if (!existing) return res.status(404).json({ message: 'Pago no encontrado' });
    execute(db, 'DELETE FROM PAGO WHERE id_pago = ?', [Number(req.params.id)]);
    res.json({ message: 'Pago eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar pago', error: error.message });
  }
};
