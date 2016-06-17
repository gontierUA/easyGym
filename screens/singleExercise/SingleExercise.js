import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    TouchableHighlight,
    TouchableNativeFeedback,
    ScrollView,
    TextInput,
    ToastAndroid,
    WebView,
    InteractionManager,
    Image
} from 'react-native';

const styles = StyleSheet.create(require('../global.styles').styles);
const exerciseStyles = StyleSheet.create(require('./singleExercise.styles').styles);

var DB = require('../db').DB;

class SingleExercise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            today_weight_1: '0',
            today_weight_2: '0',
            today_weight_3: '0',
            today_weight_4: '0',
            today_weight_5: '0',
            today_reps_1: '0',
            today_reps_2: '0',
            today_reps_3: '0',
            today_reps_4: '0',
            today_reps_5: '0',
            last_weight_1: '0',
            last_weight_2: '0',
            last_weight_3: '0',
            last_weight_4: '0',
            last_weight_5: '0',
            last_reps_1: '0',
            last_reps_2: '0',
            last_reps_3: '0',
            last_reps_4: '0',
            last_reps_5: '0'
        };

        this.getTodayResults();
        this.getLastResult();
    }

    getCurrentDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        const YEAR = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = YEAR + mm + dd;

        return today;
    }

    saveResults() {
        var _this = this;

        DB.TABLE_RESULTS.find({exerciseID: _this.props.exerciseID, date: _this.getCurrentDate()}, function (error, result) {
            console.log(result);

            if (!result.length) {
                DB.TABLE_RESULTS.insert({
                    exerciseID: _this.props.exerciseID,
                    date: _this.getCurrentDate(),
                    results: [
                        [_this.state.today_weight_1, _this.state.today_reps_1],
                        [_this.state.today_weight_2, _this.state.today_reps_2],
                        [_this.state.today_weight_3, _this.state.today_reps_3],
                        [_this.state.today_weight_4, _this.state.today_reps_4],
                        [_this.state.today_weight_5, _this.state.today_reps_5]
                    ]
                });

                ToastAndroid.show('Данные добавлены!', ToastAndroid.SHORT);
            } else {
                DB.TABLE_RESULTS.update({ _id: result[0]._id }, {
                    $set: {
                        results: [
                            [_this.state.today_weight_1, _this.state.today_reps_1],
                            [_this.state.today_weight_2, _this.state.today_reps_2],
                            [_this.state.today_weight_3, _this.state.today_reps_3],
                            [_this.state.today_weight_4, _this.state.today_reps_4],
                            [_this.state.today_weight_5, _this.state.today_reps_5]
                        ]
                    }
                }, {});

                ToastAndroid.show('Данные обновлены!', ToastAndroid.SHORT);
            }
        });
    }

    getTodayResults() {
        var _this = this;

        DB.TABLE_RESULTS.find({exerciseID: _this.props.exerciseID, date: _this.getCurrentDate()}, function (error, items) {
            if (items.length) {
                _this.setState({
                    today_weight_1: items[0].results[0][0],
                    today_weight_2: items[0].results[1][0],
                    today_weight_3: items[0].results[2][0],
                    today_weight_4: items[0].results[3][0],
                    today_weight_5: items[0].results[4][0],
                    today_reps_1: items[0].results[0][1],
                    today_reps_2: items[0].results[1][1],
                    today_reps_3: items[0].results[2][1],
                    today_reps_4: items[0].results[3][1],
                    today_reps_5: items[0].results[4][1]
                });
            }
        });
    }

    getLastResult() {
        var _this = this;

        DB.TABLE_RESULTS.find({exerciseID: _this.props.exerciseID}).sort({date: -1}).exec(function (error, items) {
            if (items.length) {
                _this.setState({
                    last_weight_1: items[0].results[0][0],
                    last_weight_2: items[0].results[1][0],
                    last_weight_3: items[0].results[2][0],
                    last_weight_4: items[0].results[3][0],
                    last_weight_5: items[0].results[4][0],
                    last_reps_1: items[0].results[0][1],
                    last_reps_2: items[0].results[1][1],
                    last_reps_3: items[0].results[2][1],
                    last_reps_4: items[0].results[3][1],
                    last_reps_5: items[0].results[4][1]
                });
            }
        });
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
                        onPress={this._changeValue.bind(this, 'today_weight_' + i, 5, '-')}
                        underlayColor="#FF8A65">
                        <Text style={exerciseStyles.buttonText}>&ndash;</Text>
                    </TouchableHighlight>

                    <TextInput
                        style={exerciseStyles.resultsInput}
                        keyboardType="numeric"
                        selectTextOnFocus={true}
                        onChangeText={(val) => this.setState({['today_weight_' + i]: val})}
                        placeholder={this.state['last_weight_' + i]}
                        defaultValue={(this.state['today_weight_' + i] !== '0') ? this.state['today_weight_' + i] : ''}
                        underlineColorAndroid={(this.state['today_weight_' + i] !== '0') ? '#00C853' : '#546E7A'}
                        onSubmitEditing={this.saveResults.bind(this)}
                        value={(this.state['today_weight_' + i] !== '0') ? this.state['today_weight_' + i] : ''}
                    />

                    <TouchableHighlight
                        style={[exerciseStyles.buttonPlusMinus, exerciseStyles.buttonPlus]}
                        onPress={this._changeValue.bind(this, 'today_weight_' + i, 5, '+')}
                        underlayColor="#00E676">
                        <Text style={exerciseStyles.buttonText}>+</Text>
                    </TouchableHighlight>

                    <Text style={exerciseStyles.separator}>x</Text>

                    <TouchableHighlight
                        style={[exerciseStyles.buttonPlusMinus, exerciseStyles.buttonMinus]}
                        onPress={this._changeValue.bind(this, 'today_reps_' + i, 1, '-')}
                        underlayColor="#FF8A65">
                        <Text style={exerciseStyles.buttonText}>&ndash;</Text>
                    </TouchableHighlight>

                    <TextInput
                        style={exerciseStyles.resultsInput}
                        keyboardType="numeric"
                        selectTextOnFocus={true}
                        onChangeText={(val) => this.setState({['today_reps_' + i]: val})}
                        placeholder={this.state['last_reps_' + i]}
                        defaultValue={(this.state['today_reps_' + i] !== '0') ? this.state['today_reps_' + i] : ''}
                        underlineColorAndroid={(this.state['today_reps_' + i] !== '0') ? '#00C853' : '#546E7A'}
                        onSubmitEditing={this.saveResults.bind(this)}
                        value={(this.state['today_reps_' + i] !== '0') ? this.state['today_reps_' + i] : ''}
                    />

                    <TouchableHighlight
                        style={[exerciseStyles.buttonPlusMinus, exerciseStyles.buttonPlus]}
                        onPress={this._changeValue.bind(this, 'today_reps_' + i, 1, '+')}
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

    showStopwatch(muscleKey, muscleNameRus) {
        this.props.navigator.push({
            id: 'Stopwatch'
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
                     {title: 'Статистика', icon: require('../../img/ico_chart.png'), show: 'always'},
                     {title: 'О упражнении', icon: require('../../img/ico_video.png'), show: 'always'}
                    ]}
                    onActionSelected={this.onActionSelected.bind(this)} />

                <ScrollView style={exerciseStyles.container}>

                    <View style={exerciseStyles.header}>
                        <Text style={exerciseStyles.headerText}>вес</Text>
                        <Text style={exerciseStyles.headerText}>повторения</Text>
                    </View>
                    
                    {this.printInputs()}

                    <TouchableNativeFeedback
                        onPress={this.showStopwatch.bind(this)}>
                        <View>
                            <Text>stopwatch</Text>
                        </View>
                    </TouchableNativeFeedback>
                </ScrollView>

                <TouchableNativeFeedback
                    onPress={this.saveResults.bind(this)}>
                    <View style={stylesTemp.addButton}>
                        <Image source={require('../../img/ico_ok.png')} style={stylesTemp.buttonIco} />
                    </View>
                </TouchableNativeFeedback>
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

var stylesTemp = StyleSheet.create({
    addButton: {
        width: 56,
        height: 56,
        backgroundColor: '#E91E63',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    addButtonText: {
        fontSize: 31,
        fontWeight: '100',
        lineHeight: 43,
        color: '#FFF'
    },
    buttonIco: {
        width: 20,
        height: 20
    }
});

module.exports = SingleExercise;