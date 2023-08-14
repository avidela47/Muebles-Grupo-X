 import express, { Application } from 'express';
 import cors from 'cors';
 import routesProduct from '../routes/productRoutes';
 import routesUser from '../routes/userRoutes';
 import { Product } from './product';
 import { User } from './user';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);        
        })
    }

    routes() {
        this.app.use('/products', routesProduct);
        this.app.use('/users', routesUser);
    }

    midlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await Product.sync()
            await User.sync();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;