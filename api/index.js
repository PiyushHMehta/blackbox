const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const ImageLink = require('./models/ImageLink')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer');
const imageDownloader = require('image-downloader');
const fs = require('fs');
require('dotenv').config()

const app = express()
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))
mongoose.connect(process.env.MONGO_URL)
const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = process.env.JWT_SECRET


app.get('/test', (req, res) => {
    res.json('test ok')
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    try {
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt)
        const userDoc = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        res.json(userDoc)
    } catch (e) {
        res.status(422).json('Error registering the user.')
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const userDoc = await User.findOne({ email })
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign({ email: userDoc.email, id: userDoc._id, name: userDoc.name }, jwtSecret, {}, (err, token) => {
                if (err) throw err
                res.cookie('token', token).json(userDoc)
            })
        } else {
            res.status(422).json('Incorrect password')
        }
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            const { id } = userData
            const { name, email, _id } = await User.findById(id)
            res.json({ name, email, _id })
        })
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})


const photosMiddleware = multer({ dest: 'uploads/' })
app.post('/upload', photosMiddleware.array('photos', 10), (req, res) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i]
        const parts = originalname.split(".")
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads\\', ''))
    }
    res.json(uploadedFiles)
})

app.post('/tech', async (req, res) => {
    const { title, addedPhotos, docs, installation, additionalLinks } = req.body
    const techDoc = await ImageLink.create({
        title, photos: addedPhotos.flat(), docs, installation, additionalLinks
    })
    res.json(techDoc)
})

app.get('/tech', async (req, res) => {
    try {
        const techDocs = await ImageLink.find();
        res.json(techDocs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/tech/:id', async (req, res) => {
    const { id } = req.params
    res.json(await ImageLink.findById(id))
})

app.get('/account/techstack/:id', async (req, res) => {
    const { id } = req.params
    res.json(await ImageLink.findById(id))
})

app.put('/tech', async (req, res) => {
    const { id, title, addedPhotos, docs, installation, additionalLinks } = req.body
    const techDoc = await ImageLink.findById(id)
    techDoc.set({ title, photos: addedPhotos.flat(), docs, installation, additionalLinks })
    await techDoc.save()
    res.json('Ok')
})

app.get('/fetch-title', async (req, res) => {
    const { url } = req.query;
    try {
        // Fetch the HTML content of the webpage
        const response = await fetch(url);
        const html = await response.text();

        // Extract the title using regular expressions
        const titleRegex = /<title>(.*?)<\/title>/;
        const match = html.match(titleRegex);
        const title = match ? match[1] : 'Title not found';

        // Send the title as a response
        res.json({ title });
    } catch (error) {
        console.error('Error fetching title:', error);
        res.status(500).json({ error: 'An error occurred while fetching the title.' });
    }
})


app.listen(4000)