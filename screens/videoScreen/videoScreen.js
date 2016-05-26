import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    ScrollView,
    WebView
} from 'react-native';

import Dimensions from 'Dimensions';

const styles = StyleSheet.create(require('../global.styles').styles);

class VideoScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    title={"Видео"}
                    subtitle={this.props.exerciseName}
                    titleColor="#FFF"
                    subtitleColor="#FFF"
                    style={styles.toolbar} />

                <ScrollView>
                    <WebView
                        style={styles.video}
                        source={{
                            html: '<iframe ' +
                             'width="' + (Dimensions.get('window').height - 56) + '" ' +
                             'height="' + (Dimensions.get('window').height - 90) + '" ' +
                             'src="https://www.youtube.com/embed/' + this.props.videoId + '" frameborder="0"></iframe>'
                        }}
                        automaticallyAdjustContentInsets={true}
                    />
                </ScrollView>
            </View>
        );
    }
}

module.exports = VideoScreen;