const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nina8097',
    database: 'blog_db',
})

connection.connect((err) => {
    if (err) throw err
    console.log(`Connessione riuscita`)
})

module.exports = connection