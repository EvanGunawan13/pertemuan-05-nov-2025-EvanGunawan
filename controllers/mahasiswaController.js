import Mahasiswa from '../models/mahasiswa.js';
import bcrypt from 'bcryptjs';

const createMahasiswa = async (req, res) => {
	try {
		const { fullname, npm, email, date_of_born, password } = req.body;
		const existsMahasiswa = await Mahasiswa.findOne({ npm });
		if (existsMahasiswa) return res.status(400).json({ message: 'NPM already registered' });

		const passwordHash = await bcrypt.hash(password, 10);
		const newMahasiswa = await Mahasiswa.create({
			fullname,
			npm,
			email,
			date_of_born,
			password: passwordHash,
		});

		const mahasiswaObj = newMahasiswa.toObject();
		delete mahasiswaObj.password;

		res.status(201).json({
			message: 'Mahasiswa created successfully',
			data: mahasiswaObj,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const loginMahasiswa = async (req, res) => {
	try {
		const { npm, password } = req.body;
		const mahasiswa = await Mahasiswa.findOne({ npm, });
		if (!mahasiswa) return res.status(401).json({ message: 'Invalid NPM or password' });
		const isPasswordMatch = await bcrypt.compare(password, mahasiswa.password);
		if (!isPasswordMatch) return res.status(401).json({ message: 'Invalid NPM or password' });

		const mahasiswaObj = mahasiswa.toObject();
		delete mahasiswaObj.password;

		res.status(200).json({ message: 'Login successful', data: mahasiswaObj });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const allMahasiswa = async (req, res) => {
	try {
		const mahasiswa = await Mahasiswa.find().select('-password');
		if (!mahasiswa) return res.status(404).json({ message: 'No mahasiswa found' });
		res.status(200).json({
			message: 'List of all mahasiswa',
			data: mahasiswa,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateMahasiswa = async (req, res) => {
	try {
		const { id } = req.params;
		const { fullname, npm, email, date_of_born, password, isActive } = req.body;
		const updatedMahasiswa = await Mahasiswa.findByIdAndUpdate(id, { fullname, npm, email, date_of_born, password, isActive }, { new: true });
		if (!updatedMahasiswa) return res.status(404).json({ message: 'Mahasiswa not found' });

		const mahasiswaObj = updatedMahasiswa.toObject();
		delete mahasiswaObj.password;

		res.status(200).json({
			message: 'Mahasiswa updated successfully',
			data: mahasiswaObj,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteMahasiswa = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedMahasiswa = await Mahasiswa.findByIdAndDelete(id);
		if (!deletedMahasiswa) return res.status(404).json({ message: 'Mahasiswa not found' });

		const mahasiswaObj = deletedMahasiswa.toObject();
		delete mahasiswaObj.password;
		res.status(200).json({
			message: 'Mahasiswa deleted successfully',
			data: mahasiswaObj,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getMahasiswaById = async (req, res) => {
	try {
		const { id } = req.params;
		const mahasiswa = await Mahasiswa.findById(id);
		if (!mahasiswa) return res.status(404).json({ message: 'Mahasiswa not found' });
		const mahasiswaObj = mahasiswa.toObject();
		delete mahasiswaObj.password;
		res.status(200).json({
			message: 'Mahasiswa details',
			data: mahasiswaObj,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export { createMahasiswa, loginMahasiswa, allMahasiswa, updateMahasiswa, deleteMahasiswa, getMahasiswaById };