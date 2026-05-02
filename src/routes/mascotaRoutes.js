import { Router } from 'express';
import { getMascotas, getMascotaById, createMascota, updateMascota, deleteMascota, getMascotasByCliente } from '../controllers/mascotaController.js';

const router = Router();

router.get('/', getMascotas);
router.get('/:id', getMascotaById);
router.get('/cliente/:clienteId', getMascotasByCliente);
router.post('/', createMascota);
router.put('/:id', updateMascota);
router.delete('/:id', deleteMascota);

export default router;
