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

var Datastore = require('react-native-local-mongodb');
var DB_INFO = new Datastore({ filename: 'DB_INFO', autoload: true });
var DB_EXERCISES = new Datastore({ filename: 'DB_EXERCISES', autoload: true });

class Exercises extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
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
                // console.log(value, key);

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
        // todo: need to refresh and save
        // DB_EXERCISES.insert({
        //     type: 'chest',
        //     title: 'TEST'
        // });

        this.setState({isModalVisible: true});
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
                        <View>{this.output}</View>
                    </ScrollView>

                    <TouchableHighlight
                        style={stylesTemp.addButton}
                        onPress={this.addExercise.bind(this)}>
                        <Text style={stylesTemp.addButtonText}>+</Text>
                    </TouchableHighlight>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1}}>{this.loadExercises()}</View>
            );
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