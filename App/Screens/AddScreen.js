import React, { Component } from 'react';
import { View, TouchableNativeFeedback, Image } from 'react-native';

import Editor from '../Components/Editor'

import realm from '../common/realm'
import {rmIcon} from '../common/icon'
import navigationOptions from '../common/navigation'
import DeviceInfo from 'react-native-device-info'

// const UniqueID = DeviceInfo.getUniqueID();

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
        return (
            <View style={{backgroundColor:'#f2f2f2'}}>
                <Editor
                    onTitleChange={(t)=>this.titleChange(t)}
                    onContentChange={(t)=>this.contentChange(t)} />
            </View>
        )
    }

    componentWillMount() {
        this.props.navigation.setParams({
            rm: () => {
                let { goBack } = this.props.navigation;

                if (this.idea) {
                    realm.write(()=>{
                        realm.delete(this.idea);
                        goBack();
                    });
                }
            },
        });
    }

    titleChange(text) {
        realm.write(()=> {
            if (!this.idea) {
                this.idea = realm.create('Idea', {
                    title: text,
                    content:'',
                    create_at: new Date(),
                    update_at: new Date(),
                }, true);
            } else {
                this.idea.title = text;
            }
            this.update_td_idf();
        })
    }

    contentChange(text) {
        realm.write(()=> {
            if (!this.idea) {
                this.idea = realm.create('Idea', {
                    title: '',
                    content: text,
                    create_at: new Date(),
                    update_at: new Date(),
                }, true);
            } else {
                this.idea.content = text;
            }

            this.update_td_idf();
        })
    }

    update_td_idf() {
        let { idea } = this.props;

        if (idea) {
            fetch('http://207.148.77.45:3000/tf-idf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({content:idea.content.trim(), UniqueID }) ,
            }).then(response => response.json()) .then(result => {console.log(result)})
        }
    }

}
