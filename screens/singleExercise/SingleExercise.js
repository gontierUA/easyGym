import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    TouchableHighlight,
    ScrollView,
    TextInput,
    ToastAndroid,
    WebView
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
            reps_5: this.getTodayResults()['reps_5'],
            btnPressed: false
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
                };

                ToastAndroid.show('Данные о тренировке обновлены!', ToastAndroid.SHORT);
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

                ToastAndroid.show('Данные о тренировке добавлены!', ToastAndroid.SHORT);
            }
        });

        // delete all results

        // realm.write(() => {
        //     var deleteResults = realm.objects('TotalResults').filtered(
        //         'id="20140409" ' +
        //         'AND muscleKey="' + this.props.muscleKey + '"' +
        //         'AND exerciseID="' + this.props.exerciseID + '"');
        //
        //     realm.delete(deleteResults);
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

    getLastResult() {
        var results = realm.objects('TotalResults').filtered(
            'muscleKey="' + this.props.muscleKey + '"' +
            'AND exerciseID="' + this.props.exerciseID + '"' +
            'AND id!="' + this.getCurrentDate() + '"');

        if (results.length) {
            return results[results.length - 1].results;
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

    _changeValue(input, step, type) {
        var currentVal = parseInt(this.state[input]);
        var newVal = (type === '+') ? currentVal + step : currentVal - step;

        this.setState({[input]: (newVal >= 0) ? String(newVal) : String(currentVal)});
    }

    printInputs() {
        var inputs = [];

        for (let i = 1; i <= 5; i++) {
            inputs.push(
                <View key={i} style={exerciseStyles.resultsHolder}>
                    <TouchableHighlight
                        style={[exerciseStyles.buttonPlusMinus, exerciseStyles.buttonMinus]}
                        onPress={this._changeValue.bind(this, 'weight_' + i, 5, '-')}
                        underlayColor="#FF8A65">
                        <Text style={exerciseStyles.buttonText}>&ndash;</Text>
                    </TouchableHighlight>

                    <TextInput style={exerciseStyles.resultsInput}
                               keyboardType="numeric"
                               selectTextOnFocus={true}
                               onChangeText={(val) => this.setState({['weight_' + i]: val})}
                               placeholder={this.getLastResult()['weight_' + i]}
                               defaultValue={(this.getTodayResults()['weight_' + i] != 0) ? this.getTodayResults()['weight_' + i] : ''}
                               underlineColorAndroid={(this.getTodayResults()['weight_' + i] != 0) ? '#00C853' : '#546E7A'}
                               onSubmitEditing={this.saveResults.bind(this)}
                               value={(this.state['weight_' + i] === '0') ? '' : this.state['weight_' + i]}/>

                    <TouchableHighlight
                        style={[exerciseStyles.buttonPlusMinus, exerciseStyles.buttonPlus]}
                        onPress={this._changeValue.bind(this, 'weight_' + i, 5, '+')}
                        underlayColor="#00E676">
                        <Text style={exerciseStyles.buttonText}>+</Text>
                    </TouchableHighlight>

                    <Text style={exerciseStyles.separator}>x</Text>

                    <TouchableHighlight
                        style={[exerciseStyles.buttonPlusMinus, exerciseStyles.buttonMinus]}
                        onPress={this._changeValue.bind(this, 'reps_' + i, 1, '-')}
                        underlayColor="#FF8A65">
                        <Text style={exerciseStyles.buttonText}>&ndash;</Text>
                    </TouchableHighlight>

                    <TextInput style={exerciseStyles.resultsInput}
                               keyboardType="numeric"
                               selectTextOnFocus={true}
                               onChangeText={(val) => this.setState({['reps_' + i]: val})}
                               placeholder={this.getLastResult()['reps_' + i]}
                               defaultValue={(this.getTodayResults()['reps_' + i] != 0) ? this.getTodayResults()['reps_' + i] : ''}
                               underlineColorAndroid={(this.getTodayResults()['reps_' + i] != 0) ? '#00C853' : '#546E7A'}
                               onSubmitEditing={this.saveResults.bind(this)}
                               value={(this.state['reps_' + i] === '0') ? '' : this.state['reps_' + i]} />

                    <TouchableHighlight
                        style={[exerciseStyles.buttonPlusMinus, exerciseStyles.buttonPlus]}
                        onPress={this._changeValue.bind(this, 'reps_' + i, 1, '+')}
                        underlayColor="#00E676">
                        <Text style={exerciseStyles.buttonText}>+</Text>
                    </TouchableHighlight>

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

    showAboutScreen() {
        this.props.navigator.push({
            id: 'AboutExercise',
            muscleKey: this.props.muscleKey,
            exerciseID: this.props.exerciseID,
            exerciseName: this.props.exerciseName
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    title={this.props.muscleNameRus}
                    subtitle={this.props.exerciseName}
                    titleColor="#FFF"
                    subtitleColor="#FFF"
                    style={styles.toolbar}
                    actions={[
                     {title: 'Статистика', icon: require('../../img/ico_stats.png'), show: 'always'},
                     {title: 'О упражнении', icon: require('../../img/ico_about.png'), show: 'always'}
                    ]}
                    onActionSelected={this.onActionSelected.bind(this)} />

                <ScrollView style={exerciseStyles.container}>

                    <View style={exerciseStyles.header}>
                        <Text style={exerciseStyles.headerText}>вес</Text>
                        <Text style={exerciseStyles.headerText}>повторения</Text>
                    </View>
                    
                    {this.printInputs()}

                    <View style={exerciseStyles.buttonsHolder}>
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

    onActionSelected(position) {
        if (position === 0) { // index of 'Статистика'
            this.showStatistics();
        } else if (position === 1) { // index of 'О упражнении'
            this.showAboutScreen();
        }
    }
}

module.exports = SingleExercise;