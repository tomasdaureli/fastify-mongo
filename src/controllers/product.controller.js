const Product = require('../models/product.model');

const getProducts = async (req, reply) => {
    const products = await Product.find();
    return products
};

const getProductById = async (req, reply) => {
    const product = await Product.findById(req.params.id)
    reply.code(200).send(product)
};

const createProduct = async (req, reply) => {
    const newProduct = new Product(req.body);
    await newProduct.save();

    reply.code(201).send(newProduct);
};

const deleteProduct = async (req, reply) => {
    await Product.findByIdAndDelete(req.params.id);
    reply.code(204).send();
};

const updateProduct = async (req, reply) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    reply.code(200).send(updatedProduct);
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
};