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




app.get('/',(req,res)=>{
    res.send('Hello world')
})


app.listen(PORT,()=>{
    console.log('Listening on port '+ PORT)
})