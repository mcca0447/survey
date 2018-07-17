

var obj = {};  //Instantiates empty object

//Stores queries as variables
var qsum_total_sales = 'SELECT SUM (total_price) AS s_total_price FROM myrecords';
var qsum_count_active = 'SELECT COUNT (*) AS s_count_active FROM myrecords WHERE NOT status = "canceled" ';
var qdata = 'SELECT * FROM myrecords';


//Loads the page /data and runs a function that calls the select all query and stores those results inside 
//and object which then stores the  results of the query in the object property "print"
router.get('/data', function(req, res) {
  connection.query(qdata, function(err, result) {
    if (err) {
      throw err;
    } else {
      obj = {
        print: result
      };

      
      console.log(obj);
      connection.query(qsum_total_sales, function(err, rows, result1) {
        if (err) {
          throw err;
        } else {
          rsum_total_sales = JSON.parse(rows[0].s_total_price).toFixed(2);
          console.log(rsum_total_sales);


          connection.query(qsum_count_active, function(err, rows2, result2) {
            if (err) {
              throw err;
            } else {
              rsum_count_active = JSON.parse(rows2[0].s_count_active);
              console.log(rsum_count_active);

              //After successful completion of all 3 queries send data back to cliend(front-end)
              //its better to create new obj everytime and send it
              //store all the data in obj and send back to client
              var obj = {};
              obj.print = result;
              obj.rsum_count_active = rsum_count_active;
              obj.rsum_total_sales = rsum_total_sales;
              res.render('data', obj);
            }
          });