const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log('New Comment')
    nodeMailer.transporter.sendMail({
        from: 'xpert15102000@gmail.com',
        to: comment.user.email,
        subject: "New comment",
        html: '<h1> Your comment is added</h1>'

    }, (err,info)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log('Message sent', info);
        return;

    })

}