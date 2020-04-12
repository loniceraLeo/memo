'use strict'

const nodemailer = require('nodemailer');

async function emailer() {   

    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        port: 587,
        secure: false,
        auth: {
            user: '2192811348@qq.com',
            pass: 'npdfpxddyaapeaea'
        }
    });

    await transporter.sendMail({
        from: 'The breaker <2192811348@qq.com>',
        to: '<827854589@qq.com>',
        subject: 'are you ok?',
        text: 'hello leo',
        html: "<b>Believe that you are the center</b>"
    });
}

emailer();