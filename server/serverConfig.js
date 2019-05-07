/* Server Config File */
const serverConfig = {
    mongoURI:   process.env.MONGO_URL || 'mongodb://localhost:27017/gamereview-mern',
    port:       process.env.PORT || 5000,
};

module.exports = serverConfig;
