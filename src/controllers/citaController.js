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

export const getCitas = async (req, res) => {
  try {
    const db = await getDB();
    const rows = queryAll(db, `
      SELECT c.*, m.nombre AS nombre_mascota, e.nombre AS nombre_empleado
      FROM CITA c
      LEFT JOIN MASCOTA m ON c.id_mascota = m.id_mascota
      LEFT JOIN EMPLEADO e ON c.id_empleado = e.id_empleado
      ORDER BY c.fecha DESC, c.hora ASC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener citas', error: error.message });
  }
};

export const getCitaById = async (req, res) => {
  try {
    const db = await getDB();
    const cita = queryOne(db, `
      SELECT c.*, m.nombre AS nombre_mascota, e.nombre AS nombre_empleado
      FROM CITA c LEFT JOIN MASCOTA m ON c.id_mascota = m.id_mascota
      LEFT JOIN EMPLEADO e ON c.id_empleado = e.id_empleado
      WHERE c.id_cita = ?
    `, [Number(req.params.id)]);
    if (!cita) return res.status(404).json({ message: 'Cita no encontrada' });
    const servicios = queryAll(db, `
      SELECT dc.*, s.nombre AS nombre_servicio, s.descripcion
      FROM DETALLE_CITA dc LEFT JOIN SERVICIO s ON dc.id_servicio = s.id_servicio
      WHERE dc.id_cita = ?
    `, [Number(req.params.id)]);
    res.json({ ...cita, servicios });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cita', error: error.message });
  }
};

export const createCita = async (req, res) => {
  try {
    const db = await getDB();
    const { fecha, hora, estado, id_mascota, id_empleado } = req.body;
    execute(db, 'INSERT INTO CITA (fecha, hora, estado, id_mascota, id_empleado) VALUES (?,?,?,?,?)',
      [fecha, hora, estado || 'pendiente', id_mascota, id_empleado]);
    const id = db.exec('SELECT last_insert_rowid()')[0].values[0][0];
    res.status(201).json({ id, fecha, hora, estado: estado || 'pendiente', id_mascota, id_empleado });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear cita', error: error.message });
  }
};

export const updateCita = async (req, res) => {
  try {
    const db = await getDB();
    const { fecha, hora, estado, id_mascota, id_empleado } = req.body;
    const existing = queryOne(db, 'SELECT * FROM CITA WHERE id_cita = ?', [Number(req.params.id)]);
    if (!existing) return res.status(404).json({ message: 'Cita no encontrada' });
    execute(db, 'UPDATE CITA SET fecha=?, hora=?, estado=?, id_mascota=?, id_empleado=? WHERE id_cita=?',
      [fecha, hora, estado, id_mascota, id_empleado, Number(req.params.id)]);
    res.json({ message: 'Cita actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar cita', error: error.message });
  }
};

export const deleteCita = async (req, res) => {
  try {
    const db = await getDB();
    const existing = queryOne(db, 'SELECT * FROM CITA WHERE id_cita = ?', [Number(req.params.id)]);
    if (!existing) return res.status(404).json({ message: 'Cita no encontrada' });
    execute(db, 'DELETE FROM CITA WHERE id_cita = ?', [Number(req.params.id)]);
    res.json({ message: 'Cita eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar cita', error: error.message });
  }
};
