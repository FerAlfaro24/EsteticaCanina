import { getDB, saveDB } from '../database/connection.js';

function queryAll(db, sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

function execute(db, sql, params = []) {
  db.run(sql, params);
  saveDB();
}

export const getDetallesCita = async (req, res) => {
  try {
    const db = await getDB();
    res.json(queryAll(db, `SELECT dc.*, s.nombre AS nombre_servicio, s.descripcion
      FROM DETALLE_CITA dc LEFT JOIN SERVICIO s ON dc.id_servicio = s.id_servicio`));
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener detalles', error: error.message });
  }
};

export const getDetallesByCita = async (req, res) => {
  try {
    const db = await getDB();
    res.json(queryAll(db, `SELECT dc.*, s.nombre AS nombre_servicio, s.descripcion
      FROM DETALLE_CITA dc LEFT JOIN SERVICIO s ON dc.id_servicio = s.id_servicio
      WHERE dc.id_cita = ?`, [Number(req.params.citaId)]));
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener detalles', error: error.message });
  }
};

export const createDetalleCita = async (req, res) => {
  try {
    const db = await getDB();
    const { id_cita, id_servicio, precio } = req.body;
    execute(db, 'INSERT INTO DETALLE_CITA (id_cita, id_servicio, precio) VALUES (?,?,?)', [id_cita, id_servicio, precio]);
    const id = db.exec('SELECT last_insert_rowid()')[0].values[0][0];
    res.status(201).json({ id, id_cita, id_servicio, precio });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear detalle', error: error.message });
  }
};

export const deleteDetalleCita = async (req, res) => {
  try {
    const db = await getDB();
    execute(db, 'DELETE FROM DETALLE_CITA WHERE id_detalle = ?', [Number(req.params.id)]);
    res.json({ message: 'Detalle eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar detalle', error: error.message });
  }
};
