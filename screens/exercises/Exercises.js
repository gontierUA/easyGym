import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    TouchableNativeFeedback,
    ScrollView,
    Modal,
    TextInput
} from 'react-native';

var _ = require('lodash');

const styles = StyleSheet.create(require('../global.styles').styles);
const stylesTemp = StyleSheet.create(require('./exercises.styles').styles);

var Datastore = require('react-native-local-mongodb');
var DB_INFO = new Datastore({ filename: 'DB_INFO', autoload: true });
var DB_EXERCISES = new Datastore({ filename: 'DB_EXERCISES', autoload: true });

class Exercises extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            newExercise: '',
            isModalVisible: false
        };

        this.output = [];
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

    loadExercises() {
        var _this = this;

        DB_EXERCISES.find({type: _this.props.muscleKey}, function (error, items) {
            _.forEach(items, function(value, key) {
                _this.output.push(
                    <TouchableNativeFeedback key={key} onPress={_this.showSingleExercise.bind(_this, value._id, value.title)}>
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>{value.title}</Text>
                        </View>
                    </TouchableNativeFeedback>
                );
            });

            _this.setState({
                loaded: true
            });
        });
    }

    addExercise() {
        if (this.state.newExercise) {
            DB_EXERCISES.insert({
                type: this.props.muscleKey,
                title: this.state.newExercise
            });

            this._setModalVisibility(false);

            this.output = [];

            this.setState({
                loaded: false,
                newExercise: ''
            });

            this.render();
        }
    }

    _setModalVisibility(visibility) {
        this.setState({isModalVisible: visibility});
    }

    render() {
        if (this.state.loaded) {
            return (
                <View style={{flex: 1}}>
                    <Modal
                        visible={this.state.isModalVisible}
                        animationType="fade"
                        transparent={true}
                        onRequestClose={() => {this._setModalVisibility.bind(this, false)}}
                    >
                        <View style={stylesTemp.modalBg}>
                            <View style={stylesTemp.modal}>
                                <Text style={stylesTemp.modalTitle}>Добавить новое упражнение?</Text>
                                <TextInput
                                    placeholder="Название"
                                    underlineColorAndroid={(this.state.newExercise) ? '#00C853' : '#D50000'}
                                    onChangeText={(val) => this.setState({newExercise: val})}
                                />

                                <View style={stylesTemp.buttonsHolder}>
                                    <TouchableNativeFeedback
                                        onPress={this._setModalVisibility.bind(this, false)}
                                        style={stylesTemp.modalButton}>
                                        <View>
                                            <Text style={stylesTemp.modalButtonText}>ОТМЕНИТЬ</Text>
                                        </View>
                                    </TouchableNativeFeedback>

                                    <TouchableNativeFeedback
                                        onPress={this.addExercise.bind(this)}
                                        style={stylesTemp.modalButton}>
                                        <View>
                                            <Text style={stylesTemp.modalButtonText}>ДОБАВИТЬ</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <ToolbarAndroid title={this.props.muscleNameRus} titleColor="#FFF" style={styles.toolbar} />

                    <ScrollView style={styles.screenHolder}>
                        <View>{this.output}</View>
                    </ScrollView>

                    <TouchableNativeFeedback
                        onPress={this._setModalVisibility.bind(this, true)}>
                        <View style={stylesTemp.addButton}>
                            <Text style={stylesTemp.addButtonText}>+</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1}}>{this.loadExercises()}</View>
            );
        }
    }
}

module.exports = Exercises;