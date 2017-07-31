import express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.dev.js'

// initialize express
let app = express()

// use webpack
app.use(webpackMiddleware(webpack(webpackConfig)))
// handle all routes

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'))
})

// Listen to a port
app.listen(3000, () => console.log('Running on localhost:3000'))
