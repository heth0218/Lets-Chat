const express = require('express')
const db = require('./config/db')
const cors = require('cors');

db();

const app = express();

app.use(express.json({ extended: false, limit: '10mb' }));
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api/user', require('./routes/user'));
app.use('/api/chat', require('./routes/chat'))

app.get('/', () => {
    res.send({
        msg: "hello"
    })
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})