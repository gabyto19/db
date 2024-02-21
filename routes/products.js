const express = require('express')
const router = express.Router()
const Product = require('../models/products')

// Getting all
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product)
})

// Creating one
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    photo: req.body.photo
  })
  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
// router.patch('/:id', getProduct, async (req, res) => {
//   if (req.body.name != null) {
//     res.product.name = req.body.name
//   }
//   if (req.body.subscribedToChannel != null) {
//     res.product.subscribedToChannel = req.body.subscribedToChannel
//   }
//   try {
//     const updatedProduct = await res.product.save()
//     res.json(updatedProduct)
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })

// // Deleting One
// router.delete('/:id', getProduct, async (req, res) => {
//   try {
//     await res.product.remove()
//     res.json({ message: 'Deleted Product' })
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })


async function getProduct(req, res, next) {
  let product
  try {
    product = await Product.findById(req.params.id)
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.product = product
  next()
}

module.exports = router