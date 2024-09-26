import multer from 'multer';

// Set up storage options
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the destination folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Save with a unique filename
    }
});

// Create the multer upload instance
const upload = multer({ storage });

export default upload;
