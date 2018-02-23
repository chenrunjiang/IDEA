import { StackNavigator } from 'react-navigation'
import React, { Component } from 'react'
import {  AppRegistry,View } from 'react-native';

import HomeScreen from './Screens/HomeScreen'
import SearchScreen from './Screens/SearchScreen'
import EditScreen from './Screens/EditScreen'
import AddScreen from './Screens/AddScreen'

export default StackNavigator({
    Home: { screen: HomeScreen },
    Search: { screen: SearchScreen },
    Add: { screen: AddScreen },
    Edit: { screen: EditScreen },
})
