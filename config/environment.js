const fs = require('fs')
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval :'1d',
    path:logDirectory
})
const development={
    name: 'development', 
    asset_path:'./assets',
    session_cookie_key: 'blahsomething',
    db:'codeial_devp',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: 'false',
        auth: {
            user: 'xpert15102000@gmail.com',
            pass: 'Ganesh@123'
        }
    },
    google_clientID:"648699672732-gmbsbg64slcfrt0k9n2137s5kni066b9.apps.googleusercontent.com",
    google_clientSecret :"ti0KT6HIdWabvm3y1PMC-sx6",
    google_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_key:'codeial',
    morgan:{
        mode: 'dev',
        options:{
            stream:accessLogStream
        }
    }



}
const production={
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIALSESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: 'false',
        auth: {
            user:process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_clientID:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_clientSecret :process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callbackURL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_key:process.env.CODEIAL_JWT_KEY,
    morgan:{
        mode: 'combined',
        options:{
            stream:accessLogStream
        }
    }


}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT)== undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT)