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

var DB = require('../db').DB;

const DEFAULT_EXERCISES = [
    {
        _id: 'default_1',
        type: 'chest',
        title: 'Жим лежа в Смите'
    },
    {
        _id: 'default_2',
        type: 'chest',
        title: 'Жим лежа под наклоном в Смите'
    },
    {
        _id: 'default_3',
        type: 'chest',
        title: 'Бабочка'
    },
    {
        _id: 'default_4',
        type: 'chest',
        title: 'Жим в хаммере'
    },
    {
        _id: 'default_5',
        type: 'chest',
        title: 'Разведение гантелей'
    },
    {
        _id: 'default_6',
        type: 'chest',
        title: 'Брусья'
    },
    {
        _id: 'default_7',
        type: 'chest',
        title: 'Жим лежа'
    },
    {
        _id: 'default_8',
        type: 'chest',
        title: 'Жим лежа под наклоном'
    },
    {
        _id: 'default_9',
        type: 'biceps',
        title: 'Подъем штанги на бицепс'
    },
    {
        _id: 'default_10',
        type: 'biceps',
        title: 'Молоток'
    },
    {
        _id: 'default_11',
        type: 'biceps',
        title: 'Подъем гантели на бицепс'
    },
    {
        _id: 'default_12',
        type: 'biceps',
        title: 'Скамья Скотта'
    },
    {
        _id: 'default_13',
        type: 'back',
        title: 'Тяга гантели в наклоне'
    },
    {
        _id: 'default_14',
        type: 'back',
        title: 'Тяга штанги в наклоне'
    },
    {
        _id: 'default_15',
        type: 'back',
        title: 'Подтягивания'
    },
    {
        _id: 'default_16',
        type: 'back',
        title: 'Становая'
    },
    {
        _id: 'default_17',
        type: 'back',
        title: 'Наклоны с штангой'
    },
    {
        _id: 'default_18',
        type: 'back',
        title: 'Тяга вертикального блока'
    },
    {
        _id: 'default_19',
        type: 'back',
        title: 'Тяга блока к поясу'
    },
    {
        _id: 'default_20',
        type: 'triceps',
        title: 'Жим узким хватом'
    },
    {
        _id: 'default_21',
        type: 'triceps',
        title: 'Французкий жим'
    },
    {
        _id: 'default_22',
        type: 'triceps',
        title: 'Брусья'
    },
    {
        _id: 'default_23',
        type: 'triceps',
        title: 'Отжимания от пола'
    },
    {
        _id: 'default_24',
        type: 'triceps',
        title: 'Канатик'
    },
    {
        _id: 'default_25',
        type: 'triceps',
        title: 'Французкий жим гантели'
    },
    {
        _id: 'default_26',
        type: 'triceps',
        title: 'Разгибание одной рукой'
    },
    {
        _id: 'default_27',
        type: 'shoulders',
        title: 'Жим гантелей над головой'
    },
    {
        _id: 'default_28',
        type: 'shoulders',
        title: 'Жим штанги с груди стоя'
    },
    {
        _id: 'default_29',
        type: 'shoulders',
        title: 'Махи гантелей в стороны'
    },
    {
        _id: 'default_30',
        type: 'shoulders',
        title: 'Тяга штанги к подбородку'
    },
    {
        _id: 'default_31',
        type: 'legs',
        title: 'Приседания со штангой'
    },
    {
        _id: 'default_32',
        type: 'legs',
        title: 'Приседания с гантелями'
    },
    {
        _id: 'default_33',
        type: 'legs',
        title: 'Выпады с гантелями'
    },
    {
        _id: 'default_34',
        type: 'legs',
        title: 'Сгибания'
    },
    {
        _id: 'default_35',
        type: 'legs',
        title: 'Разгибания'
    },
    {
        _id: 'default_36',
        type: 'legs',
        title: 'Подъем на носки'
    },
    {
        _id: 'default_37',
        type: 'legs',
        title: 'Жим ногами'
    }
];

class Muscles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalVisible: false
        };

       // TABLE_INFO.remove({}, { multi: true });
       // TABLE_EXERCISES.remove({}, { multi: true });
        
        this.firstLoadActions();
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