import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    TouchableNativeFeedback,
    ScrollView,
    WebView,
    Image
} from 'react-native';

const styles = StyleSheet.create(require('../global.styles').styles);

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
            '&order=viewCount' +
            '&q=тренировка+' + this.props.exerciseName +
            '&type=video' +
            '&videoDefinition=high' +
            '&maxResults=10' +
            '&key=AIzaSyANKr_sSWG3bq7yQdkSZK63TUrzawIFZqY')
            .then((response) => response.json())
            .then((responseText) => {
                _.forEach(responseText.items, function(value, key) {
                    _this.output.push(
                        <View key={key}>
                            <Text>{value.snippet.title}</Text>
                            <Text>{value.snippet.channelTitle}</Text>
                            <Image
                                style={styles.thumbnail}
                                source={{uri: value.snippet.thumbnails.medium.url}}
                            />
                        </View>
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
                    <ToolbarAndroid title={"О упражнении"} titleColor="#FFF" style={styles.toolbar} />

                    <ScrollView style={styles.container}>
                        <Text style={styles.screenTitle}>{this.props.exerciseName}</Text>

                        {this.output}
                    </ScrollView>
                </View>
            );
        } else {
            this.videoListItem();

            return (
                <View style={{flex: 1}}>
                    <ToolbarAndroid title={"О упражнении"} titleColor="#FFF" style={styles.toolbar} />

                    <ScrollView style={styles.container}>
                        <Text style={styles.screenTitle}>{this.props.exerciseName}</Text>

                        <Text>Loading...</Text>
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