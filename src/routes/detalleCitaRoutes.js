import { Router } from 'express';
import { getDetallesCita, getDetallesByCita, createDetalleCita, deleteDetalleCita } from '../controllers/detalleCitaController.js';

const router = Router();

router.get('/', getDetallesCita);
router.get('/cita/:citaId', getDetallesByCita);
router.post('/', createDetalleCita);
router.delete('/:id', deleteDetalleCita);

export default router;
