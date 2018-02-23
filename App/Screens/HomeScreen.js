import React, { Component } from 'react';
import { Text, View, StatusBar, Image, ScrollView, TouchableNativeFeedback} from 'react-native';

import {searchIcon,addIcon,netIcon} from '../common/icon'
import navigationOptions from '../common/navigation'
import realm from '../common/realm'

import Item from '../Components/Item'

export default class HomeScreen extends Component {
    state = { data: this.getIdeasSort()}

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return Object.assign({
            title: 'IDEA',
            headerRight:(
                <TouchableNativeFeedback
                    onPress={()=>params.toSearchScreen()}
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
                            source={{uri: searchIcon, scale: 3}}/>
                    </View>
                </TouchableNativeFeedback>
            ),
        }, navigationOptions);
    };

    componentWillMount() {
        const { navigate } = this.props.navigation;

        this.props.navigation.setParams({
            toSearchScreen: () => navigate('Search'),
        });

        realm.addListener('change', () => {
            this.setState({data: this.getIdeasSort()});
        })
    }

    render() {
        const { navigate } = this.props.navigation;
        const { data } = this.state;

        return (
            <View style={{height:'100%',backgroundColor:'#f2f2f2'}}>
                <StatusBar
                    backgroundColor={'rgba(0,0,0,.15)'}
                    translucent={true} />

                <ScrollView>
                    {(data||[]).map((idea,i) => (<Item data={idea} key={i} navigate={navigate} />))}
                </ScrollView>

                <View style={{
                        padding: 15,
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        alignItems:'center'
                    }}>

                    <TouchableNativeFeedback
                        onPress={()=>navigate("Add",{})}
                        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.3)', true) }>
                        <View>
                            <Image style={{
                                    width: 60,
                                    height: 60,
                                    marginBottom: 10,
                                }}
                                source={{uri: netIcon, scale: 3}}/>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback
                        onPress={()=>navigate("Add",{})}
                        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.3)', true) }>
                        <View>
                            <Image style={{
                                    width: 45,
                                    height: 45,
                                }}
                                source={{uri: addIcon, scale: 3}}/>
                        </View>
                    </TouchableNativeFeedback>

                </View>
            </View>
        );
    }

    getIdeasSort() {
        return realm.objects('Idea').sorted('update_at', true);
    }
}
