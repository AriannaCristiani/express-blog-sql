const posts = require('../data/posts.js')
const connection = require('../data/db.js')

let lastIndex = posts.at(-1).id


function index(req, res) {
    console.log('questi sono i post')

    const sql = `SELECT * FROM posts`

    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database query failed' })
        } else {
            res.json(results)
        }
    })
}


function show(req, res) {
    const id = parseInt(req.params.id)
    //res.send(`questo è il post con id: ${id}`)
    const post = posts.find((post) => post.id === id)
    console.log(post)

    res.json(post)
}


function store(req, res) {
    console.log('Body della richiesta:', req.body);

    const errors = validation(req);

    if (errors.length) {
        console.log('Errori di validazione:', errors);
        res.status(400).json({
            error: 'Invalid request',
            messages: errors,
        });
        return;
    }

    const { title, content, image = '', category, tags, published = true } = req.body;

    console.log('Dati ricevuti:', { title, content, image, category, tags, published });

    lastIndex++;

    const newPost = {
        id: lastIndex,
        title: title,
        content: content,
        image: image,
        category: category,
        tags: tags,
        published: published,
    };

    console.log('Nuovo post creato:', newPost);

    posts.push(newPost);
    res.status(201).send(newPost);
}

function update(req, res) {
    const id = parseInt(req.params.id)
    //res.send(`stai aggiornando il post con id: ${id}`)

    const errors = validation(req)

    if (errors.length) {

        res.status(400)

        return res.json({
            error: 'Invalid request',
            messages: errors,
        })
    }

    const post = posts.find((post) => post.id === id)
    console.log(post)


    const { title, slug, content, image, tags } = req.body
    console.log(req.body)

    post.title = title;
    post.slug = slug;
    post.content = content;
    post.image = image;
    post.tags = tags

    res.json(post)
}


function modify(req, res) {
    const id = parseInt(req.params.id)
    //res.send(`stai modificando il post con id: ${id}`)

    const post = posts.find((post) => post.id === id)
    console.log(post)

    const { title, slug, content, image, tags } = req.body
    console.log(req.body)


    if (title) post.title = title;
    if (slug) post.slug = slug;
    if (content) post.content = content;
    if (image) post.image = image;
    if (tags) post.tags = tags

    res.json(post)
}


function destroy(req, res) {
    const id = parseInt(req.params.id)
    //res.send(`stai eliminando il post con id: ${id}`)

    const postIndex = posts.findIndex((post) => post.id === id)

    posts.splice(postIndex, 1)

    res.sendStatus(204)
}


// validazione dei dati
function validation(req) {
    const { title, image = '', content, category, tags, published = true } = req.body


    const errors = []

    if (!title) {
        errors.push('title is required')
    }
    if (!content) {
        errors.push('content is required')
    }
    if (!category) {
        errors.push('category is required')
    }
    if (!tags) {
        errors.push('tags are required')
    }

    return errors
}




module.exports = { index, show, store, update, modify, destroy }