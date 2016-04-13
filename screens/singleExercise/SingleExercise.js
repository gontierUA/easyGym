import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    TouchableHighlight,
    ScrollView,
    TextInput
} from 'react-native';

const styles = StyleSheet.create(require('../global.styles').styles);
const exerciseStyles = StyleSheet.create(require('./singleExercise.styles').styles);

const Realm = require('realm');
var realm;

class SingleExercise extends Component {
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

        this.state = {
            weight_1: this.getTodayResults()['weight_1'],
            weight_2: this.getTodayResults()['weight_2'],
            weight_3: this.getTodayResults()['weight_3'],
            weight_4: this.getTodayResults()['weight_4'],
            weight_5: this.getTodayResults()['weight_5'],
            reps_1: this.getTodayResults()['reps_1'],
            reps_2: this.getTodayResults()['reps_2'],
            reps_3: this.getTodayResults()['reps_3'],
            reps_4: this.getTodayResults()['reps_4'],
            reps_5: this.getTodayResults()['reps_5']
        };
    }

    getCurrentDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = yyyy + mm + dd;

        return today;
    }

    saveResults() {
        var _this = this;

        var todayResults = realm.objects('TotalResults').filtered(
            'id = "' + this.getCurrentDate() + '" ' +
            'AND muscleKey="' + _this.props.muscleKey + '"' +
            'AND exerciseID="' + _this.props.exerciseID + '"');

        realm.write(() => {
            if (todayResults.length) { // update existing
                todayResults[0].results = {
                    weight_1: _this.state.weight_1,
                    weight_2: _this.state.weight_2,
                    weight_3: _this.state.weight_3,
                    weight_4: _this.state.weight_4,
                    weight_5: _this.state.weight_5,
                    reps_1: _this.state.reps_1,
                    reps_2: _this.state.reps_2,
                    reps_3: _this.state.reps_3,
                    reps_4: _this.state.reps_4,
                    reps_5: _this.state.reps_5
                }
            } else { // create new
                realm.create('TotalResults', {
                    id: _this.getCurrentDate(),
                    muscleKey: _this.props.muscleKey,
                    exerciseID: _this.props.exerciseID,
                    results: {
                        weight_1: _this.state.weight_1,
                        weight_2: _this.state.weight_2,
                        weight_3: _this.state.weight_3,
                        weight_4: _this.state.weight_4,
                        weight_5: _this.state.weight_5,
                        reps_1: _this.state.reps_1,
                        reps_2: _this.state.reps_2,
                        reps_3: _this.state.reps_3,
                        reps_4: _this.state.reps_4,
                        reps_5: _this.state.reps_5
                    }
                });
            }
        });

        // delete all results

        // realm.write(() => {
        //     let allResults = realm.objects('TotalResults');
        //     realm.delete(allResults);
        // });
    }

    getTodayResults() {
        var todayResults = realm.objects('TotalResults').filtered(
            'id = "' + this.getCurrentDate() + '" ' +
            'AND muscleKey="' + this.props.muscleKey + '"' +
            'AND exerciseID="' + this.props.exerciseID + '"');

        if (todayResults.length) {
            return todayResults[0].results;
        } else {
            return {
                weight_1: '0',
                weight_2: '0',
                weight_3: '0',
                weight_4: '0',
                weight_5: '0',
                reps_1: '0',
                reps_2: '0',
                reps_3: '0',
                reps_4: '0',
                reps_5: '0'
            }
        }
    }

    printInputs() {
        var inputs = [];

        for (let i = 1; i <= 5; i++) {
            inputs.push(
                <View key={i} style={exerciseStyles.resultsHolder}>
                    <Text style={exerciseStyles.separator}>{i}.</Text>

                    <TextInput style={exerciseStyles.resultsInput}
                               keyboardType="numeric"
                               onChangeText={(val) => this.setState({['weight_' + i]: val})}
                               placeholder={this.getTodayResults()['weight_' + i]} />

                    <Text style={exerciseStyles.separator}>x</Text>

                    <TextInput style={exerciseStyles.resultsInput}
                               keyboardType="numeric"
                               onChangeText={(val) => this.setState({['reps_' + i]: val})}
                               placeholder={this.getTodayResults()['reps_' + i]} />
                </View>
            );
        }

        return inputs;
    }

    showStatistics() {
        this.props.navigator.push({
            id: 'Statistics',
            muscleKey: this.props.muscleKey,
            exerciseID: this.props.exerciseID,
            exerciseName: this.props.exerciseName
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid title={this.props.muscleNameRus} titleColor="#FFF" style={styles.toolbar} />

                <ScrollView style={styles.container}>

                    <Text style={exerciseStyles.title}>{this.props.exerciseName}</Text>

                    {this.printInputs()}

                    <View style={exerciseStyles.buttonsHolder}> 
                        <TouchableHighlight
                            onPress={this.showStatistics.bind(this)}
                            style={[styles.button, exerciseStyles.button]}
                            underlayColor="#00B0FF">
                            <Text style={exerciseStyles.buttonText}>СТАТИСТИКА</Text>
                        </TouchableHighlight>
                        
                        <TouchableHighlight
                            onPress={this.saveResults.bind(this)}
                            style={[styles.button, exerciseStyles.buttonSave]}
                            underlayColor="#00E676">
                            <Text style={exerciseStyles.buttonText}>СОХРАНИТЬ</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

module.exports = SingleExercise;