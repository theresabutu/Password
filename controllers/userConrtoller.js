const bcrypt = require('bcrypt');
const User =require('../models/User');
const jwt =require('jasonwebtoken');

//This is the user registration

exports.register = async (req, res) => {
    try{
        const {name, email, password} = req.body;

    //check if user with the same email already exists
    const existingUser = await User.findone({ email });

    if (existingUser) {
        return res.status(409).json({ error: 'Email already exists'});
    }

    //Now hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create a new user
    const newUser =new User({
        name,
        email,
        password:hashedPassword
    });
    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error'});
    }
};

//user login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

//Find users by email

        const user = await User.findOne({email });
        if (!user){
            return res.status(401).json({ error: 'Invalid credentials'});
        }
    
//compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials'});
    }

//Generate amd send JWT
    const token = jwt.sign({ userID: user._id}, 'your-secret-key');
    return res.status(200).json({token});

} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error'});
}

};