import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';
export default class App extends Component{
	constructor(props){
		super(props);
		console.disableYellowBox = true;
		const ReactNative = require('react-native');
try {
    ReactNative.I18nManager.allowRTL(false);
} catch (e) {
    alert(e);
}

	}
	render() {
		return (
			<RootNavigation/>
		);
	}
}
