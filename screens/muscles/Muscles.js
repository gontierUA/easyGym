import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    TouchableNativeFeedback,
    ScrollView,
    ListView
} from 'react-native';

var _ = require('lodash');
const styles = StyleSheet.create(require('../global.styles').styles);
const MUSCLES = require('./db/db_muscles').MUSCLES;

var DB = require('../db').DB;

var DEFAULT_EXERCISES = require('../defaultExercises').DEFAULT_EXERCISES;

class Muscles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        };
    }

    componentDidMount() {
        this.firstLoadActions();

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(MUSCLES)
        });
    }
    
    firstLoadActions() {
        DB.TABLE_INFO.find({'states.isLoaded': true}, function (error, result) {
            if (!result.length) {
                DB.TABLE_INFO.insert({
                    states: {
                        isLoaded: true
                    }
                });
                
                _.forEach(DEFAULT_EXERCISES, function(value, key) {
                    DB.TABLE_EXERCISES.insert(value);
                });
            }
        });
    };

    _renderRow(item) {
        return(
            <TouchableNativeFeedback 
                key={item._id} 
                onPress={this.showGroupExercises.bind(this, item._id, item.title)}>
                
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    title="Мышцы"
                    titleColor="#FFF"
                    style={styles.toolbar} />

                <ScrollView style={styles.screenHolder}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow.bind(this)}>
                    </ListView>
                </ScrollView>
            </View>
        );
    }

    showGroupExercises(muscleKey, muscleNameRus) {
        this.props.navigator.push({
            id: 'Exercises',
            muscleKey: muscleKey,
            muscleNameRus: muscleNameRus
        });
    }
}

module.exports = Muscles;