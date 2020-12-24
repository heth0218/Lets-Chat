const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name && !email && !password) {
            return res.status(500).sebd({
                msg: 'Please enter into all fields that are necsarry'
            })
        }
        const user = new User({
            name,
            email,
            password
        })
        await user.save()
        res.status(200).send(user)
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error,
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(404).send({
                msg: 'No user found sorry!'
            })
        }
        if (user.password !== password) {
            return res.status(500).send({
                msg: 'User password is incorrect'
            })
        }
        res.status(200).send(user)
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error,
        });
    }
}