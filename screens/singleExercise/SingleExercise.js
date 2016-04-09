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
  ScrollView,
  TextInput
} from 'react-native';

const Realm = require('realm');

class SingleExercise extends Component {
  getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd < 10) {
        dd = '0' + dd
    } 

    if(mm < 10) {
        mm = '0' + mm
    } 

    today = dd + mm + yyyy;

    return today;
  }


  render() {
    const ExerciseResults = {
      name: 'ExerciseResults', 
      properties: {
        weight_1: {type: 'string', default: '0'},
        reps_1: {type: 'string', default: '0'},
        weight_2: {type: 'string', default: '0'},
        reps_2: {type: 'string', default: '0'},
        weight_3: {type: 'string', default: '0'},
        reps_3: {type: 'string', default: '0'},
        weight_4: {type: 'string', default: '0'},
        resp_4: {type: 'string', default: '0'},
        weight_5: {type: 'string', default: '0'},
        resps_5: {type: 'string', default: '0'},
      }
    };

    const TotalResults = {
      name: 'TotalResults', 
      properties: {
        id: 'string', // workout date
        muscle: 'string',
        exerciseID: 'int',
        results: 'ExerciseResults'
      }
    };

    let realm = new Realm({schema: [ExerciseResults, TotalResults], schemaVersion: 1});

  // let realm = new Realm({
  //    schema: [{
  //     name: 'Results', 
  //     properties: {
  //       id: 'string', // workout date
  //       muscle: 'string',
  //       exerciseID: 'int',
  //       result_1:
  //     }
  //   }]
  // });

   // realm.write(() => {
   //   realm.create('TotalResults', {
   //    id: '1111',
   //    muscle: 'muscle1',
   //    exerciseID: 1,
   //    results: {
   //      'result_1': 'testresult',
   //      'result_2': 'testresult',
   //    }
   //  });
   // });

   realm.write(() => {
    let allResults = realm.objects('TotalResults');
    realm.delete(allResults);
   });

   console.log(realm.objects('TotalResults'));

    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid title={"EasyGym - " + this.props.muscleName} titleColor="#FFF" style={styles.toolbar} />
        
        <ScrollView
            ref={(scrollView) => { _scrollView = scrollView; }}
            automaticallyAdjustContentInsets={false}
            scrollEventThrottle={200}
            style={styles.container}>

            <Text style={styles.title}>{this.props.exerciseName} {this.getCurrentDate()}</Text>

          <View style={styles.resultsHolder}>
          	<TextInput style={styles.resultsInput} keyboardType="numeric" />
		  	    <Text style={styles.separator}>x</Text>
		  	    <TextInput style={styles.resultsInput} keyboardType="numeric" />
          </View>

          <View style={styles.resultsHolder}>
          	<TextInput style={styles.resultsInput} keyboardType="numeric" />
		  	    <Text style={styles.separator}>x</Text>
		  	    <TextInput style={styles.resultsInput} keyboardType="numeric" />
          </View>

          <View style={styles.resultsHolder}>
          	<TextInput style={styles.resultsInput} keyboardType="numeric" />
		  	    <Text style={styles.separator}>x</Text>
		  	    <TextInput style={styles.resultsInput} keyboardType="numeric" />
          </View>

          <View style={styles.resultsHolder}>
          	<TextInput style={styles.resultsInput} keyboardType="numeric" />
		  	    <Text style={styles.separator}>x</Text>
		  	    <TextInput style={styles.resultsInput} keyboardType="numeric" />
          </View>

          <View style={styles.resultsHolder}>
          	<TextInput style={styles.resultsInput} keyboardType="numeric" />
		  	    <Text style={styles.separator}>x</Text>
		  	    <TextInput style={styles.resultsInput} keyboardType="numeric" />
          </View>

          <TouchableHighlight onPress={this._onPressButton} style={styles.button}>
            <Text style={styles.buttonText}>SAVE</Text>
          </TouchableHighlight>
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
  },
  resultsHolder: {
  	flexDirection: 'row',
  	alignItems: 'center'
  },
  resultsInput: {
  	height: 60,
  	width: 60,
  	borderColor: 'gray',
  	borderWidth: 1,
    fontSize: 18,
    padding: 10
  },
  separator: {
    fontSize: 21,
    color: 'black'
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Roboto'
  },
  container: {
    padding: 20
  },
  button: {
    width: 100,
    padding: 10,
    backgroundColor: '#0091EA',
    alignSelf: 'flex-end',
    marginTop: 20,
    marginBottom: 40
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF'
  }
});

module.exports = SingleExercise;