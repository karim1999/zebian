import React, { Component } from "react";
import { Text, View } from "react-native";
import { ListItem, CheckBox } from 'native-base'

export default class ModalListItem extends Component {
    state = {
        isModalVisible: false
    };

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    render() {
        return (
            <ListItem>
                <View style={{ flex: 4, flexDirection: 'column' }}>
                    <Text style={styles.text}>{this.props.text}</Text>
                </View>
                <View style={{ flex: 0.5, flexDirection: 'column', alignItems: 'flex-end' }}>
                    <CheckBox checked={false} />
                </View>
            </ListItem>
        );
    }
}



const styles = {
    text: {
        color: '#7F7F7F',
        fontSize: 15,
        textAlign: 'right'
    }
}

