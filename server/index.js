import express from 'express'
import path from 'path'

// initialize express
let app = express()

// handle all routes

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'))
})

// Listen to a port
app.listen(3000, () => console.log('Running on localhost:3000'))
