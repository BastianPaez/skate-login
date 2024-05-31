import express from 'express';
import 'dotenv/config';
import userRouter from './routes/user.route.js'
import fileUpload from 'express-fileupload';
const app = express();

const __dirname = import.meta.dirname;

app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(express.static('public'))
app.use(fileUpload({
  limits: {
      fileSize: 1024 * 1024 * 5
  },
  abortOnLimit: true,
  responseOnLimit: "El archivo no puede exceder los 5MB"
}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html')
})

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html')
})

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/registro.html')
})

app.get('/datos', (req, res) => {
  res.sendFile(__dirname + '/public/datos.html')
})

app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/public/admin.html')
})


app.use('/api/v1/user', userRouter);


app.use('*', (req, res) =>{
  res.status(404).json( {ok:false , msg: 'Ruta no existente'})
}) 




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
