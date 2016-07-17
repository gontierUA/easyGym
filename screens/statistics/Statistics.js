import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    TouchableNativeFeedback,
    ScrollView,
    ListView
} from 'react-native';

var _ = require('lodash');

const styles = StyleSheet.create(require('../global.styles').styles);
const statisticsStyles = StyleSheet.create(require('./statistics.styles').styles);

var DB = require('../db').DB;

class Statistics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
        };

        this.loadStatistics();
    }

    loadStatistics() {
        var _this = this;

        DB.TABLE_RESULTS.find({exerciseID: _this.props.exerciseID}).sort({date: -1}).exec(function (error, items) {
            _this.setState({
                dataSource: _this.state.dataSource.cloneWithRows(items)
            });
        });
    }

    _renderRow(item) {
        return (
            <View style={statisticsStyles.holder}>
                <Text style={statisticsStyles.date}>
                    {item.date.substring(6, 8)}/{item.date.substring(4, 6)}/{item.date.substring(2, 4)}
                </Text>
                <Text style={statisticsStyles.text}>{item.results[0][0]}x{item.results[0][1]}</Text>
                <Text style={statisticsStyles.text}>{item.results[1][0]}x{item.results[1][1]}</Text>
                <Text style={statisticsStyles.text}>{item.results[2][0]}x{item.results[2][1]}</Text>
                <Text style={statisticsStyles.text}>{item.results[3][0]}x{item.results[3][1]}</Text>
                <Text style={statisticsStyles.text}>{item.results[4][0]}x{item.results[4][1]}</Text>
            </View>
        );
    }

    _renderHeader() {
        return(
            <View style={statisticsStyles.header}>
                <Text style={statisticsStyles.title}>{this.props.exerciseName}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    title={"Cтатистика"}
                    titleColor="#FFF"
                    style={styles.toolbar} />

                <ScrollView style={statisticsStyles.screenHolder}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderHeader={this._renderHeader.bind(this)}
                        renderRow={this._renderRow.bind(this)}>
                    </ListView>
                </ScrollView>
            </View>
        );
    }
}

module.exports = Statistics;