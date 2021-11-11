const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.connect('mongodb+srv://root:root@cluster0.obe6m.mongodb.net/mascotas', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Base de datos conectada');
    } catch (err) {
        console.log(err);
        throw new Error('Error al conectar con la base de datos');
    }
}

module.exports = {
    dbConnection
}