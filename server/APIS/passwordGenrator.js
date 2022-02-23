const PasswordGenerator = require('generate-password');

module.exports= function genratePassword(){
    return PasswordGenerator.generate({
        length: 12,
        numbers: true,
        symbols:true
    });
    
} 