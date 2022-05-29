const express = require('express');
const res = require('express/lib/response');
const mongodb = require('mongodb');

const router = express.Router();

// Get posts
router.get('/', async (req, res) => {
    // res.send('hello');
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add posts
router.post('/', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

// Delete posts


async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://thuanluongvan:D09k3RHY5ZHEXSlj@cluster0.3vdexv7.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('posts');
}

module.exports = router;