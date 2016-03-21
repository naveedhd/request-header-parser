var express = require('express'),
    app = express();

var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/whoami', function (req, res) {
  var language = req.headers["accept-language"].split(',')[0];
  var ip = req.headers['x-forwarded-for'] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          req.connection.socket.remoteAddress;
  var user = req.headers["user-agent"];
  var software = user.substring(user.indexOf('(')+1, user.indexOf(')'));

  var whoamiObj = {
    "ipaddress": ip,
    "language": language,
    "software": software
  }
  res.send(whoamiObj);
});

app.listen(port, function() {
  console.log('Listening on '+ port + '!');
});
