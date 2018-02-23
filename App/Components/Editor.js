import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import color from '../common/color'

export default class EditScreen extends Component {
    render() {
        let { idea, onTitleChange, onContentChange } = this.props;

        idea = idea || {};

        return (
            <View style={{
            }}>
                <TextInput style={{
                        minHeight: 80,
                        height: '10%',
                        fontSize: 20,
                        marginLeft: 15,
                        marginRight: 15,
                        borderBottomWidth:1,
                        borderColor: '#ccc',
                    }}
                    placeholder={"标题"}
                    selectionColor={color.colorPrimary}
                    underlineColorAndroid='transparent'
                    onChangeText={(text)=>onTitleChange&&onTitleChange(text)}
                    defaultValue={idea.title} />

                <TextInput style={{
                        minHeight: 200,
                        height: '90%',
                        marginLeft: 15,
                        marginRight: 15,
                        textAlignVertical: 'top',
                        color: '#666',
                    }}
                    selectionColor={color.colorPrimary}
                    ref={'content'}
                    placeholder={"内容"}
                    onChangeText={(text)=>onContentChange&&onContentChange(text)}
                    underlineColorAndroid='transparent'
                    multiline={true}
                    defaultValue={idea.content} />
            </View>
        )
    }
}
