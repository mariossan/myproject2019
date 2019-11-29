const express       = require('express')
const cors          = require("cors")
const app           = express()
const bodyParser    = require('body-parser')
var nodemailer      = require('nodemailer');
const port          = 8000

const { Book, User, Category, Author } = require('./schemas')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) 
// parse application/json
app.use(bodyParser.json())

app.use(cors())



app.get('/user', (req, res) => {
    console.log('estamos bien')
    res.json('todo OK')
})

app.get('/user/:id', (req, res) => {
    console.log('estamos bien con id')
    res.json('todo OK')
})

app.post('/user', (req, res) => {
    res.json(req.body)
})

app.get('/upload/:user_id', (req, res) => {
    console.log(req.body)
    res.json(`Aqui se va a mostrar la lista los uploads del usuario en curso ${user_id}`)
})


app.post("/login", async (req, res) => {
    /* busqueda para no encontrar coincidencias */

    console.log(req.body)
    const user = await User.findOne( {email:req.body.user, password: req.body.pass } );

    if ( user !== null ) {
        res.status(200).json({status: 'success', msg: 'Usuario correcto' })
    } else {
        res.status(400).json({status: 'error', msg: 'El usuario ya existe previamente, intente hacer login'})
    }

    //console.log(user)
})


app.post("/register", async (req, res) => {
    /* busqueda para no encontrar coincidencias */
    const user = await User.findOne( {email:req.body.user} );

    if ( user === null ) {
        /* se hace el insert de la data */
        let userToInsert = new User({
            email: req.body.user,
            password: req.body.pass
        });

        let response = await userToInsert.save();

        /* ahora se hace lo del envio de mail */

        let testAccount = await nodemailer.createTestAccount();
  
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
        host: "smtp.mandrillapp.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "eduardo.reveles@ontwice.com.mx", // generated ethereal user
            pass: "fcNIlMxdNOfKtB8vf2b1vw" // generated ethereal password
        }
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
        from: '"test no-replay@noreplaymail.com"', // sender address
        to: req.body.user, // list of receivers
        subject: "Bienvenido a Totrasnferme", // Subject line
        text: "Hola mundo", // plain text body
        html: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>Document</title>
                    </head>
                    <body style="background: #fafafa;">
                        <table align="center" style="background: #165a9e; border:0px; width: 100%; max-width: 800px; color: #ffffff; text-align: center; text-shadow: 1px 1px 3px #4476ff;" border="0" cellspacing=”0” cellpadding=”0”>
                            <tr style="background: #021442;">
                                <td align="center">
                                    <h2 style="color: #ffffff; text-shadow: 1px 1px 3px #000a24;">Bienvenido a To Transfer Me</h2>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: left; padding: 20px;">
                                    Felicidades, ya eres parte de la comunidad <a href="https://totransfer.me" style="text-decoration: none; color: #99c7f3; text-shadow: 1px 1px 4px #fff">https://totransfer.me</a>, ahora podrás: 
                                    <ul>
                                        <li>Envíos de archivos de gran tamaño con un maximo de 5 Gb</li>
                                        <li>Caducidad de tu link de desacarga de 15 días</li>
                                        <li>Poder solicitar extensión de tiempo para tu link, con un máximo de 15 días adicionales</li>
                                    </ul>   
                    
                                    <div align='center'>
                                        <br><br>
                                        Click en la imagen para empezar
                                        <br><br>
                                        <a href="https://totransfer.me/upload"><img src="https://cdn0.iconfinder.com/data/icons/iVista2/256/Upload.png" alt="Empezar" style="width: 100px;"></a>
                                        <br><br>
                                        O click <a href="https://totrasnfer.me/upload" style='color: #99c7f3'>aquí</a>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </body>
                    </html>` // html body
        });

        res.status(200).json({status: 'success', msg: 'Usuario registrado con exito' })
    } else {
        res.status(400).json({status: 'error', msg: 'El usuario ya existe previamente, intente hacer login'})
    }
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
    console.log(`conexion de servidor establecida ${ port }`)
} )