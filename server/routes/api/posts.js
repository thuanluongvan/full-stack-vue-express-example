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
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

// Delete posts
router.delete('/:id', async (req, res) => {
    const posts = loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
    res.status(200).send();
})


async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://thuanluongvan:123@cluster0.3vdexv7.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('posts');
}

module.exports = router;