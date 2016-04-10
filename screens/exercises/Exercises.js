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

var moduleChest = require('./db/db_chest').Chest;
var moduleLegs = require('./db/db_legs').Legs;
var moduleShoulders = require('./db/db_shoulders').Shoulders;
var moduleBiceps = require('./db/db_biceps').Biceps;

class Exercises extends Component {
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

        var exercises = _.concat(moduleChest, moduleLegs, moduleShoulders, moduleBiceps);

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

    render() {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid title={"EasyGym - " + this.props.muscleNameRus} titleColor="#FFF" style={styles.toolbar} />

                <ScrollView style={styles.screenHolder}>
                    <View>{this.showExercises()}</View>
                </ScrollView>
            </View>
        );
    }
}

module.exports = Exercises;