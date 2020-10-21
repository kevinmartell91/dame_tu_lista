const stage = require('../CONFIG');

module.exports = function(mongoose) {
    
    const dbName = stage.mongo_db;
    const dbUser = stage.mongo_user;
    const dbPath = stage.mongo_path;
    const dbPass = encodeURIComponent(stage.mongo_pass);
    
    var dbURI = `mongodb://${dbUser}:${dbPass}${dbPath}${dbName}`;
   
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useFindAndModify', false);
    var connection = null;
   (async function (){
        connection = await mongoose.connect(dbURI,{ useNewUrlParser: true }).catch(e => {
            console.log(e.message)})
        console.log(connection ? 'this was a success' + connection : 'This was a connection DB failure')
   })()

    return connection;    
}

