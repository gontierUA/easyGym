import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    TouchableNativeFeedback,
    ScrollView
} from 'react-native';

var _ = require('lodash');
const styles = StyleSheet.create(require('../global.styles').styles);
const muscleGroups = require('./db/db_muscles').Muscles;

class Muscles extends Component {
    showGroupExercises(muscleKey, muscleNameRus) {
        this.props.navigator.push({
            id: 'Exercises',
            muscleKey: muscleKey,
            muscleNameRus: muscleNameRus
        });
    }

    printMuscleGroupsCards() {
        var muscleGroupsCards = [];
        var _this = this;

        _.forEach(muscleGroups, function(value, key) {
            muscleGroupsCards.push(
                <TouchableNativeFeedback key={key} onPress={_this.showGroupExercises.bind(_this, key, value.name)}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{value.name}</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        });

        return (muscleGroupsCards);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid title="Мышцы" titleColor="#FFF" style={styles.toolbar} />

                <ScrollView style={styles.screenHolder}>
                    <View>{this.printMuscleGroupsCards()}</View>
                </ScrollView>
            </View>
        );
    }
}

module.exports = Muscles;