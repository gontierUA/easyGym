import React from 'react';

import {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    TouchableHighlight,
    ScrollView,
    Image
} from 'react-native';

var _ = require('lodash');

var ProgressBar = require('ProgressBarAndroid');

const styles = StyleSheet.create(require('../global.styles').styles);
const videoStyles = StyleSheet.create(require('./videoExercise.styles').styles);

class AboutExercise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };

        this.output = [];
    }

    videoListItem() {
        var _this= this;

        fetch('https://www.googleapis.com/youtube/v3/search?part=snippet' +
            '&order=relevance' +
            '&q=тренировка+' + this.props.exerciseName +
            '&type=video' +
            '&videoDefinition=high' +
            '&maxResults=10' +
            '&key=AIzaSyANKr_sSWG3bq7yQdkSZK63TUrzawIFZqY')
            .then((response) => response.json())
            .then((responseText) => {
                _.forEach(responseText.items, function(value, key) {
// id.videoId
                    _this.output.push(
                        <TouchableHighlight
                            style={videoStyles.videoCard} 
                            key={key}
                            onPress={_this.showVideoScreen.bind(_this, value.id.videoId)}>
                            <View>
                                <Image
                                    style={videoStyles.thumbnail}
                                    source={{uri: value.snippet.thumbnails.medium.url}}
                                />
                                <View style={videoStyles.textHolder}>
                                    <Text>{value.snippet.channelTitle}</Text>
                                    <Text style={videoStyles.text}>{value.snippet.title}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    );
                });

                _this.setState({
                    loaded: true
                });
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    showVideoScreen(videoId) {
        this.props.navigator.push({
            id: 'VideoScreen',
            videoId: videoId
        });
    }

    render() {
        if (this.state.loaded) {
            return (
                <View style={{flex: 1}}>
                    <ToolbarAndroid
                        title={"Видео"}
                        subtitle={this.props.exerciseName}
                        titleColor="#FFF"
                        subtitleColor="#FFF"
                        style={styles.toolbar} />

                    <ScrollView style={videoStyles.wrapper}>
                        {this.output}
                        <View style={videoStyles.floater}></View>
                    </ScrollView>
                </View>
            );
        } else {
            this.videoListItem();

            return (
                <View style={{flex: 1}}>
                    <ToolbarAndroid
                        title={"Видео"}
                        subtitle={this.props.exerciseName}
                        titleColor="#FFF"
                        subtitleColor="#FFF"
                        style={styles.toolbar} />

                    <ScrollView justifyContent="center" style={videoStyles.wrapper}>
                        <ProgressBar styleAttr="Normal" />
                    </ScrollView>
                </View>
            );
        }
    }
}

module.exports = AboutExercise;