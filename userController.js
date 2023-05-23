const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const {
        typeOfUser,
        name,
        email,
        password,
        phone,
        birthday,
        wilaya,
        daira,
        baladia,
        sport,
        gender
        } = req.body;

        const userExists = await User.findOne({ phone });
        if (userExists) {
            return res.status(401).json({
                error: 'رقم الهاتف مستخدم مسبقا'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            birthday,
            wilaya,
            daira,
            baladia,
            sport,
            gender,
            typeOfUser
        });

        const savedUser = await newUser.save();
        // Sign a JWT and send it in the response
        const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET);
        res.status(201).json({
        message: 'تم إضافة المستخدم بنجاح',
        user: savedUser,
        token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};


exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ error: 'مستخدم غير موجود' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'كلمة السر خاطئة' });
        }

        // Sign a JWT and send it in the response
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.getUser = async (req, res) => {
    try {
    const { id } = req.params;
    const userFound = await User.findById({ _id : id });

    res.status(200).json({ userFound });
    } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
    }
};

exports.getResultSearch = async (req, res) => {
    try {
    const { wilaya, daira, baladia } = req.body;
    const users = await User.find({ wilaya, daira, baladia });

    res.status(200).json({ users });
    } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
    }
};

exports.editUser= async(req,res ) => {
    try {
        const update = req.body
        const { id } = req.params;
        const userToUpdate = await User.findByIdAndUpdate({ _id : id }, update);
        res.json({userToUpdate})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.editPassword= async (req,res) => {
    try {
        const {curpass, password} = req.body;
        
     


    const user = await User.findById(req.params.id);
    console.log({password})
    console.log('this is the curpass')
    console.log({curpass})
    
            // Check if the old password matches the one stored in the database
    const isPasswordMatch = await bcrypt.compare(curpass, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid old password' });
    }


// Generate a new salt and hash the new password
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
console.log({hashedPassword})
// Update the user's password in the database
user.password = hashedPassword;
await user.save();

res.status(200).json({ message: 'Password updated successfully' });
} catch (error) {
console.error(error);
res.status(500).json({ message: 'An error occurred' });
}
};


       



