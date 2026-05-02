import initSqlJs from 'sql.js';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'bano_perros.db');

let db;

/**
 * Inicializa y retorna la instancia de la base de datos.
 * Si el archivo .db existe, lo carga; si no, crea uno nuevo.
 */
export async function getDB() {
  if (db) return db;

  const SQL = await initSqlJs();

  if (existsSync(dbPath)) {
    const buffer = readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // Habilitar foreign keys
  db.run('PRAGMA foreign_keys = ON');

  return db;
}

/**
 * Guarda la base de datos al archivo en disco.
 */
export function saveDB() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    writeFileSync(dbPath, buffer);
  }
}

export { dbPath };
