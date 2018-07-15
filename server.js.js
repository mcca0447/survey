
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

app. use(urlencodedParser) ;


app.post('/index', async function(req, res){
  var id =  req.body.empId
  var name = req.body.name
  var email = req.body.email
  var reason = req.body.petReason
  var feedGoal = req.body.feedingFocus
  var budget =  req.body.budget
  var avoiding = req.body.avoid
  var comments = req.body.comments
  
   res.sendFile(__dirname +'/index.html', {qs: req.query});

   try {
    const client = await  pool.connect()
    var queryStatement = "INSERT INTO response_table (employee_id, name, email, reason_for_owning, feeding_goal, budget, avoiding, comments) VALUES('"+req.body.empId+"', '"+req.body.name+"', '"+req.body.email+"', '"+req.body.petReason+"', '"+req.body.feedingFocus+"','"+req.body.budget+"','"+req.body.avoid+"', '"+req.body.comments+"' )";
    const result =  await client.query(queryStatement);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }


});



app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM response_table');
    res.render('pages/db', {result: result.rows});
    console.log(result);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});



app.get('/stats', async (req, res) =>{
  try {
    const client = await pool.connect()
    
    
    const budgetAvg = await client.query('SELECT to_char (AVG (budget)) AS average_budget FROM response_table;');
    const topThreeIngr = await client.query('');
    const topReason = await client.query('');
    const commentsList = await client.query('');

    
    const 
    res.render('pages/stats', {budgetAvg: budgetAvg});
    console.log(result);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }




});



    app.listen(process.env.PORT || 3000, function(){
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
      });

console.log('Dialed in and now listening on port 3000');


