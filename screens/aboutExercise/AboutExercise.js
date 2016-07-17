import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    TouchableHighlight,
    ScrollView,
    Image,
    ActivityIndicator,
    Linking,
    NetInfo,
    Alert
} from 'react-native';

var _ = require('lodash');

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
            '&q=техника+' + this.props.exerciseName +
            '&type=video' +
            '&videoDefinition=high' +
            '&maxResults=10' +
            '&key=AIzaSyANKr_sSWG3bq7yQdkSZK63TUrzawIFZqY')
            .then((response) => response.json())
            .then((responseText) => {
                _.forEach(responseText.items, function(value, key) {
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
        Linking.openURL('https://www.youtube.com/watch?v=' + videoId).catch(err => console.error('An error occurred', err));
    }

    checkConnection() {
        NetInfo.isConnected.fetch().then(isConnected => {
            if (!isConnected) {
                Alert.alert('Требуется соединение с интернетом');
            }
        });
    }

    render() {
        this.checkConnection();

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
                        <ActivityIndicator />
                    </ScrollView>
                </View>
            );
        }
    }
}

module.exports = AboutExercise;