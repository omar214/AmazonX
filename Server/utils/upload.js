import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: './upload/images',
	filename: (req, file, cb) => {
		return cb(
			null,
			`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
		);
	},
});

const upload = multer({
	storage: storage,
});

export default upload;
