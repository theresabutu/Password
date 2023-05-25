const jwt =require('jasonwebtoken');
const nodemailer =require('nodemailer');
const User =require('models/User');

//Initiate password Reset
exports.forgotPassword = async (req,res) => {
 try {
    const { email } =req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a JWT token with a secret key and expiration time
    const token = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });

    // Save the token to the user's document in the database
    user.resetToken = token;
    await user.save();

    // Send a password reset email to the user with the token
    const transporter = nodemailer.createTransport({
      // Configure your email provider here
    });

    const mailOptions = {
      from: 'your-email@example.com',
      to: email,
      subject: 'Password Reset',
      text: `Click on the following link to reset your password: ${token}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status((200).json({ message: 'Password reset email sent' }));
} catch (error) {
  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
}
};

// Handle password reset
exports.resetPassword = async (req, res) => {
try {
  const { token, newPassword } = req.body;

  // Verify the token
  const decodedToken = jwt.verify(token, 'your-secret-key');

  // Check if the token is valid and not expired
  const user = await User.findOne({ email: decodedToken.email });
  if (!user || user.resetToken !== token) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password and reset token
  user.password = hashedPassword;
  user.resetToken = null;
  await user.save();

  return res.status(200).json({ message: 'Password reset successful' });
} catch (error) {
  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
}
};