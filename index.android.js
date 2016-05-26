import React from 'react';

import {
    AppRegistry,
    Component,
    Navigator,
    BackAndroid
} from 'react-native';

import Muscles from './screens/muscles/Muscles.js';
import Exercises from './screens/exercises/Exercises.js';
import SingleExercise from './screens/singleExercise/SingleExercise.js';
import Statistics from './screens/statistics/Statistics.js';
import AboutExercise from './screens/aboutExercise/AboutExercise.js';
import VideoScreen from './screens/videoScreen/VideoScreen.js';

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator.getCurrentRoutes().length === 1) {
        return false;
    }
    _navigator.pop();
    return true;
});

class EasyGym extends Component{
    render() {
        return (
            <Navigator
                initialRoute={{id: 'Muscles'}}
                renderScene={this.navigatorRenderScene}
                configureScene={this.configureScene}
            />
        );
    }

    configureScene(route, routeStack) {
        switch (route.id) {
            case 'Statistics':
            case 'AboutExercise':
            case 'VideoScreen':
                return Navigator.SceneConfigs.FloatFromBottom;
            default:
                return Navigator.SceneConfigs.HorizontalSwipeJump;
        }
    }

    navigatorRenderScene(route, navigator) {
        _navigator = navigator;

        switch (route.id) {
            case 'Muscles':
                return (<Muscles navigator={navigator} />);
            case 'Exercises':
                return (<Exercises navigator={navigator} muscleKey={route.muscleKey} muscleNameRus={route.muscleNameRus} />);
            case 'SingleExercise':
                return (<SingleExercise 
                    navigator={navigator}
                    exerciseID={route.exerciseID}
                    exerciseName={route.exerciseName}
                    muscleKey={route.muscleKey}
                    muscleNameRus={route.muscleNameRus} 
                />);
            case 'Statistics':
                return (<Statistics 
                    navigator={navigator}
                    exerciseID={route.exerciseID}
                    exerciseName={route.exerciseName}
                    muscleKey={route.muscleKey}
                />);
            case 'AboutExercise':
                return (<AboutExercise
                    navigator={navigator}
                    exerciseID={route.exerciseID}
                    exerciseName={route.exerciseName}
                    muscleKey={route.muscleKey}
                />);
            case 'VideoScreen':
                return (<VideoScreen
                    navigator={navigator}
                    videoId={route.videoId}
                />);
        }
    }
}

AppRegistry.registerComponent('EasyGym', () => EasyGym);
