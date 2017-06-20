import express from 'express'
import { MongoClient } from 'mongodb'
import bodyParser from 'body-parser'

import expressapiRoutes from './routes'
import db from '../config/db'

const app = express()
const port = 8000

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)

    app.use(bodyParser.urlencoded({ extended: true }));
    expressapiRoutes(app, database);

    app.listen(port, () => {
        console.log('We are live on '+ port)
    })
})