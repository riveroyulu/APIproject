const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productCar = require('./models/product');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


require('dotenv').config();

const port = 8081;

//chamando o json na requisição
app.use(express.json());
const bodyParser = require('body-parser');
const urlDB = process.env.MONGO_URI

//Documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//conectar mongoose com express
mongoose.connect(process.env.MONGO_URI), {
    useUnifieldTopology: true,
    useNewUrlParser: true
}, console.log('Connected to database');

//para entender quando enviamos informação de requisição com json
app.use(bodyParser.json());

//para decodar parametros url 
app.use(bodyParser.urlencoded({extended: false}));

//Cadastrando um produto com POST
app.post('/carros', async (req, res) => {
    const {marca, modelo, descricao, ano, cor, preco, quantidade, carImage} = req.body;
    const car = {
        marca,
        modelo,
        descricao,
        ano,
        cor,
        preco,
        quantidade,
        carImage,
    }
    try {
            const newProduct = await productCar.create(car)
            return res.status(201).send(newProduct)
            } catch(err) {
                return res.status(400).json(err)
            }
        }),

        //Listar todos os carros cadastrados com requisição GET

        app.get('/carros', async(req, res) => {
            try {
                const listProduct = await productCar.find(req.body)
                return res.status(200).json(listProduct)
            } catch(err) {
                return res.status(404).json(err)
            }
        });

        //Listar um carro específico com id
        app.get('/carros/:id', async(req, res) => {
            try {
                const product = await productCar.findById(req.params.id)                
                return res.status(200).json(product)
            } catch(err) {
                return res.status(404).send('carro nâo encontrado')
            } 
        });

       //Atualizar um carro com método PUT

       app.put('/carros/:id', async (req, res) => {
        try {
            
            await productCar.findByIdAndUpdate(req.params.id, req.body)
            const updateProduct = await productCar.findById(req.params.id)
            return res.status(201).send(updateProduct)
        } catch(err) {
            return res.status(400).send(err)
        } 
    });

        //Requisição para deletar um carro
        app.delete('/carros/:id', async(req, res) => {
            try {
                const getDelete = await productCar.findByIdAndRemove(req.params.id)
                return res.status(200).send('Produto deletado no banco de dados')
            } catch(err) {
                return res.status(404).send('carro nâo existente')
            }
        });
  
app.listen(port, () => {
    console.log('Server running')
});