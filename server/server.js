const express = require('express');
const app = express();

const mysql = require('mysql');
// call bodyParser to handle the Request Object from POST Request
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 4400;
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'crud_db'
});

app.use(cors());
// a middleware called to recognize the incoming request object as JSON Object
app.use(express.json());
//a middleware called to recognize the incoming request object as strings or arrays
app.use(bodyParser.urlencoded({extended: true}));

// CREATE
app.post('/api/insert', (req, res) => {
    console.log(req);
    const work = req.body.work;

    const sqlInsert = "INSERT INTO todo (work) VALUES (?)";
    db.query(sqlInsert, work, (err, result) => {
        if (err) console.log(err);
        else {
            res.send(result);
            console.log(result);
        }
    })
})

// READ
app.get('/api', (req, res) => {
    const sqlSelect = "SELECT * FROM todo";
    db.query(sqlSelect, (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})

// UPDATE
app.put('/api/update/:id', (req, res) => {
    const id = req.params.id;
    const work = req.body.work
    console.log(work);

    const sqlUpdate = "UPDATE todo SET work = ? WHERE id = ?";
    db.query(sqlUpdate, [work, id], (err, result) => {
         if (err) console.log(err)
        else res.send(result);
    })
})

// DELETE
app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const sqlDelete = "DELETE FROM todo WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if (err) console.log(err)
        else res.send(result);
    })

})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
});