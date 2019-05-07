const User = require('../models/user');
const Game = require('../models/game');
const async = require('async');
const Consts = require('../consts/consts');

module.exports = {
    // refreshLoginContext(req, res, next) {
    //     if(req.session.userId && res.locals.user && (res.locals.user.id === req.session.userId) ) {
    //         // Found user for this session
    //         console.log('user session active: ' + res.locals.user.name);
    //         return res.status(200).json({
    //             success: true,
    //             message: 'user session active',
    //             payload: {
    //                 name: res.locals.user.name
    //             }
    //         });
    //     }
    //     else {
    //         // user haven't successfully logged in within this session
    //         console.log('No login context');
    //         return res.status(200).json({
    //             success: false,
    //             message: 'No login context'
    //         });
    //     }
    // },

    signupUser(req, res, next) {
        const {body} = req;
        const {name, password, confirmpassword} = body;
        const email = body.email.toLowerCase();
        
        if(!name) {
            return res.status(200).json({
                success: false,
                message: 'Name cant be empty'
            });
        }
        if(!email) {
            return res.status(200).json({
                success: false,
                message: 'Email cant be empty'
            });
        }
        if(password != confirmpassword) {
            return res.status(200).json({
                success: false,
                message: 'Passwords dont match'
            });
        }

        // check email dont exist
        User.find({
            email: email
        }, (err, previousUsers) => {
            if(err) {
                return res.status(200).json({
                    success: false,
                    message: 'Server Error 1'
                });
            } 
            else if(previousUsers.length > 0) {
                return res.status(200).json({
                    success: false,
                    message: 'This email is already exists'
                });
            }

            // save new user
            const newUser = new User();
            newUser.name = name;
            newUser.email = email;
            newUser.password = newUser.generateHash(password);

            if(!newUser.isValidEmailFormat()) {
                return res.status(200).json({
                    success: false,
                    message: 'Email is not valid format'
                });
            }

            newUser.save((err, user) => {
                if(err) {
                    console.log(err);
                    return res.status(200).json({
                        success: false,
                        message: 'Server Error 2'
                    });
                }

                // Signed Up
                req.session.userId= user.id;
                console.log('Signed Up');
                console.log(req.session);
                return res.status(200).json({
                    success: true,
                    message: 'Signed Up',
                    payload: {
                        name: user.name
                    }
                });
            })
        })
    },

    loginUser(req, res, next) {
        const {body}     = req;
        const {password} = body;
        const email      = body.email.toLowerCase();

        if(!email) {
            return res.status(200).json({
                success: false,
                message: 'Email cant be empty'
            });
        }
        if(!password) {
            return res.status(200).json({
                success: false,
                message: 'Password cant be empty'
            });
        }

        // check email exist
        User.findOne({
            email: email
        }, (err, user) => {
            if(err) {
                return res.status(200).json({
                    success: false,
                    message: 'Server Error 3'
                });
            } 
            else if(!user) {
                return res.status(200).json({
                    success: false,
                    message: 'Auth Failed. Account with this email does not exist'
                });
            }
            else if(user) {
                // Compare Password
                if (!user.validPassword(password)) {
                    
                    return res.status(200).json({
                        success: false,
                        message: 'Auth Failed. Invalid Password'
                    });
                }

                /* Logged In */
                // set session. This will also set session cookie
                req.session.userId= user.id;
                console.log('Logged In');
                console.log(req.session);

                // set user-name and logged-in cookies. To be read in Front-end
                res.cookie(Consts.DOTCOM_USER, user.name, { maxAge: Consts.DOTCOM_USER_AGE, httpOnly: false });
                res.cookie(Consts.LOGGED_IN, 'true', { maxAge: Consts.LOGGED_IN_AGE, httpOnly: false });

                return res.status(200).json({
                    success: true,
                    message: 'Logged In',
                    payload: {
                        name: user.name
                    }
                });
            }
        });

    },

    logoutUser(req, res, next) {
        req.session.destroy((err)=>{
            if(err){
                return res.status(200).json({
                    success: false,
                    message: 'Loggout failed'
                }); 
            }

            res.clearCookie(Consts.S_ID);
            res.clearCookie(Consts.DOTCOM_USER);
            res.clearCookie(Consts.LOGGED_IN);

            return res.status(200).json({
                success: true,
                message: 'Loggout!!'
            }); 
        })
    },

    getMygames: async (req, res, next) => {
        const myUserId = res.locals.user.id;

        let myGames;
        try {
            myGames = await Game.find({user: myUserId}, 'title meta slug')
                            .populate('user', 'name')
                            .populate('coverImage', 'path')
                            .exec();
            return res.status(200).json({
                success: true,
                message: 'success',
                payload: {
                    myGames: myGames
                }
            });
        } catch (err) {
            console.log('Get my games failed');
            console.log(err);
            return res.status(200).json({
                success: false,
                message: 'Something went wrong'
            });
        }
    },
};