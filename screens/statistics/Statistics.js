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
const statisticsStyles = StyleSheet.create(require('./statistics.styles').styles);

var DB = require('../db').DB;

class Statistics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };

        this.output = [];
    }

    showStatistics() {
        var _this = this;
        var i = 1;

        DB.TABLE_RESULTS.find({exerciseID: _this.props.exerciseID}).sort({date: -1}).exec(function (error, items) {
            if (items.length) {
                _.forEach(items, function(value, key) {
                    _this.output.push(
                        <View key={i} style={statisticsStyles.holder}>
                            <Text style={statisticsStyles.date}>
                                {value.date.substring(6, 8)}/{value.date.substring(4, 6)}/{value.date.substring(0, 4)} 
                            </Text>
                            <Text style={statisticsStyles.text}> {value.results[0][0]}x{value.results[0][1]}</Text>
                            <Text style={statisticsStyles.text}> {value.results[1][0]}x{value.results[1][1]}</Text>
                            <Text style={statisticsStyles.text}> {value.results[2][0]}x{value.results[2][1]}</Text>
                            <Text style={statisticsStyles.text}> {value.results[3][0]}x{value.results[3][1]}</Text>
                            <Text style={statisticsStyles.text}> {value.results[4][0]}x{value.results[4][1]}</Text>
                        </View>
                    );

                    i++;
                });

                _this.setState({
                    loaded: true
                });
            }
        });
    }

    render() {
        if (this.state.loaded) {
            return (
                <View style={{flex: 1}}>
                    <ToolbarAndroid
                        title={"Cтатистика"}
                        subtitle={this.props.exerciseName}
                        titleColor="#FFF"
                        subtitleColor="#FFF"
                        style={styles.toolbar} />

                    <ScrollView style={statisticsStyles.container}>
                        {this.output}
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1}}>{this.showStatistics()}</View>
            );
        }
    }
}

module.exports = Statistics;