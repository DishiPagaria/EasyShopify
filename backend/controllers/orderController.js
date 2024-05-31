const Order = require('../models/orderSchema.js');

const newOrder = async (req, res) => {
    try {

        const {
            buyer,
            shippingData,
            orderedProducts,
            paymentInfo,
            productsQuantity,
            totalPrice,
        } = req.body;

        const order = await Order.create({
            buyer,
            shippingData,
            orderedProducts,
            paymentInfo,
            paidAt: Date.now(),
            productsQuantity,
            totalPrice,
        });

        return res.send(order);

    } catch (err) {
        res.status(500).json(err);
    }
}

const getOrderedProductsByCustomer = async (req, res) => {
    try {
        let orders = await Order.find({ buyer: req.params.id });

        if (orders.length > 0) {
            const orderedProducts = orders.reduce((accumulator, order) => {
                accumulator.push(...order.orderedProducts);
                return accumulator;
            }, []);
            res.send(orderedProducts);
        } else {
            res.send({ message: "No products found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getOrderedProductsBySeller = async (req, res) => {
    try {
        const sellerId = req.params.id;

        const ordersWithSellerId = await Order.find({
            'orderedProducts.seller': sellerId
        }).populate('buyer');

        if (ordersWithSellerId.length > 0) {
            const orderedProductsByBuyer = [];

            ordersWithSellerId.forEach(order => {
                order.orderedProducts.forEach(product => {
                    const existingProductIndex = orderedProductsByBuyer.findIndex(p => p.buyer._id.toString() === order.buyer._id.toString() && p._id.toString() === product._id.toString());
                    if (existingProductIndex !== -1) {

                        orderedProductsByBuyer[existingProductIndex].quantity += product.quantity;
                    } else {
                        orderedProductsByBuyer.push({
                            ...product.toObject(),
                            buyer: order.buyer,
                            paymentInfo: order.paymentInfo,
                            shippingData: order.shippingData,
                            paidAt: order.paidAt,
                            orderStatus: order.orderStatus,
                        });
                    }
                });
            });

            res.send({ orderedProductsByBuyer }); 
        } else {
            res.send({ message: "No products found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};



module.exports = {
    newOrder,
    getOrderedProductsByCustomer,
    getOrderedProductsBySeller
};
