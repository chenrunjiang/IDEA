import { StackNavigator } from 'react-navigation'
import React from 'react'

import HomeScreen from './Screens/HomeScreen'
import SearchScreen from './Screens/SearchScreen'
import EditScreen from './Screens/EditScreen'
import AddScreen from './Screens/AddScreen'
import FindScreen from "./Screens/FindScreen";
import BrowserScreen from "./Screens/BrowserScreen";

export default StackNavigator({
    Home: { screen: HomeScreen },
    Search: { screen: SearchScreen },
    Add: { screen: AddScreen },
    Edit: { screen: EditScreen },
    Find: { screen: FindScreen },
    Browser: { screen: BrowserScreen },
})
