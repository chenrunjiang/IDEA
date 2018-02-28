import React, { Component } from 'react';
import {View, WebView,Dimensions} from 'react-native';

import navigationOptions from '../common/navigation'
let ScreenHeight = Dimensions.get('window').height;

export default class BrowserScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const {data} = navigation.state.params;

        return Object.assign(navigationOptions, {
            title: data.title,

            headerTitleStyle: Object.assign( {
               width: 300,
            }),

        });
    };

    render() {
        let {data,onLoadHtml} = this.props.navigation.state.params;

        return (
            <View style={{backgroundColor:'#f2f2f2', height: ScreenHeight - navigationOptions.headerStyle.height}}>
                <WebView ref={"webView"} source={{uri: data.url}}
                         onMessage={(e)=>{onLoadHtml(e.nativeEvent.data)}}
                         onLoad={()=>{this.refs.webView.injectJavaScript('window.postMessage(document.body.innerHTML)')}}
                         style={{ height:  ScreenHeight - navigationOptions.headerStyle.height}}
                />
            </View>
        )
    }
}
