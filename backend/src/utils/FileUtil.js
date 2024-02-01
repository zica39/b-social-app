const multer = require('multer');

module.exports = {
	// createStorage(filePath = 'public', fileName = null) {
	// 	return
	// },
	createFileUpload(name, mimes, fileName = null, filePath = 'public', timestamp = null) {
		const storage = multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, filePath)
			},
			filename: function (req, file, cb) {
				if(!fileName) {
					fileName = `${timestamp}-${file.originalname}`
				}
				cb(null, fileName);
			}
		});
		return multer({
			storage: storage,
			fileFilter: (req, file, cb) => {
				if(!file) {
					cb(null, false);
					return cb(new Error("Image field is required."))
				}
				if(mimes.includes(file.mimetype)) {
					cb(null, true);
				}
				else {
					cb(null, false);
					const mimesText = mimes.join(', ')
					return cb(new Error(`Invalid mime type. Supported mimes are: ${mimesText}`));
				}
			}
		});
	}
}
