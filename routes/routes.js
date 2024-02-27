module.exports = function (upload) {
    const express = require('express');
    const router = express.Router();
    const parkingController = require('../controllers/parkingController');

    router.post('/register', upload.single('photo'), parkingController.register);
    router.get('/list', parkingController.list);
    router.patch('/withdraw', parkingController.withdraw);

    router.get('/test-connection', (req, res) => {
        const clientIp = req.ip || req.socket.remoteAddress;
        console.log(`${new Date().toLocaleString()} - New Connection to Server - Client IP: ${clientIp}`);
        res.status(200).send('OK');
    });

    return router;
};