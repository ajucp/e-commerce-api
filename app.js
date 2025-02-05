const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const productRoutes=require('./routes/productRoutes');
const userRoutes=require('./routes/userRoutes');
const orderRoutes=require('./routes/orderRoutes');
const dotenv=require('dotenv');
const swagerUi=require('swagger-ui-express');
const swaggerDocument=require('./swagger.json');



const app=express();
dotenv.config();

//middleWare
app.use(bodyParser.json());
app.use(cors());

app.use('/products',productRoutes);
app.use('/users',userRoutes);
app.use('/orders',orderRoutes);

app.use('/api-docs',swagerUi.serve,swagerUi.setup(swaggerDocument));

app.listen(3000);

