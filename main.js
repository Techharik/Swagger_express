import express from 'express';
const app =express();

//** swagger */

import swaggerUi from 'swagger-ui-express';
import fs from "fs"
import YAML from 'yaml'

const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = 4000 || process.env.PORT;




app.get('/api/v1',(req,res)=>{
    res.send('Hello world')
})

app.get('/api/v1/insta',(req,res)=>{
    const instaInfo ={
        name : 'Hari',
        followers: 56,
        follows:42
    }

    res.status(200).json(instaInfo)
})

app.get('/api/v1/:token',(req,res)=>{
      
    const token = req.params.token
    res.status(200).json({params:token})
})


app.listen(PORT,()=>{
    console.log('Listening on port '+ PORT)
})