const express = require('express');
const morgan = require('morgan')
const app = express();

require('dotenv').config()

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

let router = express.Router()

const serviceRoutes = require('./src/routes').services
const gatewayRoutes = require('./src/routes').gateway

router.use('/services', serviceRoutes)
router.use(gatewayRoutes)

// router.use('/', (req, res) => {
//     res.json({
//         "headers": req.headers,
//         "path": req.url,
//         "method": req.method,
//         "body": req.body
//     })
// })

app.use(process.env.API_PREFIX, router)

app.use((req, res) => {
    return res.status(404).json({
        message: 'Resource not found'
    })
})

module.exports = app