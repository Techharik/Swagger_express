import express from 'express';
const app =express();

//** swagger */

import swaggerUi from 'swagger-ui-express';
import fs from "fs"
import YAML from 'yaml'


const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

import fileUpload from 'express-fileupload';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.use(fileUpload())

import path from 'path';
import { fileURLToPath } from 'url';
let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

const PORT = 4000 || process.env.PORT;

const courses= [
    {
        id:'55',
        title: 'Learn React',
        price: 699
    },
    {
        id:'52',
        title: 'Learn Node',
        price: 699
    },
    {
        id:'1',
        title: 'Learn JavaScript',
        price: 69
    }
]



app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.get('/api/v1/lco',(req,res)=>{
    res.send('Hello from docs')
})

app.get('/api/v1/lcoobj',(req,res)=>{
    res.send({
        id:'55',
        title: 'Learn React',
        price: 699
    })
})

app.get('/api/v1/courses',(req,res)=>{
    res.send(courses)
})

//params parsing

app.get('/api/v1/mycourses/:courseId',(req,res)=>{
    const myCourse = courses.find(course =>{
        return course.id == req.params.courseId
    })

    res.send(myCourse)
})

// body parsing

app.post('/api/v1/addCourses',(req,res)=>{
    console.log(req.body)
    courses.push(req.body)
    res.send(true)
})

//query parsing

app.get('/api/v1/courseQuery',(req,res)=>{
    const location = req.query.location
    
    res.send({location})
})

//handling Images
app.post('/api/v1/addImages',(req,res)=>{
    console.log(req.headers)
     let file = req.files.file
     console.log(file)
     let path = __dirname + '/Images/' + file.name

     file.mv(path,(err)=>{
        res.send(true)
     })
})



app.listen(PORT,()=>{
    console.log('Listening on port '+ PORT)
})