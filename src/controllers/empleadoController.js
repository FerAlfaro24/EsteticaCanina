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

export const getEmpleados = async (req, res) => {
  try {
    const db = await getDB();
    res.json(queryAll(db, 'SELECT * FROM EMPLEADO'));
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener empleados', error: error.message });
  }
};

export const getEmpleadoById = async (req, res) => {
  try {
    const db = await getDB();
    const row = queryOne(db, 'SELECT * FROM EMPLEADO WHERE id_empleado = ?', [Number(req.params.id)]);
    if (!row) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json(row);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener empleado', error: error.message });
  }
};

export const createEmpleado = async (req, res) => {
  try {
    const db = await getDB();
    const { nombre, telefono, puesto } = req.body;
    execute(db, 'INSERT INTO EMPLEADO (nombre, telefono, puesto) VALUES (?, ?, ?)', [nombre, telefono, puesto]);
    const id = db.exec('SELECT last_insert_rowid()')[0].values[0][0];
    res.status(201).json({ id, nombre, telefono, puesto });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear empleado', error: error.message });
  }
};

export const updateEmpleado = async (req, res) => {
  try {
    const db = await getDB();
    const { nombre, telefono, puesto } = req.body;
    const existing = queryOne(db, 'SELECT * FROM EMPLEADO WHERE id_empleado = ?', [Number(req.params.id)]);
    if (!existing) return res.status(404).json({ message: 'Empleado no encontrado' });
    execute(db, 'UPDATE EMPLEADO SET nombre = ?, telefono = ?, puesto = ? WHERE id_empleado = ?',
      [nombre, telefono, puesto, Number(req.params.id)]);
    res.json({ message: 'Empleado actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar empleado', error: error.message });
  }
};

export const deleteEmpleado = async (req, res) => {
  try {
    const db = await getDB();
    const existing = queryOne(db, 'SELECT * FROM EMPLEADO WHERE id_empleado = ?', [Number(req.params.id)]);
    if (!existing) return res.status(404).json({ message: 'Empleado no encontrado' });
    execute(db, 'DELETE FROM EMPLEADO WHERE id_empleado = ?', [Number(req.params.id)]);
    res.json({ message: 'Empleado eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar empleado', error: error.message });
  }
};
