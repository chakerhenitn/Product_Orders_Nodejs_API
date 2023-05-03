const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
res.status(200).json({
message: 'handling Get requests to the URL /orders'
});
});

router.post('/', (req, res, next)=>{
    const order = {
        quantity: req.body.quantity,
        productId: req.body.productId
    };
    res.status(200).json({
    message: 'handling POST requests to the URL /orders',
    order: order
    });
    });

router.get('/:ordID', (req, res, next)=>{
    res.status(200).json({
        message: ' You discovered the special ID',
    });

});



router.delete('/:ordID', (req, res, next)=>{
    res.status(200).json({
        message: ' You deleted the order',
    });
});

    module.exports = router;