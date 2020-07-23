const stage = require('../CONFIG');



module.exports = function(mongoose) {
    
    const dbName = stage.mongo_db;
    const dbUser = stage.mongo_user;
    const dbPath = stage.mongo_path;
    const dbPass = encodeURIComponent(stage.mongo_pass);
    
    var dbURI = `mongodb://${dbUser}:${dbPass}${dbPath}${dbName}`;
   
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useFindAndModify', false);
    // var connection = mongoose.createConnection(dbURI, { server: { poolSize: 5 } });
    var connection = null;
   (async function (){
        connection = await mongoose.connect(dbURI,{ useNewUrlParser: true }).catch(e => {
            console.log(e.message)})
        console.log(connection ? 'this was a success' + connection : 'This was a connection DB failure')
   })()

    // //When successfully connected
    // connection.on('connected', function () {
    //     console.log('Mongoose connection open to ' + dbURI);
    // });

    // // If the connection throws an error
    // connection.on('error',function (err) {
    //     console.log('Mongoose default connection error: ' + err);
    // });

    // // When the connection is disconnected
    // connection.on('disconnected', function () {
    //     console.log('Mongoose default connection disconnected');
    // });

    // // If the Node process ends, close the Mongoose connection
    // process.on('SIGINT', function() {
    //     connection.close(function () {
    //         console.log('Mongoose default connection disconnected through app termination');
    //         process.exit(0);
    //     });
    // });

    return connection;    
}

// https://mongoosejs.com/docs/deprecations.html