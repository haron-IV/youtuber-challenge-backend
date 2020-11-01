require('dotenv').config()
import express from 'express'
// import session from 'express-session'
import { json } from 'body-parser'
import { connectDatabase } from './application/database'
import { server } from './application/server'
import { registerAppRoutes } from './application/register-routes'

const app = express()
app.use(json())
// app.use(session({ secret: 'randomstringsessionsecret' }))
registerAppRoutes(app)
connectDatabase();

server(app);