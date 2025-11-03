import { createMahasiswa, loginMahasiswa, allMahasiswa, updateMahasiswa, deleteMahasiswa, getMahasiswaById } from '../controllers/mahasiswaController.js';
import express from 'express';

const router = express.Router();

router.post('/register', (req, res) => {
  res.json({ message: 'Register berhasil!' });
});

router.post('/auth/register', createMahasiswa);
router.post('/auth/login', loginMahasiswa);
router.get('/mahasiswa', allMahasiswa);
router.get('/mahasiswa/:id', getMahasiswaById);
router.put('/mahasiswa/:id', updateMahasiswa);
router.delete('/mahasiswa/:id', deleteMahasiswa);

export default router;