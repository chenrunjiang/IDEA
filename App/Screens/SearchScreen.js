import React, { Component } from 'react';
import { TextInput, ScrollView } from 'react-native';
import navigationOptions from '../common/navigation'
import realm from '../common/realm'
import Item from '../Components/Item'

export default class SearchScreen extends Component {
    state = { data: SearchScreen.getIdeasSort()};

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return Object.assign({
            title: '',
            headerTitle: <TextInput style={{
                    width: 350,
                    height: 50,
                    color: 'rgba(255,255,255,0.5)',
                }}
                onChangeText={(t)=>params.search(t)}
                selectionColor="rgba(255,255,255,0.8)"
                placeholderTextColor="rgba(255,255,255,0.5)"
                placeholder="搜索想法"
                autoFocus={true}
                underlineColorAndroid='transparent'/>
        }, navigationOptions);
    };

    componentWillMount() {
        this.props.navigation.setParams({
            search: (text) => this.setState({text}),
        });

        realm.addListener('change', () => {
            this.setState({data: SearchScreen.getIdeasSort()});
        })
    }

    render() {
        let ideas = this.state.data||[];
        let text = this.state.text;
        const { navigate } = this.props.navigation;

        return (
            <ScrollView style={{backgroundColor:'#f2f2f2'}}>
                {text?(ideas||[]).map((idea,i) => {
                    if (idea.title.includes(text) || idea.content.includes(text)) {
                        return (<Item data={idea} key={i} navigate={navigate} text={this.state.text} />)
                    } else {
                        return null;
                    }
                }):null}
            </ScrollView>
        )
    }

    static getIdeasSort() {
        return realm.objects('Idea').sorted('update_at', true);
    }
}
