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

    // API endpoints for uxFramework demo
    app.get('/todo', (req, res) => {
        db.collection('todoList', (err, collection) => {
            collection.find().toArray((err, items) => {
                res.send(items)
            });
        });
    })

    app.get('/table-data', (req, res) => {
        db.collection('employeeData', (err, collection) => {
            collection.find().toArray((err, items) => {
                res.send(items)
            })
        })
    })

    app.post('/employee-data', (req, res) => {
        const details = {
            grno: parseInt(req.body.grno)
        }
        db.collection('employeeData', (err, collection) => {
            collection.find({ grno: { $lte: details.grno } }).toArray((err, items) => {
                setTimeout(() => {
                    res.status(200).send({
                        employeeData: items,
                        total: items.length
                    })
                }, 3000)
            })
        })
    })

    app.post('/employee-data-autocomplete', (req, res) => {
        const details = {
            grno: parseInt(req.body.grno)
        }
        db.collection('employeeData', (err, collection) => {
            collection.find({ grno: { $lte: details.grno } }).toArray((err, items) => {
                let returnData = items.map(item => {
                    return {
                        email: item.emailAddress,
                        region: item.region,
                        userId: item.userId,
                        title: 'Employee name',
                        searchCategory: 2
                    }
                })
                setTimeout(() => {
                    res.status(200).send(returnData)
                }, 1400)
            })
        })
    })
};