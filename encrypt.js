var bcrypt = require('bcrypt');

var password = 'wildAmerica';
var encryptedPassword;

bcrypt.genSalt(10, function(err, salt){
  bcrypt.hash(password, salt, function(err, hash){
    console.log(hash);
  });
});

bcrypt.compare('wildAmerica', encryptedPassword, function(err, res){
  console.log('wildAmerica: ', res);
});

bcrypt.compare('notWildAmerica', encryptedPassword, function(err, res){
  console.log('notWildAmerica: ', res);
});
