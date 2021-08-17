var app = require("express")();
const bcrypt = require("bcrypt");
const genAccessToken2 = require("../routes/simple_jwt").genAccessToken;
const getEntityType = require("../utils").getEntityType;

exports.postAuthenticate = function (req, res) {
  const { email, password, login_type } = req.body;

  const entityType = getEntityType(login_type);

  if (!entityType) {
    res.json({
      success: false,
      message: "Authentication fail. Entity not found.",
    });
  }

  entityType.findOne(
    {
      email: email,
    },
    function (err, entity) {
      if (err) {
        console.log("ERROR = >", err);
        throw err;
      }
      // console.log("KEVIN-  entity", entity);

      if (entity === null) {
        res.json({
          success: false,
          message: "Authentication failed. User not found.",
        });
      } else if (entity) {
        // check if passwords matche
        bcrypt.compare(password, entity.password).then((math) => {
          if (math) {
            // genreate a token
            const token = genAccessToken2(entity.toJSON());
            console.log(" token", token);
            res.json({
              success: true,
              message: "Enjoy your token!",
              token: token,
              entity: entity,
            });
          } else {
            res.json({
              success: false,
              message: "Authentication failed. Wrong password.",
            });
          }
        });
        // .catch( err => console.log(err));
      }
    }
  );
};
