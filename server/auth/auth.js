const User = require('../models/user');
const Consts = require('../consts/consts');

module.exports = {
    authenticated(req, res, next) {
        console.log('--Do Authenticate--');
        console.log(req.session.userId);
        if(!req.session.userId) {
            // this means the session object is still uninitialized
            // we didnt put any data to the session or user logged out and session was destroyed
            // or the session timed out

            /* Not-Authenticated */
            console.log('Not-Authenticated');
            res.clearCookie(Consts.S_ID);
            res.clearCookie(Consts.DOTCOM_USER);
            res.clearCookie(Consts.LOGGED_IN);

            return res.status(401).json({
                success: false,
                message: 'Please log in again'
            });
        }
        else {
            next();
        }
    },

    getUserFromSession(req, res, next) {
        const { userId } = req.session;
        if(userId) {
            var user = User.findById(userId, (err, user) => {
                if(err) {
                    return res.status(401).json({
                        success: false,
                        message: 'Something went wrong!'
                    });
                }
                console.log('User Added to res.locals.user: ' + user.name);
                // Found user for this session
                res.locals.user = user;

                const DOTCOM_USER_Cookie = req.cookies[Consts.DOTCOM_USER];
                const LOGGED_IN_Cookie = req.cookies[Consts.LOGGED_IN];

                // if FrontEnd cookies values are different
                // Maybe user tried to change them manually
                if(DOTCOM_USER_Cookie && (DOTCOM_USER_Cookie != user.name)) {
                    console.log('DOTCOM Cookie name is different: Rest cookie');
                    res.cookie(Consts.DOTCOM_USER, user.name, { maxAge: Consts.DOTCOM_USER_AGE, httpOnly: false });
                }

                if(LOGGED_IN_Cookie && (LOGGED_IN_Cookie != 'true')) {
                    console.log('LOGGED_IN Cookie is different: Rest cookie');
                    res.cookie(Consts.LOGGED_IN, 'true', { maxAge: Consts.LOGGED_IN_AGE, httpOnly: false });
                }

                // if FrontEnd cookies does not exist set them
                // Maybe user manually deleted them or they got expired
                if(!DOTCOM_USER_Cookie) {
                    console.log('NO DOTCOM Cookie: Rest cookie');
                    res.cookie(Consts.DOTCOM_USER, user.name, { maxAge: Consts.DOTCOM_USER_AGE, httpOnly: false });
                }
                if(!LOGGED_IN_Cookie) {
                    console.log('NO LOGGED_IN Cookie: Rest cookie');
                    res.cookie(Consts.LOGGED_IN, 'true', { maxAge: Consts.LOGGED_IN_AGE, httpOnly: false });
                }

                console.log('***** my cookie ******');
                console.log(req.cookies);
                console.log(DOTCOM_USER_Cookie);
                console.log(LOGGED_IN_Cookie);
                console.log('***');

                // if cookie names are different set to correct ones
                next();
            })
        }
        else {
            console.log('No Session Id to get a user from');
            next();
        }
    }
};