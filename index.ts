import express from 'express';
import { disableXPoweredBy, corsAllowAll } from './middleware/express';
import cors from 'cors';
// Import router
import api from './api';
import { debugServer } from './debug';

const app = express();

// const whitelist = ['http://localhost:3000'];

const corsOption: cors.CorsOptions = {
    preflightContinue: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('*', cors(corsOption));
// disableXPoweredBy(app);

app.use('/api', api);

const port: number = Number(process.env.PORT) || 3000;
app.listen(port, () => {
    debugServer(`App run on port: ${port}`);
});
