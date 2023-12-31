const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date || Date.now();

  const inputDate = new Date(dateParam);

  if (isNaN(inputDate.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: inputDate.getTime(),
      utc: inputDate.toUTCString(),
    });
  }
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
