module.exports = function(mongoose) {

    const dbName = 'dame_tu_lista_db'
    const dbUser = 'admin'
    const dbPass = encodeURIComponent('Dtl@km91o0I9u8Y7')

    var dbURI = 'mongodb://admin:admin@ds023495.mlab.com:23495/gaitcome_db';
    // var dbURI = `mongodb://${dbUser}:${dbPass}@ds163301.mlab.com:63301/${dbName}`;
    // admin|Dtl@km91o0I9u8Y7
    // {
    //     "_id": "dame_tu_lista_db.admin",
    //     "user": "admin",
    //     "db": "dame_tu_lista_db",
    //     "roles": [
    //         {
    //             "role": "dbOwner",
    //             "db": "dame_tu_lista_db"
    //         }
    //     ]
    // }
   
    mongoose.set('useUnifiedTopology', true);
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