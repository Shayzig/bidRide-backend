import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
const server = http.createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json())


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000',
            'http://localhost:3000',
            'http://127.0.0.1:4200',
            'http://localhost:4200'
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}

import { userRoutes } from './api/user/user.routes.js'
import { carRoutes } from './api/car/car.routes.js'

// routes
app.use('/api/user', userRoutes)
app.use('/api/car', carRoutes)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})


import { logger } from './services/logger.service.js'
const port = process.env.PORT || 4200
server.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})