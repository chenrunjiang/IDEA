import React from 'react';
import { StatusBar } from 'react-native';
import color from './color';

let navigationOptions = {
    headerStyle: {
        backgroundColor: color.colorPrimary,
        padding: 15,
        paddingRight: 0,
        paddingLeft: 0,
        paddingTop: StatusBar.currentHeight + 15,
        height: 90,
    },
    headerTintColor: '#fff',
    headerTruncatedBackTitle: "<",
    headerTitleStyle: {
        fontSize: 22,
        fontWeight: '300',
        width: 80,
        color: "rgba(255,255,255,0.8)",
    },
};

export default navigationOptions;
