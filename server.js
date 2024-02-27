const cors = require('cors');
const express = require('express');
const path = require('path'); 
const multer = require('multer');
const app = express();

console.log(`${new Date().toLocaleString()} - Application starting...`);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const fileExt = path.extname(file.originalname);
        const filename = file.fieldname + '-' + Date.now() + fileExt;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const routes = require('./routes/routes'); 
app.use('/cars', routes(upload)); 

const PORT = 2527;
app.listen(PORT, () => {
    console.log(`${new Date().toLocaleString()} - Server listening on port ${PORT}.`);
});

