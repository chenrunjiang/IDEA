import React, { Component } from 'react';
import { View, TouchableNativeFeedback, Image, Alert } from 'react-native';

import navigationOptions from '../common/navigation'
import realm from '../common/realm'
import {rmIcon} from '../common/icon'

import Editor from '../Components/Editor'
import DeviceInfo from 'react-native-device-info'
const UniqueID = DeviceInfo.getUniqueID();

export default class EditScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const {rm} = navigation.state.params;

        return Object.assign({
            title: '',
            headerRight:(
                <TouchableNativeFeedback
                    onPress={()=>rm()}
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
                            source={{uri: rmIcon, scale: 3}}/>
                    </View>
                </TouchableNativeFeedback>
            ),
        }, navigationOptions);
    };

    render() {
        let {idea} = this.props.navigation.state.params;

        return (
            <View style={{backgroundColor:'#f2f2f2'}}>
                <Editor idea={idea}
                    onTitleChange={(t)=>this.titleChange(t)}
                    onContentChange={(t)=>this.contentChange(t)}
                />
            </View>
        )
    }

    componentWillMount() {
        this.props.navigation.setParams({
            rm: () => {
                Alert.alert('删除想法','确定要删除这条想法？',
                    [{text: '取消'},{text:"是的", onPress:() => {
                        let { idea } = this.props.navigation.state.params;
                        let { goBack } = this.props.navigation;

                        realm.write(()=>{
                            realm.delete(idea);
                            goBack();
                        });
                    }}]
                );
            },
        });
    }

    titleChange(text) {
        let {idea} = this.props.navigation.state.params;

        realm.write(() => {
            idea.title = text;
            idea.update_at = new Date();
            this.update_td_idf();
        });
    }

    contentChange(text) {
        let {idea} = this.props.navigation.state.params;

        realm.write(() => {
            idea.content = text;
            idea.update_at = new Date();
            this.update_td_idf();
        });
    }

    update_td_idf() {
        let {idea} = this.props.navigation.state.params;

        if (idea) {
            fetch('http://207.148.77.45:3000/tf-idf', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({content:idea.content.trim(), UniqueID }) ,
            }).then(response => response.text()) .then(result => {console.log(result)})
        }

    }
}
