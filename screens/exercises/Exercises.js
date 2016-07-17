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
    TextInput,
    InteractionManager,
    ListView,
    LayoutAnimation,
    Image,
    Alert
} from 'react-native';

const styles = StyleSheet.create(require('../global.styles').styles);
const stylesTemp = StyleSheet.create(require('./exercises.styles').styles);

var DB = require('../db').DB;

class Exercises extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newExercise: '',
            isModalVisible: false,
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        };

        this.loadExercises();

        DB.TABLE_RESULTS.find({}, function (error, items) {
            console.log('results', items);
        });
    }

    loadExercises() {
        var _this = this;

        DB.TABLE_EXERCISES.find({type: _this.props.muscleKey}, function (error, items) {
            console.log('ex', items);

            _this.setState({
                dataSource: _this.state.dataSource.cloneWithRows(items)
            });
        });
    }

    _renderRow(item) {
        return (
            <TouchableNativeFeedback 
                key={item._id} 
                onPress={this.showSingleExercise.bind(this, item._id, item.title)}
                onLongPress={this.showDeleteDialog.bind(this, item._id, item.title)}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    showDeleteDialog(id, title) {
        var _this = this;

        Alert.alert(
            title,
            'Удалить упражнение и все его результаты?',
            [
                {text: 'Отменить', onPress: () => console.log('Cancel Pressed')},
                {text: 'Удалить', onPress: _this.removeExercise.bind(_this, id)}
            ]
        )
    }

    removeExercise(id) {
        var _this = this;

        //TODO: also need to remove results

        DB.TABLE_EXERCISES.remove({_id: id}, {}, function (error, numRemoved) {
            _this.loadExercises();
            _this.render();
        });
    }

    addExercise() {
        if (this.state.newExercise) {
            DB.TABLE_EXERCISES.insert({
                type: this.props.muscleKey,
                title: this.state.newExercise
            });

            this._setModalVisibility(false);

            this.setState({
                newExercise: ''
            });

            this.render();
        }
    }

    _setModalVisibility(visibility) {
        this.setState({isModalVisible: visibility});
    }

    modal() {
        return (
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
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>

                {this.modal()}

                <ToolbarAndroid 
                    title={this.props.muscleNameRus} 
                    titleColor="#FFF" 
                    style={styles.toolbar} />

                <ScrollView style={styles.screenHolder}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow.bind(this)}>
                    </ListView>
                </ScrollView>

                <TouchableNativeFeedback onPress={this._setModalVisibility.bind(this, true)}>
                    <View style={stylesTemp.addButton}>
                        <Image source={require('../../img/ico_plus.png')} style={stylesTemp.buttonIco} />
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
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
}

module.exports = Exercises;