const express = require("express");
var JSSoup = require('jssoup').default;

const PORT = 3000;

const app = express();
var bodyParser = require('body-parser');  
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/api", (req, res) => {
    res.json({ message: "Hello from Express!" });
  });

  app.post("/edu", (req, res) => {
    console.log(req.body + "=---req-------" + req.body);

    res.json({ message: "Hello from content!" });
  });

  var soup = new JSSoup('<html><head>hello</head></html>');
var tag = soup.nextElement;
var mjmlBasicTagStart = "<mj-section><mj-column>";
var mjmlBasicTagEnd = "</mj-column></mj-section>"

var newTag = mjmlBasicTagStart + tag + mjmlBasicTagEnd;
tag.replaceWith(newTag)
console.log(newTag);
  
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });