const stage = require('../CONFIG');

module.exports = function(mongoose) {
    
    const dbName = stage.mongo_db;
    const dbUser = stage.mongo_user;
    const dbPath = stage.mongo_path;
    const dbPass = encodeURIComponent(stage.mongo_pass);
    
    var dbURI = `mongodb+srv://${dbUser}:${dbPass}${dbPath}${dbName}?retryWrites=true&w=majority`;
        
        mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
        .then( (connection) => { 
            console.log(connection ? 'this was a success' + connection : 'This was a connection DB failure')
            return connection;    
        })
        .catch( (e) => {
            console.log(e.message)
            return null;
            
        });
        mongoose.set('useFindAndModify', false);
         

}

