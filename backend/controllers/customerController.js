const bcrypt = require('bcrypt');
const Customer = require('../models/customerSchema.js');
const { createNewToken } = require('../utils/token.js');

const customerRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const customer = new Customer({
            ...req.body,
            password: hashedPass
        });

        const existingcustomerByEmail = await Customer.findOne({ email: req.body.email });

        if (existingcustomerByEmail) {
            res.send({ message: 'Email already exists' });
        }
        else {
            let result = await customer.save();
            result.password = undefined;
            
            const token = createNewToken(result._id)

            result = {
                ...result._doc,
                token: token
            };

            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const customerLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        let customer = await Customer.findOne({ email: req.body.email });
        if (customer) {
            const validated = await bcrypt.compare(req.body.password, customer.password);
            if (validated) {
                customer.password = undefined;

                const token = createNewToken(customer._id)

                customer = {
                    ...customer._doc,
                    token: token
                };

                res.send(customer);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "User not found" });
        }
    } else {
        res.send({ message: "Email and password are required" });
    }
};

const getCartDetail = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await Customer.findById(customerId).populate('cartDetails.seller', 'shopName').exec();
        if (customer) {
            res.send(customer.cartDetails);
        } else {
            res.status(404).send({ message: "Customer not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const cartUpdate = async (req, res) => {
    try {
        const customerId = req.params.id;
        let customer = await Customer.findByIdAndUpdate(customerId, req.body, { new: true }).exec();
        if (customer) {
            return res.send(customer.cartDetails);
        } else {
            res.status(404).send({ message: "Customer not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = {
    customerRegister,
    customerLogIn,
    getCartDetail,
    cartUpdate,
};
