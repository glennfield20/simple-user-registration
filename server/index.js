import express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config.dev.js'
import webpackHotMiddleware from 'webpack-hot-middleware'

// initialize express
let app = express()

// use webpack
const compiler = webpack(webpackConfig)

app.use(webpackMiddleware(compiler, {
	hot: true,
	publicPath: webpackConfig.output.publicPath,
	noInfo: true
}))

app.use(webpackHotMiddleware(compiler))
// handle all routes

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'))
})

// Listen to a port
app.listen(3000, () => console.log('Running on localhost:3000'))
