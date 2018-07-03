
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

//Connect to postgres



// END



var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine', 'ejs');

app.use('/css', express.static('css'));


app.get('/index', function(req, res){
    res.sendFile(__dirname +'/index.html');
});

app.post('/survey', urlencodedParser, function(req, res){
   console.log(req.body);
   res.sendFile(__dirname +'/index.html', {qs: req.query});
});



app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM response_table');
    res.render('pages/db', {result: result.rows});
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});



//IF there is a POST request
    //Pull data from the form
    //write field values to appropriate backend objs
    //Connect to postgress database
    //write entry to database using object values
    //close connection to db
    //fetch the matching entry from the database
    //write it to a confirmation screen



    app.listen(process.env.PORT || 3000, function(){
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
      });

console.log('Dialed in and now listening on port 3000');


