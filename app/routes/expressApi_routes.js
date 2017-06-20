import { ObjectID } from 'mongodb'

module.exports = (app, db) => {
    app.get('/test/:id', (req, res) => {
        const details = { '_id': new ObjectID(req.params.id) }
        db.collection('test').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured' })
            } else {
                res.send(item)
            }
        })
    })

    app.put('/test/:id', (req, res) => {
        const details = { '_id': new ObjectID(req.params.id) }
        const note = {
            title: req.body.title,
            name: req.body.name
        }
        db.collection('test').update(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(note);
            }
        })
    })

    app.delete('/test/:id', (req, res) => {
        const details = { '_id': new ObjectID(req.params.id) }
        db.collection('test').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured' })
            } else {
                res.send('Note: ' + details._id + ' is deleted.')
            }
        })
    })

    app.post('/test', (req, res) => {
        const details = {
            title: req.body.title,
            name: req.body.name
        }
        db.collection('test').insert(details, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' })
            } else {
                res.send(result.ops[0])
            }
        })
    })
};