import express from 'express'
import 'dotenv/config'
import router from './routes/product.routes.js'
const app = express()



const port = (process.env.PORT) || 5000

app.use(router);

app.listen(port,()=>{
    console.log('server is online');
    console.log(`server is running on ${port}`);
    
    
});