// // controllers/productController.js

// const Product = require('../Models/productmodel');
// const multer = require('multer');

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.originalname);
//   }
// });
// const upload = multer({ storage: storage });

// // Controller function to add a new product
// exports.addProduct = async (req, res) => {
//   try {
//     const { productName, price } = req.body;
//     const imageUrl = req.file ? req.file.path : null;

//     const product = new Product({ productName, price, imageUrl });
//     await product.save();
//     res.status(201).json({ message: 'Product added successfully', product });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add product' });
//   }
// };

// // const Product = require('../models/Product');

// // Controller function to fetch all products
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch products' });
//   }
// };

const Product = require('../Models/productmodel');
const { uploaded } = require('../utils/cloudinary');

// Controller function to add a new product
exports.addProduct = async (req, res) => {
  uploaded(req, res, async function(err) {
    if (err) {
      console.error('Error uploading image:', err);
      return res.status(500).json({ error: 'Failed to upload image' });
    }

    const { productName, price ,userName ,userEmail} = req.body;
    const imageUrl = req.file ? req.file.path : null;

    try {
      const product = new Product({ productName, price, imageUrl ,userName ,userEmail});
      await product.save();
      res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Failed to add product' });
    }
  });
};

// Controller function to fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


exports.getProductsByUserName = async (req, res) => {
  try {
    const userName = req.params.userName;
    const products = await Product.find({ userName });
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this user' });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};