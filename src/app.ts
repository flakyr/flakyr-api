import express from 'express';
import compression from 'compression';

import 'database';

import routesV1 from 'routes/v1';

const app = express();

app.use(express.json());
app.use(compression());

app.use('/', routesV1);

export default app;
