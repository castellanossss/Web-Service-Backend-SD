let cars = [];

exports.register = (req, res) => {
    const timestamp = req.body.timestamp ? new Date(req.body.timestamp) : new Date();

    const newCar = {
        licensePlate: req.body.license_plate.toUpperCase(),
        color: req.body.color,
        timestamp: timestamp.toISOString(),
        imagePath: req.file.filename
    };

    const existingCar = cars.find(car => car.licensePlate === newCar.licensePlate);
    if (existingCar) {
        console.log(`${new Date().toLocaleString()} - Error: Car registration - License Plate: ${newCar.licensePlate} already registered.`);
        return res.status(400).json({ message: 'Car with this license plate is already registered.' });
    }

    cars.push(newCar);
    console.log(`${new Date().toLocaleString()} - Request: Car registration - License Plate: ${newCar.licensePlate.toUpperCase()}.`);
    res.status(201).json({ message: 'Car successfully registered.', car: newCar });
};

exports.list = (req, res) => {
    console.log(`${new Date().toLocaleString()} - Request: List cars.`);
    res.status(200).json(cars);
};

exports.withdraw = (req, res) => {
    const licensePlate = req.body.license_plate;
    const index = cars.findIndex(car => car.licensePlate === licensePlate);

    if (index > -1) {
        cars.splice(index, 1);
        console.log(`${new Date().toLocaleString()} - Request: Withdraw car - License Plate: ${licensePlate}.`);
        res.status(200).json({ message: 'Car withdrawn successfully.' });
    } else {
        console.log(`${new Date().toLocaleString()} - Error: Car not found - License Plate: ${licensePlate}.`);
        res.status(404).json({ message: 'Car not found.' });
    }
};