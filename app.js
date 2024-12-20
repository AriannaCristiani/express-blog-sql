const express = require('express')
const cors = require('cors')
const postsRouter = require('./routers/posts.js');
const findError = require('./middleware/find-error.js');
const pageNotFound = require('./middleware/page-not-found.js');
const app = express()
const port = 3000

//applicazione cors
app.use(cors());

//visualizzazione immagini
app.use(express.static('public'));

//body parser
app.use(express.json());

//rotta principale
app.get('/', (req, res) => {
    //res.send('hello')
    throw new Error('Errore di prova') //test errore con middleware
});

//registrazione del router
app.use('/posts', postsRouter);

//middleware: errore 500(error back-end)
app.use(findError);

//middleware: errore 404(page non found)
app.use(pageNotFound);

//verifica sulla porta
app.listen(port, () => {
    console.log(`il server è in ascolto sulla porta: ${port}`)
});
