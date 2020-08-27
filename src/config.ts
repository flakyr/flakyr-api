export const port = process.env.PORT || 8000;

export const db = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'flakyr',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
    },
};
