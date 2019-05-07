/**
 * Entry Script
 */
if (process.env.NODE_ENV === 'production') {
    require('./server/server');
    // require('./dist/server.bundle.js');
} else {
    require('./server/server');
}