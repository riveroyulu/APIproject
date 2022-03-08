const mongoose = require('../database');

const schema = new mongoose.Schema({
    marca:{
        type: "String",
        required: true
    },
    modelo:{ 
        type: "String",
        required: true
    },
    descricao:{
        type: "String",
        required: true
    },
    ano:{
        type: Number,
        required: true
    },
    cor:{
        type: "String",
        required: true
    },
    preco:{
        type: Number,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    carImage: {
        type: "string"
    }
});

const productCar = mongoose.model('product', schema);

module.exports = productCar;