import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    TouchableHighlight,
    ScrollView,
    WebView,
    Image
} from 'react-native';

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

    videoListItem(items) {
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



                    _this.output.push(
                        <TouchableHighlight style={videoStyles.videoCard} key={key}>
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

                // responseText.items

                // id.videoId
                // snippet.title
                // thumbnails.medium.url (320x180)
                // snippet.channelTitle

            })
            .catch((error) => {
                console.warn(error);
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

// <WebView
//     style={styles.video}
//     source={{
//                             uri: 'https://www.youtube.com/results?search_query=тренировка+' + this.props.exerciseName
//                         }}
//     javaScriptEnabled={true}
// />

module.exports = AboutExercise;