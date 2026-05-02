import { Router } from 'express';
import { getRazas, getRazaById, createRaza, updateRaza, deleteRaza } from '../controllers/razaController.js';

const router = Router();

router.get('/', getRazas);
router.get('/:id', getRazaById);
router.post('/', createRaza);
router.put('/:id', updateRaza);
router.delete('/:id', deleteRaza);

export default router;
