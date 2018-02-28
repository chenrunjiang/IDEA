import React, { Component } from 'react';
import { Text, View, TouchableNativeFeedback } from 'react-native';
import color from '../common/color'

export default class Item extends Component {
    render() {
        let {data,navigate,text,onLoadHtml} = this.props;
        let {title, content, url} = data;

        content = (content||'').replace(/\n/g, ' ');

        if (text) {
            title = Item.searchText(title, text);
            content = Item.searchText(content, text);
        }

        return (
            <TouchableNativeFeedback
                onPress={()=>url?navigate("Browser", {data,onLoadHtml}):navigate("Edit", {idea:data})}
                background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.1)', false) }>
                <View style={{
                    marginBottom: 10,
                    padding: 10,
                    backgroundColor: "#fff",
                    elevation: 2,
                }}>
                    <Text numberOfLines={1} style={{
                        color:'#333',
                        fontSize: 16,
                    }}>{title}</Text>

                    <Text style={{
                        color:'#999',
                        fontSize: 11,
                        height: 40,
                    }}>{content}</Text>

                    <Text style={{
                        color:'#ccc',
                        fontSize: 11,
                    }}>{Item.str_date(data.update_at)}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }

    static str_date(date) {
        if (!date || date.constructor !== Date) return date||'';

        let str = '';

        if (new Date().getFullYear() > date.getFullYear()) {
            str += date.getFullYear() + '年';
        }

        str += (date.getMonth() + 1) + '月';
        str += date.getDate() + '日';
        str += ' ' + date.getHours() + ':';
        str += (date.getMinutes()<10?'0':'')+date.getMinutes();

        return str;
    }

    static searchText(s1, s2) {
        let i = s1.indexOf(s2);
        if (i === -1) return s1;

        let str = [];
        str.push(i > 10 ? '... '+s1.substr(i-10, 10) : s1.substr(0, i));
        str.push(<Text style={{color:color.colorPrimary}} key={i}>{s2}</Text>);
        str.push(s1.substr(i+s2.length,s1.length-1));

        return str;
    }
}
