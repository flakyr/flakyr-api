export const port = process.env.PORT || 8000;

export const db = {
    hostname: process.env.DB_HOSTNAME || 'localhost',
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
