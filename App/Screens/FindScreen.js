import React, { Component } from 'react';
import {
    Text, TouchableNativeFeedback, View, Image, ProgressBarAndroid, ScrollView, WebView,
    FlatList
} from "react-native";
import DeviceInfo from 'react-native-device-info'
import {TabNavigator} from "react-navigation";
import {PullView} from 'react-native-pull';

import navigationOptions from "../common/navigation";
import color from "../common/color";
import {flushIcon} from "../common/icon";
import cheerio from 'cheerio-without-node-native';
import Item from "../Components/Item";
import HomeScreen from "./HomeScreen";
import parse_html from "../common/parse_html";
import crawler from "../common/crawler";

const UniqueID = DeviceInfo.getUniqueID();

const navOpt = ({ navigation }) => {
    const params = navigation.state.params || {};

    let opt = Object.assign(navigationOptions, {
        title: '',
        headerStyle: Object.assign({
            elevation: 0,
            height: 80,
        }, navigationOptions.headerStyle),
        headerRight:(
            <TouchableNativeFeedback
                onPress={()=>{}}
                background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.3)', true) }>
                <View style={{
                    padding: 25,
                }}>
                    <Image
                        style={{
                            width: 18,
                            height: 18,
                            opacity: 0.3,
                        }}
                        source={{uri: flushIcon, scale: 3}}/>
                </View>
            </TouchableNativeFeedback>
        ),
    });

    switch (navigation.state.key) {
        case 'Zhihu':
            opt.tabBarLabel = '知乎';
            break;
        default:
            opt.tabBarLabel = navigation.state.key;
    }

    return navigationOptions;
};


class FindScreen extends Component {
    static navigationOptions = navOpt;

    state = {
        data:[],
        refreshing: false,
        ideas: HomeScreen.getIdeasSort()
    };

    render() {
        const { navigate } = this.props.navigation.state.params;

        return (
            <FlatList
                refreshing={this.state.refreshing}
                onRefresh={()=>this.onPullRelease(true)}
                onEndReached={()=>this.onPullRelease()}
                data={this.state.data||[]}
                renderItem={({item}) => (<Item data={item}  navigate={navigate} onLoadHtml={(html)=> this.onLoadHtml(html)} />)}
            />

        )
    }

    onPullRelease(clear=false) {
        if (this.state.refreshing) return;

        this.setState({
            refreshing: true,
        });

        (async () => {
            try {
                let { key } = this.props.navigation.state;

                let res = await fetch('http://207.148.77.45:3000/keyword_random?limit=30&number=2', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ UniqueID }) ,
                });

                let json = await res.json();
                let data = await crawler(key, json.words);

                res = await fetch('http://207.148.77.45:3000/tf-idf_sort', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ data,UniqueID }) ,
                });

                json = await res.json();
                if (clear) {
                    this.state.data = [];
                }
                data = this.state.data.concat(json.data);

                this.setState({
                    data: data,
                    refreshing: false,
                });

            } catch (e) {console.error(e)}
        })();
    }

    onLoadHtml(html) {
        let $ = cheerio.load(html);
        let text;

        switch(this.props.navigation.state.key){
            case 'Zhihu':
                text = $('.RichText').text();
                break;
            case 'Google':
                text = $('body').text();
                break;
            case 'Wikipedia':
                text = $('#content').text();
                break;
        }

        fetch('http://207.148.77.45:3000/tf-idf?limit=3' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content:text.trim(), UniqueID }) ,
        }).then(response => response.json()) .then(result => {console.log(result)})

    }

    parse(html) {
        let { key } = this.props.navigation.state;
        let data = parse_html[key](html);
        this.state.data = this.state.data.concat(data);
    }

    componentDidMount() {
        this.onPullRelease();
    }
}

export default TabNavigator({
    Wikipedia:{
        screen: FindScreen
    },
    Google: {
        screen: FindScreen
    },
    Zhihu: {
        screen: FindScreen
    },

}, {
    tabBarOptions: {
        style: {
            backgroundColor: color.colorPrimary,
            height: 50,
        },
        indicatorStyle: {
            backgroundColor: '#fff',
        },
        upperCaseLabel: false,
    },
});
