var mysql = require("mysql");
var jwt    = require('jsonwebtoken');
var config = require('./config');
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

function getToken(headers){
  var i = 0;
  while(headers[i] != undefined){
    //console.log(headers[i]);
    if (headers[i] == "Authorization"){
      return headers[i+1];
    }
    i++;
  }
  return '';
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    })
    router.post("/users/create",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?)";
        console.log(req.body);
        var table =
          [
            "users_usr",
            "usr_mail",
            "usr_pwd",
            "usr_name",
            "usr_firstname",
            "usr_addr",
            "usr_postalcode",
            "usr_city",
            "usr_phone",
            "usr_role",
            req.body.mail,
            req.body.pwd,
            req.body.name,
            req.body.firstname,
            req.body.addr,
            req.body.postalcode,
            req.body.city,
            req.body.phone,
            req.body.role
          ];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,results){
            if(err) {
                res.json({"Error" : true, "Code" : err.code, "Message" : err.message});
                console.log(err.message);
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
                console.log("User Added");
            }
        });

    });
    router.post("/users/update",function(req,res){
      //console.log(req.rawHeaders);
      console.log(getToken(req.rawHeaders));
      jwt.verify(getToken(req.rawHeaders), config.tokenKey, function(err, decoded) {
        console.log(err);
        console.log(decoded);
        if(err){
          res.json({"Error" : true, "Code" : "JWT_EXPIRED"});
        }else{
          var query = "UPDATE ?? SET ??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=? WHERE ??=?";
          console.log(req.body);
          var table =
            [
              "users_usr",
              "usr_mail",
              req.body.mail,
              "usr_pwd",
              req.body.pwd,
              "usr_name",
              req.body.name,
              "usr_firstname",
              req.body.firstname,
              "usr_addr",
              req.body.addr,
              "usr_postalcode",
              req.body.postalcode,
              "usr_city",
              req.body.city,
              "usr_phone",
              req.body.phone,
              "usr_id",
              decoded.id
            ];
          query = mysql.format(query,table);
          console.log(query);
          connection.query(query,function(err,results){
              if(err) {
                  res.json({"Error" : true, "Code" : err.code, "Message" : err.message});
                  console.log(err.message);
              } else {
                  res.json({"Error" : false, "Message" : "User Updated !"});
                  console.log("User Updated");
              }
          });
        }
      });
    });
    router.get("/users/profile",function(req,res){
      jwt.verify(getToken(req.rawHeaders), config.tokenKey, function(err, decoded) {
        console.log(err);
        console.log(decoded);
        console.log(getToken(req.rawHeaders));
        if(err){
          res.json({"Error" : true, "Code" : "JWT_EXPIRED"});
        }else{
            var query = "SELECT * FROM ?? WHERE ?? = ?";
            var table = ["users_usr", "usr_id", decoded.id];
            query = mysql.format(query,table);
            console.log(query);
            connection.query(query,function(err,results,fields){
                if(err) {
                    res.json({"Error" : true, "Message" : err.code });
                    console.log(err.message);
                } else {
                    res.json({"Error" : false, "Message" : "Success", "Users" : results});
                    console.log(results);
                }
            });
        }
      });

    });

    router.get("/users/profile/role",function(req,res){
      jwt.verify(getToken(req.rawHeaders), config.tokenKey, function(err, decoded) {
        console.log(err);
        console.log(decoded);
        if(err){
          res.json({"Error" : true, "Code" : "JWT_EXPIRED"});
        }else{
            var query = "SELECT usr_role FROM ?? WHERE ?? = ?";
            var table = ["users_usr", "usr_id", decoded.id];
            query = mysql.format(query,table);
            console.log(query);
            connection.query(query,function(err,results,fields){
                if(err) {
                    res.json({"Error" : true, "Message" : err.code });
                    console.log(err.message);
                } else {
                    res.json({"Error" : false, "Message" : "Success", "Role" : results});
                    console.log(results);
                }
            });
        }
      });

    });

    router.get("/accounts",function(req,res){
      jwt.verify(getToken(req.rawHeaders), config.tokenKey, function(err, decoded) {
        console.log(err);
        console.log(decoded);
        if(err){
          res.json({"Error" : true, "Code" : "JWT_EXPIRED"});
        }else{
            if(decoded.role>0){
              res.json({"Error" : true, "Code" : "UNAUTHORIZED_QUERY" });
            }else if(decoded.role == 0){
              var query = "SELECT * FROM ?? WHERE ?? = ?";
              var table = ["accounts_acc", "usr_id", decoded.id];
              query = mysql.format(query,table);
              console.log(query);
              connection.query(query,function(err,results,fields){
                  if(err) {
                      res.json({"Error" : true, "Message" : err.code });
                      console.log(err.message);
                  } else {
                      console.log(results);
                      res.json({"Error" : false, "Message" : "Success", "Accounts" : results});
                  }
              })
            }
        }
      });

    });

    router.get("/users/all",function(req,res){
      console.log("je suis dans users/all");
        jwt.verify(getToken(req.rawHeaders), config.tokenKey, function(err, decoded) {
        console.log("error" + err);
        console.log("decode" + decoded);
        if(err){
          res.json({"Error" : true, "Code" : "JWT_EXPIRED"});
        }else{
            if(decoded.role > 1){
              console.log("num role ---->" +decoded.usr_role)
              var query = "SELECT * FROM ??";
              var table = ["users_usr"];
              query = mysql.format(query,table);
              console.log(query);
              connection.query(query,function(err,results,fields){
                  if(err) {
                      res.json({"Error" : true, "Message" : err.code });
                      console.log(err.message);
                  } else {
                      res.json({"Error" : false, "Message" : "Success", "Users" : results});
                      console.log(results);
                  }
              });
            }else{
              res.json({"Error" : true, "Code" : "UNAUTHORIZED_QUERY" });
            }
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
                console.log(err.message);
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
                console.log(rows);
            }
        });
    });

    router.post('/authenticate', function(req, res) {
        var query = "SELECT ??, ??, ?? FROM ?? WHERE ??=?";
        var table = ["usr_id","usr_pwd","usr_role","users_usr","usr_mail",req.body.mail];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows, results){
            if(err) {
                res.json({"Error" : true, "Code" : err.code, "Message" : err.message});
                console.log(err.message);
            } else {
                console.log(rows);
                if(rows.length == 0){
                  console.log("No user found");
                  res.json({"Error" : true, "Message" : "Authentication failed. Username doesn't exists", "Code" : "USR_NOT_FOUND"});
                }else{
                  if(rows[0].usr_pwd !== req.body.pwd){
                    console.log("Wrong password !");
                    res.json({"Error" : true, "Message" : "Authentication failed. Wrong password", "Code" : "PWD_FAILED"});
                  }
                  else{
                    console.log("Username and password match !");
                    var token = jwt.sign({"id" : rows[0].usr_id,"mail" : req.body.mail, "pwd" : req.body.pwd, "role" : rows[0].usr_role}, config.tokenKey, { expiresIn: 60 * 60 });
                    res.json({"Error" : false, "Message" : "Authentication succeed", "Token" : token});
                  }
                }
            }
        });
    });

    router.get("/clients", function(req, res) {
      console.log("je suis dans client");
      jwt.verify(getToken(req.rawHeaders), config.tokenKey, function(err, decoded) {
          console.log("error" + err);
          console.log("decode" + decoded);
          if (err) {
              res.json({
                  "Error": true,
                  "Code": "JWT_EXPIRED"
              });
          } else {
              if (decoded.role >= 1) {
                  console.log("num role ---->" + decoded.usr_role)
                  var query = "SELECT * FROM ?? WHERE ?? = ?";
                  var table = ["users_usr", "usr_counselorid", decoded.id];
                  query = mysql.format(query, table);
                  console.log(query);
                  connection.query(query, function(err, results, fields) {
                      if (err) {
                          res.json({
                              "Error": true,
                              "Message": err.code
                          });
                          console.log(err.message);
                      } else {
                          res.json({
                              "Error": false,
                              "Message": "Success",
                              "Users": results
                          });
                          console.log(results);
                      }
                  });
              }else{
                res.json({
                    "Error": true,
                    "Code": "UNAUTHORIZED_QUERY"
                });
              }
          }
      });
  });

  router.get("/accounts/all",function(req,res){
    console.log("je suis dans accounts/all");
      jwt.verify(getToken(req.rawHeaders), config.tokenKey, function(err, decoded) {
      console.log("error" + err);
      console.log("decode" + decoded);
      if(err){
        res.json({"Error" : true, "Code" : "JWT_EXPIRED"});
      }else{
          if(decoded.role == 0){
            var query = "SELECT ??, ??, ??, ?? FROM ?? AS ?? JOIN ?? AS ?? ON ?? = ??";
            var table = ["usr_name", "usr_firstname", "acc_id", "acc_type", "users_usr", "u", "accounts_acc", "a", "a.usr_id", "u.usr_id"];
            query = mysql.format(query,table);
            console.log(query);
            connection.query(query,function(err,results,fields){
                if(err) {
                    res.json({"Error" : true, "Message" : err.code });
                    console.log(err.message);
                } else {
                    res.json({"Error" : false, "Message" : "Success", "Accounts" : results});
                    console.log(results);
                }
            });
          }
        }
      });
    });

    router.get("/accounts/:user_id",function(req,res){
        console.log("JE suis dans account/id")
        jwt.verify(getToken(req.rawHeaders), config.tokenKey, function(err, decoded) {
        console.log(err);
        console.log(decoded);
        if(err){
          res.json({"Error" : true, "Code" : "JWT_EXPIRED"});
        }else{
            var query = "SELECT * FROM ?? WHERE ?? = ?";
            var table = ["accounts_acc", "usr_id", req.params.user_id];
            query = mysql.format(query,table);
            console.log(query);
            connection.query(query,function(err,results,fields){
                if(err) {
                    res.json({"Error" : true, "Message" : err.code });
                    console.log(err.message);
                } else {
                    res.json({"Error" : false, "Message" : "Success", "Accounts" : results});
                    console.log(results);
                }
            });

        }
        });
    });

    router.post("/operations/new",function(req,res){
      console.log("JE suis dans operations/new")
      //console.log(req.rawHeaders);
      console.log(getToken(req.rawHeaders));
      jwt.verify(getToken(req.rawHeaders), config.tokenKey, function(err, decoded) {
        console.log(err);
        console.log(decoded);
        if(err){
          res.json({"Error" : true, "Code" : "JWT_EXPIRED"});
        }else{
          console.log("Token OK");
          var ope = req.body;
          var query = "INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, now(), ?)";
          console.log(req.body);
          var table =
            [
              "operations_ope",
              "acc_id_deb",
              "acc_id_cred",
              "ope_montant",
              "ope_date",
              "ope_desc",
              ope.iddeb,
              ope.idcred,
              ope.montant,
              ope.libelle
            ];
          var error = false;
          query = mysql.format(query,table);
          console.log(query);
          connection.query(query,function(err,results){
              if(err) {
                  error = true;
              }
          });
          if(!err){
            var query = "UPDATE ?? SET ??=??-? WHERE ?? = ?";
            var table =
              [
                "accounts_acc",
                "acc_solde",
                "acc_solde",
                ope.montant,
                "acc_id",
                ope.iddeb
              ];
            var error = false;
            query = mysql.format(query,table);
            console.log(query);
            connection.query(query,function(err,results){
                if(err) {
                    error = true;
                }
            });
          }
          if(!err){
            var query = "UPDATE ?? SET ??=??+? WHERE ?? = ?";
            var table =
              [
                "accounts_acc",
                "acc_solde",
                "acc_solde",
                ope.montant,
                "acc_id",
                ope.idcred
              ];
            var error = false;
            query = mysql.format(query,table);
            console.log(query);
            connection.query(query,function(err,results){
                if(err) {
                    error = true;
                }
            });
          }
          if(err){
            res.json({"Error" : true, "Code" : "JWT_EXPIRED"});
          }else{
            res.json({"Error" : false, "Code" : "TRANSACTION_ADDED"});
          }

        }
      });
    });

    router.post("/operations/actions",function(req,res){
      console.log("JE suis dans operations/actions")
      //console.log(req.rawHeaders);
      console.log(getToken(req.rawHeaders));
      jwt.verify(getToken(req.rawHeaders), config.tokenKey, function(err, decoded) {
        console.log(err);
        console.log(decoded);
        if(err){
          res.json({"Error" : true, "Code" : "JWT_EXPIRED"});
        }else{
          console.log("Token OK");
          var ope = req.body;
          var query = "INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, NULL, ?, now(), ?)";
          console.log(req.body);
          var table =
            [
              "operations_ope",
              "acc_id_deb",
              "acc_id_cred",
              "ope_montant",
              "ope_date",
              "ope_desc",
              ope.iddeb,
              ope.montant,
              ope.libelle
            ];
          var error = false;
          query = mysql.format(query,table);
          console.log(query);
          connection.query(query,function(err,results){
              if(err) {
                  error = true;
              }
          });
          if(!err){
            var query = "UPDATE ?? SET ??=??-?, ??=??+? WHERE ?? = ?";
            var table =
              [
                "accounts_acc",
                "acc_solde",
                "acc_solde",
                ope.montant,
                "acc_actions",
                "acc_actions",
                ope.montant/10,
                "acc_id",
                ope.iddeb
              ];
            var error = false;
            query = mysql.format(query,table);
            console.log(query);
            connection.query(query,function(err,results){
                if(err) {
                    error = true;
                }
            });
          }
          if(err){
            res.json({"Error" : true, "Code" : "JWT_EXPIRED"});
          }else{
            res.json({"Error" : false, "Code" : "TRANSACTION_ADDED"});
          }

        }
      });
    });

    router.get("/operations/:acc_id",function(req,res){
        console.log("JE suis dans operations/:acc_id")
        jwt.verify(getToken(req.rawHeaders), config.tokenKey, function(err, decoded) {
        console.log(err);
        console.log(decoded);
        if(err){
          res.json({"Error" : true, "Code" : "JWT_EXPIRED"});
        }else{
            var query = "SELECT * FROM (SELECT * FROM ?? WHERE ?? = ? UNION SELECT * FROM ?? WHERE ?? = ?) as ?? ORDER by ?? desc";
            var table = ['operations_ope','acc_id_deb',req.params.acc_id,'operations_ope','acc_id_cred',req.params.acc_id,'a','a.ope_date'];
            query = mysql.format(query,table);
            console.log(query);
            connection.query(query,function(err,results,fields){
                if(err) {
                    res.json({"Error" : true, "Message" : err.code });
                    console.log(err.message);
                } else {
                    res.json({"Error" : false, "Message" : "Success", "Operations" : results});
                    console.log(results);
                }
            });

        }
        });
    });

    router.post("/associate",function(req,res){
        console.log("JE suis dans associate")
        jwt.verify(getToken(req.rawHeaders), config.tokenKey, function(err, decoded) {
        console.log(err);
        console.log(decoded);
        if(err){
          res.json({"Error" : true, "Code" : "JWT_EXPIRED"});
        }else{
            if(decoded.role == 2){
                var query = "UPDATE ?? SET ??=? WHERE ?? = ?";
                var table = ['users_usr', 'usr_counselorid', req.body.cslId, "usr_id", req.body.cliId];
                query = mysql.format(query,table);
                console.log(query);
                connection.query(query,function(err,results,fields){
                    if(err) {
                        res.json({"Error" : true, "Message" : err.code });
                        console.log(err.message);
                    } else {
                        res.json({"Error" : false, "Message" : "Success"});
                        console.log(results);
                    }
                });
            }
            else{
                res.json({
                    "Error": true,
                    "Code": "UNAUTHORIZED_QUERY"
                });
            }
        }
        });
      });

}

module.exports = REST_ROUTER;
