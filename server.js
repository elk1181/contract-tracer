var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv');
dotenv.config();
    var app = express();
var username;
var password;
app.set('view engine', 'ejs');
 app.use(express.static('src'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    const port = process.env.PORT || 3000;;
    app.get('/', function (req, res) {
      res.render('index');
    });


    if(port==3000){
      username=process.env.USER_NAME;
      password=process.env.PASSWORD;
    }
    if(port==process.env.PORT){
      username=process.env.USER_NAME;
      password=process.env.PASSWORD;
    }
    app.post('/send', function (req, res) {
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: username,
              pass: password
          }
      });
      let mailOptions = {
          from: '"Emory United Contact Tracers" <emoryunitedcontacttracers@gmail.com>',
          to: req.body.to,
          subject: "COVID: Possible Exposure from Emory University",
          html: '<b>Hello you have been in contact with someone with COVID-19 as pointed out by a member of the Emory University community. Please quarantine yourself and get a COVID-19 test as soon as possible </b>'
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);

              res.render('index');
          });
      });
          app.listen(port, function(){
            console.log('Server is running at port: ',port);

          });
