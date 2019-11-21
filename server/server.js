const express       = require('express')
const app           = express()
const bodyParser    = require('body-parser')

const port          = 3000


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) 
// parse application/json
app.use(bodyParser.json())


app.get('/user', (req, res) => {
    console.log('estamos bien')
    res.json('todo OK')
})

app.post('/user', (req, res) => {
    res.json(req.body)
})

app.get('/upload/:user_id', (req, res) => {
    console.log(req.body)
    res.json(`Aqui se va a mostrar la lista los uploads del usuario en curso ${user_id}`)
})

/**
 * Datos necesarios a recibir
 * @param { user_id:number, title:string, files:file, receivers:string, message:string}
 * @return { message:string, link:string, status:number }
 */
app.post('/upload', (req, res) => {
    res.json(req.body)
})


app.listen( port, () =>{
    console.log('conexion de servidor establecida')
} )