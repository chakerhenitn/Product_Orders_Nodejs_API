const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');

const Product = require('../models/product');

router.get('/', async (req, res, next)=>{
await Order.
find()
.select('quantity _id product' )
.populate('product', 'name')
.exec()
.then(docs => {
    res.status(201).json({
        count: docs.length,
        orders: docs.map(doc => {
            return {
                _id: doc._id,
                product: doc.product,
                quantity: doc.quantity,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/'+doc._id
                }
            }
        })
    });
})
.catch(err => {
    res.status(500).json({error: err})
});
});

router.post('/', async (req, res, next)=>{
await Product.findById(req.body.productId)
.then(product =>{
    if(!product){
        return res.status(500).json({
            message: 'Product not exist'
        })
    }
    const  order =  new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    return order
    .save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'Order is added with success',
            createdOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request:{
                type: 'GET',
                url: 'http://localhost:3000/orders/'+result._id
            }
        })
    }).catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });
});
});

router.get('/:ordID', async (req, res, next)=>{
    await Order.findById(req.params.ordID)
    .select('product quantity _id')
    .populate('product', 'name' )
    .exec()
    .then(detailOrder => {
        if(!detailOrder){
            return res.status(404).json({
                message: 'Order doesnt exist in the database'
            });
        }
        res.status(200).json({
            order: detailOrder,
            request:{
                type: 'GET',
                url: 'http://localhost:3000/orders/'
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

});



router.delete('/:ordID', (req, res, next)=>{
Order.findByIdAndRemove({_id: req.params.ordID})
.exec()
.then(result => {
    res.status(200).json({
        message: 'Order is deleted with success',
        request:{
            type: 'POST',
            url: 'http://localhost:3000/orders/',
            body: {productID: 'ID', quantity: 'Number'}
        }
    });
})
.catch(err => {
    res.status(500).json({
        error: err
    });
});
});

    module.exports = router;