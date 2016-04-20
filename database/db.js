const Realm = require('realm');
var realm;

const ExerciseResults = {
    name: 'ExerciseResults',
    properties: {
        weight_1: {type: 'string', default: '0'},
        weight_2: {type: 'string', default: '0'},
        weight_3: {type: 'string', default: '0'},
        weight_4: {type: 'string', default: '0'},
        weight_5: {type: 'string', default: '0'},
        reps_1: {type: 'string', default: '0'},
        reps_2: {type: 'string', default: '0'},
        reps_3: {type: 'string', default: '0'},
        reps_4: {type: 'string', default: '0'},
        reps_5: {type: 'string', default: '0'}
    }
};

const TotalResults = {
    name: 'TotalResults',
    properties: {
        id: 'string', // workout date
        muscleKey: 'string',
        exerciseID: 'int',
        results: 'ExerciseResults'
    }
};

realm = new Realm({schema: [ExerciseResults, TotalResults], schemaVersion: 6});

export const Database = function() {
    return {
        getExerciseStats: function(muscleKey, exerciseID) {
            return realm.objects('TotalResults').filtered(
                'muscleKey="' + muscleKey + '"' +
                'AND exerciseID="' + exerciseID + '"');
        },
        getTodayResults: function(muscleKey, exerciseID, currentDate) {
            return realm.objects('TotalResults').filtered(
                'id = "' + currentDate + '" ' +
                'AND muscleKey="' + muscleKey + '"' +
                'AND exerciseID="' + exerciseID + '"');
        },
        getLatestStats: function (muscleKey, exerciseID) {
            var latestResults = realm.objects('TotalResults').filtered(
                'muscleKey="' + muscleKey + '"' +
                'AND exerciseID="' + exerciseID + '"');

            return _.findLast(latestResults).results;
        }
    }
};


// delete all results

// realm.write(() => {
//     let allResults = realm.objects('TotalResults');
//     realm.delete(allResults);
// });