const Cart = require('../models/cart');

const getUserCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, quantity }] });
            await cart.save();
            return res.json({ msg: 'Cart created and item added successfully', cart });
        } else {
            const existingItemIndex = cart.items.findIndex(item => item.productId === productId);
            if (existingItemIndex !== -1) {
                cart.items[existingItemIndex].quantity += quantity;
                await cart.save();
                return res.json({ msg: 'Item quantity updated in the cart', cart });
            } else {
                cart.items.push({ productId, quantity });
                await cart.save();
                return res.json({ msg: 'Item added to the cart', cart });
            }
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const existingItem = cart.items.find(item => item.productId.toString()  == productId);

        if (!existingItem) {
            return res.status(404).json({ msg: 'Item not found in cart' });
        }

        existingItem.quantity = quantity;

        await cart.save();
        res.json({ msg: 'Item quantity updated in the cart', cart });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        await cart.save();
        res.json({ msg: 'Item removed from the cart', cart });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { getUserCart, addToCart, updateCartItem, removeFromCart };
