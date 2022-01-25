const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts-routes');
const userRoutes = require('./routes/user-routes');
const MONGODB_URI = 'mongodb://localhost:27017/learn-learn';
const PORT = process.env.port || 5000;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/posts', postsRoutes);

mongoose
    .connect(MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`app starting port ${PORT}`);
        });
        console.log('CONNECT DB SUCCESSFULLY');
    })
    .catch((err) => console.log(err));
