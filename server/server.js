const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const serverConfig = require('./serverConfig');
const session = require('express-session');
const port = serverConfig.port;

const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const rateGameRoutes = require('./routes/rateGameRoutes');
const auth = require('./auth/auth');

// Express App Init
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public')); // /public/uploads/...

// Allow Access Controll
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if(req.method === 'OPTIONS'){
		// Tell browsers what methods my api support
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

app.set('trust proxy', 1) // trust first proxy
app.use(session({
	name: 'rahal.cookie.sid',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
		maxAge: 1000 * 60 * 30,
		secure: false 
	}
}))

// DB Config
const mongoURI = serverConfig.mongoURI;
// Connect to mongo
const connection = mongoose.connect(mongoURI, {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));

app.use('/api/hello', (req, res, next) => {
	return res.status(200).json({
		success: true,
		message: 'Hello!. This site is still under dev'
	});
})

app.use(auth.getUserFromSession); // add user to res.locals.user if session.userId exists
app.use('/api/user', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/games/rate', rateGameRoutes);


app.listen(port, () => console.log(`Listening on port ${port}`));