import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  ToolbarAndroid,
  TouchableHighlight,
  TouchableNativeFeedback,
  BackAndroid,
  ScrollView
} from 'react-native';

var Chest = [
  {
    id: 0,
    name: 'Жим лежа',
    type: 'chest'
  },
  {
    id: 1,
    name: 'Жим лежа под углом',
    type: 'chest'
  },
  {
    id: 2,
    name: 'Бабочка',
    type: 'chest'
  }
];


var Legs = [
  {
    id: 1,
    name: 'Приседания (штанга)',
    type: 'legs'
  },
  {
    id: 2,
    name: 'Приседания (гантели)',
    type: 'legs'
  },
  {
    id: 3,
    name: 'Cгибания',
    type: 'legs'
  },
  {
    id: 4,
    name: 'Подъем на носки',
    type: 'legs'
  },
  {
    id: 5,
    name: 'Жим ногами',
    type: 'legs'
  },
  {
    id: 6,
    name: 'Разгибания',
    type: 'legs'
  },
  {
    id: 7,
    name: 'Выпады (гантели)',
    type: 'legs'
  }
];

var Shoulders = [
  {
    id: 1,
    name: 'Жим гантелей над головой',
    type: 'shoulders'
  },
  {
    id: 2,
    name: 'Жим штанги с груди стоя',
    type: 'shoulders'
  },
  {
    id: 3,
    name: 'Разведение гантелей в стороны',
    type: 'shoulders'
  },
  {
    id: 4,
    name: 'Тяга штанги к подбородку',
    type: 'shoulders'
  }
];

class Exercises extends Component {
  showSingleExercise(exerciseName) {
    this.props.navigator.push({
      id: 'SingleExercise',
      exerciseName: exerciseName,
      muscleName: this.props.muscleName
    });
  }

  showExercises() {
  	var exercisesCards = [];
  	var tempExercises;
    var i = 0;
    var _this = this;

    var exercises = _.concat(Chest, Legs, Shoulders);

    tempExercises = _.filter(exercises, ['type', _this.props.muscle]);

    _.forEach(tempExercises, function(value, key) {
	    exercisesCards.push(
        <TouchableNativeFeedback key={i} onPress={_this.showSingleExercise.bind(_this, value.name)}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{value.name}</Text>
          </View>
        </TouchableNativeFeedback>
      );

      i++;
	   });

     return (exercisesCards);
    }

  render() {
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid title={"EasyGym - " + this.props.muscleName} titleColor="#FFF" style={styles.toolbar} />
        
        <ScrollView
            ref={(scrollView) => { _scrollView = scrollView; }}
            automaticallyAdjustContentInsets={false}
            scrollEventThrottle={200}>

          <View>
             {this.showExercises()}
          </View>

         </ScrollView>
       </View>
    );
  }
};

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#0091EA',
    height: 56,
  },
  card: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 1
  },
  cardTitle: {
    fontSize: 15,
    color: '#000'
  },
  cardTextHolder: {
    paddingTop: 16
  },
  cardText: {
    fontSize: 16,
    lineHeight: 25,
    color: '#777'
  },
   resizeMode: {
    width: 90,
    height: 60,
    borderWidth: 0.5,
    borderColor: 'black'
  }
});

module.exports = Exercises;