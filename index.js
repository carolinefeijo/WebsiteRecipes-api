const express = require('express')
const app = express()
const port = process.env.PORT || 3000
var cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./src/controllers/RecipeController')(app);


app.listen(port, () => {
    console.log(`Servidor rodando no endereço http://localhost:${port}`)
})