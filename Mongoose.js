const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // โมเดลของผู้ใช้

// ฟังก์ชันสมัครสมาชิก
app.post('/register', async(req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.send('User registered successfully!');
});

// ฟังก์ชันล็อกอิน
app.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).send('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).send('Incorrect password');
    }
    res.send('Login successful');
});