import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    TouchableNativeFeedback,
    ScrollView
} from 'react-native';

const styles = StyleSheet.create(require('../global.styles').styles);
const statisticsStyles = StyleSheet.create(require('./statistics.styles').styles);

const Realm = require('realm');
var realm;

class Statistics extends Component {
    constructor(props) {
        super(props);

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
    }

    showStatistics() {
        var statisticsCard = [];
        var i = 1;

        var results = realm.objects('TotalResults').filtered(
            'muscleKey="' + this.props.muscleKey + '"' +
            'AND exerciseID="' + this.props.exerciseID + '"');

        _.forEach(results, function(value, key) {
            statisticsCard.push(
                <View key={i} style={statisticsStyles.holder}>
                    <Text style={statisticsStyles.text}>{value.id.substring(6, 8)}/{value.id.substring(4, 6)}/{value.id.substring(0, 4)} </Text>
                    <Text style={statisticsStyles.text}> {value.results.weight_1}x{value.results.reps_1}</Text>
                    <Text style={statisticsStyles.text}> {value.results.weight_2}x{value.results.reps_2}</Text>
                    <Text style={statisticsStyles.text}> {value.results.weight_3}x{value.results.reps_3}</Text>
                    <Text style={statisticsStyles.text}> {value.results.weight_4}x{value.results.reps_4}</Text>
                    <Text style={statisticsStyles.text}> {value.results.weight_5}x{value.results.reps_5}</Text>
                </View>
            );

            i++;
        });

        return (statisticsCard);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid title={"EasyGym - Cтатистика"} titleColor="#FFF" style={styles.toolbar} />

                <ScrollView style={statisticsStyles.container}>
                    <Text style={statisticsStyles.title}>{this.props.exerciseName}</Text>

                    {this.showStatistics()}
                </ScrollView>
            </View>
        );
    }
}

module.exports = Statistics;