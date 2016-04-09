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

var _ = require('lodash');

const muscleGroups = {
  'chest': {
  	name: 'Грудь'
  }, 
  'biceps': {
  	name: 'Бицепс'
  }, 
  'back': {
  	name: 'Спина'
  }, 
  'triceps': {
  	name: 'Трицепс'
  }, 
  'legs': {
  	name: 'Ноги'
  }, 
  'shoulders': {
  	name: 'Плечи'
  }
};

class Muscles extends Component {	
  showGroupExercises(muscleType, muscleName) {
    this.props.navigator.push({
      id: 'Exercises',
      muscle: muscleType,
      muscleName: muscleName
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
        <ToolbarAndroid title="EasyGym - Мышцы" titleColor="#FFF" style={styles.toolbar} />
        
        <ScrollView
            ref={(scrollView) => { _scrollView = scrollView; }}
            automaticallyAdjustContentInsets={false}
            scrollEventThrottle={200}>

          <View>
            {this.printMuscleGroupsCards()}
          </View>

         </ScrollView>
       </View>
    );
  }
}

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


module.exports = Muscles;