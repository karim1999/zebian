import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';
export default class App extends Component{
	constructor(props){
		super(props);
		console.disableYellowBox = true;
	}
	render() {
		return (
			<RootNavigation/>
		);
	}
}
