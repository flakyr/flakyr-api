import mongoose from 'mongoose';

import { db } from 'config';

const dbURI = `mongodb://${db.host}:${db.port}/${db.name}`;

mongoose
    .connect(dbURI, db.options)
    .then(() => {
        console.info('Mongoose connection done');
    })
    .catch((e) => {
        console.error('Mongoose connection error');
        console.error(e);
    });

mongoose.connection.on('connected', () => {
    console.info(`Mongoose default connection open to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.info('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
