import express from 'express';
import cors from 'cors';

// Importar rutas
import clienteRoutes from './src/routes/clienteRoutes.js';
import mascotaRoutes from './src/routes/mascotaRoutes.js';
import razaRoutes from './src/routes/razaRoutes.js';
import empleadoRoutes from './src/routes/empleadoRoutes.js';
import servicioRoutes from './src/routes/servicioRoutes.js';
import citaRoutes from './src/routes/citaRoutes.js';
import detalleCitaRoutes from './src/routes/detalleCitaRoutes.js';
import pagoRoutes from './src/routes/pagoRoutes.js';

// Configuración
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    mensaje: 'Bienvenido a la API de Estética Canina 🐾',
    version: '1.0.0',
    endpoints: {
      clientes: '/api/clientes',
      mascotas: '/api/mascotas',
      razas: '/api/razas',
      empleados: '/api/empleados',
      servicios: '/api/servicios',
      citas: '/api/citas',
      detallesCita: '/api/detalles-cita',
      pagos: '/api/pagos'
    }
  });
});

// Rutas de la API
app.use('/api/clientes', clienteRoutes);
app.use('/api/mascotas', mascotaRoutes);
app.use('/api/razas', razaRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/detalles-cita', detalleCitaRoutes);
app.use('/api/pagos', pagoRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🐾 Servidor de Estética Canina corriendo en http://localhost:${PORT}`);
  console.log(`📋 Documentación de la API en http://localhost:${PORT}/`);
});
