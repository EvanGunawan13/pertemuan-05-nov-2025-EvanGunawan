import mongoose from 'mongoose';
const mahasiswaSchema = new mongoose.Schema({
	fullname: {
		type: String,
	},
	npm: {
		type: String,
		required: true,
		unique: true,
		maxLength: 10,
	},
	email: {
		type: String,
		required: true,
	},
	date_of_born: {
		type: Date,
	},
	password: {
		type: String,
		required: true,
	},
	isActive: {
		type: Boolean,
		default: true,
	},
});

export default mongoose.model('Mahasiswa', mahasiswaSchema);