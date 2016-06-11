var Datastore = require('react-native-local-mongodb');

export var DB = {
    TABLE_INFO: new Datastore({ filename: 'DB_INFO', autoload: true }),
    TABLE_EXERCISES: new Datastore({ filename: 'DB_EXERCISES', autoload: true }),
    TABLE_RESULTS: new Datastore({ filename: 'DB_RESULTS', autoload: true })
};