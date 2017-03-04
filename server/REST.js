var mysql = require("mysql");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    })
    router.post("/users",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        console.log("username "+req.body.username+" pwd "+req.body.pwd);
        var table = ["users","username","pwd",req.body.username,md5(req.body.pwd)];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,results){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                console.log("Error executing query");
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
                console.log("User Added");
            }
        });

    });
    router.get("/users",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["users"];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,results,fields){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : results});
            }
        });
    });

    router.get("/users/:user_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["users","id",req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    router.post('/authenticate', function(req, res) {
        var query = "SELECT ??, ?? FROM ?? WHERE ??=?";
        var table = ["id","pwd","users","username",req.body.username];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
                console.log(rows);
            }
        });
    });
}

module.exports = REST_ROUTER;
