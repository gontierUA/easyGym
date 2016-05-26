import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    TouchableNativeFeedback,
    ScrollView,
    TouchableHighlight,
    Modal,
    TextInput
} from 'react-native';

var _ = require('lodash');

const styles = StyleSheet.create(require('../global.styles').styles);

var moduleChest = require('./db/db_chest').Chest;
var moduleLegs = require('./db/db_legs').Legs;
var moduleShoulders = require('./db/db_shoulders').Shoulders;
var moduleBiceps = require('./db/db_biceps').Biceps;
var moduleBack = require('./db/db_back').Back;
var moduleTriceps = require('./db/db_triceps').Triceps;

class Exercises extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalVisible: false
        };
    }

    showSingleExercise(exerciseID, exerciseName) {
        this.props.navigator.push({
            id: 'SingleExercise',
            exerciseName: exerciseName,
            exerciseID: exerciseID,
            muscleKey: this.props.muscleKey,
            muscleNameRus: this.props.muscleNameRus
        });
    }

    showExercises() {
        var exercisesCards = [];
        var tempExercises;
        var _this = this;

        var exercises = _.concat(moduleChest, moduleLegs, moduleShoulders, moduleBiceps, moduleBack, moduleTriceps);

        tempExercises = _.filter(exercises, ['type', _this.props.muscleKey]);

        _.forEach(tempExercises, function(value, key) {
            exercisesCards.push(
                <TouchableNativeFeedback key={value.id} onPress={_this.showSingleExercise.bind(_this, value.id, value.name)}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{value.name}</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        });

        return (exercisesCards);
    }

    addExercise() {
        this.setState({isModalVisible: true});
    }

    _setModalVisibility(visibility) {
        this.setState({isModalVisible: visibility});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Modal
                    visible={this.state.isModalVisible}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => {this._setModalVisibility(false)}}
                >
                    <View style={stylesTemp.modalBg}>
                        <View style={stylesTemp.modal}>
                            <Text style={stylesTemp.modalTitle}>Добавить новое упражнение?</Text>
                            <TextInput placeholder="Название" />

                            <View style={stylesTemp.buttonsHolder}>
                                <TouchableHighlight
                                    onPress={this._setModalVisibility.bind(this, false)}
                                    style={stylesTemp.modalButton}>
                                    <Text style={stylesTemp.modalButtonText}>ОТМЕНИТЬ</Text>
                                </TouchableHighlight>

                                <TouchableHighlight
                                    onPress={this._setModalVisibility.bind(this, false)}
                                    style={stylesTemp.modalButton}>
                                        <Text style={stylesTemp.modalButtonText}>ДОБАВИТЬ</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>

                <ToolbarAndroid title={this.props.muscleNameRus} titleColor="#FFF" style={styles.toolbar} />

                <ScrollView style={styles.screenHolder}>
                    <View>{this.showExercises()}</View>
                </ScrollView>

                <TouchableHighlight
                    style={stylesTemp.addButton}
                    onPress={this.addExercise.bind(this)}>
                    <Text style={stylesTemp.addButtonText}>+</Text>
                </TouchableHighlight>
            </View>
        );
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
    modalBg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    modal: {
        height: 220,
        padding: 24,
        backgroundColor: '#FFF',
        elevation: 5,
        borderRadius: 2,
        marginHorizontal: 40
    },
    modalTitle: {
        fontSize: 21,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 10
    },
    buttonsHolder: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        flexDirection: 'row'
    },
    modalButton: {
        marginLeft: 8
    },
    modalButtonText: {
        color: '#0091EA',
        height: 36,
        padding: 8,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});

module.exports = Exercises;