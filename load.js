var  fs = require('fs')
    , db = require('mongojs').connect('PhoneCat');

db.collection('phones').count( function (erros, doc) {
    if (doc == 0) {
        var phones = JSON.parse(fs.readFileSync(__dirname+'/app/phonesx/phones.json').toString());
        phones.forEach(function (phone) { 
            phone.details = JSON.parse(fs.readFileSync(__dirname+'/app/phonesx/'+phone.id+'.json').toString());
            phone._id = phone.id;
            delete phone.id;
            db.collection('phones').insert(phone, function (err, doc) { 
                if (err) {throw err;}
            });
        });
        console.log('Phones load to MongoDB');
    }
});