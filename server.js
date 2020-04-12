'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');         //use MySQL
const nodemailer = require('nodemailer'); 

const DBConfig = require('./serverSide/login.js');   //launch further config infomation

let index = fs.readFileSync(path.resolve('./dist/index.html'));
let OPTIONS = require("./serverSide/config.js");

let {protocol, host, port} = OPTIONS;

/**
 * @param {String} email
 * @param {String} subject
 * @param {String} text 
 * @param {String} html  
 */
async function emailer(email, subject, text, html) {   

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
        from: 'lonicera <2192811348@qq.com>',
        to: `<${email}>`,
        subject,
        text,
        html,
    });
}


let srv = http.createServer((req, res) => {
    let _url = new URL(req.url, `${protocol}://${host}:${port}`);
    let file = '';
    let connection = mysql.createConnection(DBConfig);

    if (_url.pathname === '/') {                                //首页信息
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.end(index);
    } else if (_url.pathname.match(/aboutInfo/gi)) {             //关于页面信息
        //let connection = mysql.createConnection(DBConfig);
        connection.connect(err => {if (err) throw err});
        connection.query('select * from about', (err, results) => {
            if (err) throw err;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
            connection.end();
        });        
    } else if (_url.pathname.match(/postinfo/g)) {              //首页博文信息
        let initindex = parseInt(_url.pathname.split(/\//g)[2]);
        connection.connect(err => {if (err) throw err});
        connection.query(`select * from post where id<=? order by id desc limit 5`, [initindex], (err, results) => {
            if (err) throw err;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
            connection.end();
        });
    } else if (_url.pathname.match(/postid\//gi)) {                 //博文信息
        const id = parseInt(_url.pathname.split('\/')[ 2 ]);
        connection.connect((err) => {     //if not found, return 404
            if (err) void 0;
        });
        connection.query(`select * from post where id=${id}` ,(err, results, fields) => {
            if (err) void 0;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
            connection.end();
        });        
    } else if (_url.pathname.match(/images/gi)) {       //匹配图片路径
        let filename = _url.pathname.slice(7);
        try{
            file = fs.readFileSync(path.resolve(`./images/${filename}`));
            res.statusCode = 200;
            res.setHeader('Content-Type', 'image/jpg');
            res.setHeader('Cache-Control', 'max-age=3600')
            res.end(file);
        } catch(e) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(index);
        }
    }
    else if (_url.pathname.match(/user-assets/gi)) {
        try{
            let file = fs.readFileSync(path.resolve(`.${_url.pathname}`));
            res.statusCode = 200;
            let _file_type = _url.pathname.slice(_url.pathname.lastIndexOf('.'));
            switch (_file_type) {
                case '.svg':res.setHeader('Content-Type', 'image/svg+xml');break;
                default: break;
            }
            res.end(file);
        } catch(e) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(index);
        }
    } else if (_url.pathname.match(/archiveinfo/gi)) {
        //let connection = mysql.createConnection(DBConfig);
        connection.query('select id,title,posttime from post', (e, results) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
        });
    } else if (_url.pathname.match(/noteinfo/gi)) {
        //let connection = mysql.createConnection(DBConfig);
        connection.query('select title,content,posttime from note', (e, results) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
        })
    } else if (_url.pathname.match(/commentpost/gi)) {
        let inf = '';
        req.on('data', body => {
            inf += body;
            let {nickname, email, website, content, replyee} = JSON.parse(inf);
            let address = req.socket.remoteAddress;
            let date = new Date();
            let time = JSON.stringify({
                year: date.getFullYear(),
                month: date.getUTCMonth() + 1,
                day: date.getDate()
            });
            connection.query(`insert into comment(nickname, email, website, content, address, time, replyee)values(?, ?, ?, ?, ?, ?, ?)`, [nickname, email, website, content, address, time, replyee], (e) => {
                if (e) {
                    res.statusCode = 500;
                    res.end('wrong')
                } else {
                    if (replyee !== '') {
                        let parsedReplyee = JSON.parse(replyee);
                        emailer(parsedReplyee.email, '您在本站的留言有了新回复', '超链接:', '<p>http://192.168.2.104:8080</p>');
                    }
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('success');
                }
            })
        })
    } else if (_url.pathname.match(/commentinfo/gi)) {
        connection.query('select nickname, email, website, content, time from comment', (e, results) => {
            if (e) {
                res.statusCode = 404;
                res.writeHead('Content-Type', 'text/plain');
                res.end('404 not found');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(results));
            }
        });
    } else if (_url.pathname.match(/friendinfo/gi)) {
        connection.query('select * from friends', (e, results) => {
            if (e) {
                res.statusCode = 404;
                res.writeHead('Content-Type', 'text/plain');
                res.end('404 not found');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(results));
            }
        })
    } else {
        try{
            file = fs.readFileSync(path.resolve(`./dist/${_url.pathname}`));
            res.statusCode = 200;
            let _file_type = _url.pathname.slice(_url.pathname.lastIndexOf('.'));
            switch (_file_type) {
                case '.js': res.setHeader('Content-Type', 'text/script');break;
                case '.css':res.setHeader('Content-Type', 'text/css'); break;
                case '.ico':res.setHeader('Content-type', 'image/jpg');break;
                case '.jpg':res.setHeader('Content-Type', 'image/jpg'); break;
                case '.jpeg':res.setHeader('Content-Type', 'image/jpg');break;
                case '.png':res.setHeader('Content-Type', 'image/png'); break;
                case '.svg':res.setHeader('Content-Type', 'image/svg+xml');break; 
                default: break;
            }
            res.setHeader('Cache-Control', 'max-age=86400');
            res.end(file);
        } catch(e) {
            res.statusCode = 200;
            res.setHeader('Content-type', 'text/html');
            res.end(index);
        }  
    }
}).listen(OPTIONS, _ => {
    console.log('The server has been launched');
});
    