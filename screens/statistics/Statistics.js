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

const Database = require('../../database/db.js').Database();

class Statistics extends Component {
    constructor(props) {
        super(props);
    }

    showStatistics() {
        var statisticsCard = [];
        var i = 1;

        var results = Database.getExerciseStats(this.props.muscleKey, this.props.exerciseID);

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
                <ToolbarAndroid title={"Cтатистика"} titleColor="#FFF" style={styles.toolbar} />

                <ScrollView style={statisticsStyles.container}>
                    <Text style={statisticsStyles.title}>{this.props.exerciseName}</Text>

                    {this.showStatistics()}
                </ScrollView>
            </View>
        );
    }
}

module.exports = Statistics;