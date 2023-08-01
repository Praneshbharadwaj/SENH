const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
const { request } = require('http');
const dbService = require('./dbservice')
dotenv.config();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/insert', (request, response) => {
    // console.log(request.body)
    const { name } = request.body
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewName(name);
    result.then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});


app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    // console.log(result)
    result.then(data => response.json({ data: data }))
        .catch(err => console.log(err));

})
app.patch('/update', (request, response) => {
    const { id, name } = request.body;
    console.log({ id, name })
    const db = dbService.getDbServiceInstance();
    const result = db.updateNameById(id, name)
    result.then(data => response.json({ succes: data }))
        .catch(err => console.log(err))


})

app.delete('/delete/:id', (request, response) => {
    const { id } = request.params
    const db = dbService.getDbServiceInstance();
    const result = db.deleteRowById(id);
    // console.log(result)
    result.then(data => response.json({ succes: data }))
        .catch(err => console.log(err));


})
app.get('/search/:name', (request, response) => {
    const { name } = request.params
    const db = dbService.getDbServiceInstance();
    console.log(name)

    const result = db.searchByName(name);
    // console.log(result)
    result.then(data => response.json({ data: data }))
        .catch(err => console.log(err));


})

app.listen(3000, () => console.log('app is running'))