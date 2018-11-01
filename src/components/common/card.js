import React, { Component } from 'react';
import { Image, StyleSheet,TouchableOpacity } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { Left, Icon, Right, Card, CardItem, Text, View, Button } from 'native-base';
import Stars from 'react-native-stars';

export default class ListCard extends Component {

	btn() {
		if (this.props.btnText) {
			return (
				<Button iconLeft rounded bordered info>
					<Icon>
						<Image source={this.props.btnIconSrc} />
					</Icon>
					<Text>{this.props.btnText}</Text>
				</Button>
			)
		} else {
			null
		}
	}


	deliveryClock() {
		if (this.props.deliveryTime) {
			return (
				<View style={{ flexDirection: 'column', marginLeft: 5 }}>
					<View style={{ flexDirection: 'row', alignSelf: 'center' }}>
						<Text style={{ color: '#266A8F', fontSize: 20, fontWeight: 'bold' ,fontFamily:'Droid Arabic Kufi'}}>وقت التوصيل</Text>
					</View>
					<View style={{ flexDirection: 'row', alignSelf: 'center' }}>
						<Text note style={{ color: '#707070', fontSize: 15, fontWeight: 'bold' ,fontFamily:'Droid Arabic Kufi'}}>{this.props.deliveryTime}</Text>
					</View>
				</View>
			)
		} else {
			null
		}
	}

	cardRightIcon() {
		if (this.props.rightIcon) {
			return (
				<View style={{ flexDirection: 'column', flex: 0.4, alignSelf: 'center', justifyContent: 'center' }}>
					<AutoHeightImage
						width={this.props.rightIconWidth}
						source={this.props.rightIcon}
						style={{ alignSelf: 'center' }}
					/>
					{/* <Icon style={{ alignSelf: 'center' }}>
            <Image source={this.props.rightIcon} />
          </Icon> */}
				</View>
			)
		} else {
			null
		}
	}
	acceptButton() {
		if (this.props.select) {
			return (
				<Button
				onPress={()=>{this.props.onPressAccept()}} style={{margin:5}} success><Text style={{fontSize: 13,fontFamily:'Droid Arabic Kufi'}}> اختيار </Text></Button>
			)
		}
	}
	ignoreButton() {
		if (this.props.chat) {
			return (
				<Button
				onPress={()=>{this.props.onPressMessage()}}
				 style={{margin:5}} light><Text style={{fontSize: 13,fontFamily:'Droid Arabic Kufi'}}>رسالة</Text></Button>
			)
		}
	}


	StarsComponent() {
		if (this.props.stars) {
			return (
				<Stars
				disabled={true}
					default={2.5}
					count={5}
					half={true}
					starSize={50}
					fullStar={<Icon type='MaterialCommunityIcons' name={'star'} style={[styles.myStarStyle]} />}
					emptyStar={<Icon type='MaterialCommunityIcons' name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
					halfStar={<Icon type='MaterialCommunityIcons' name={'star-half'} style={[styles.myStarStyle]} />}
				/>
			)
		}
	}

	LeftText() {
		if (this.props.Price) {
			return (
				<Text style={{ color: '#CCCCC', fontSize: 23, fontWeight: 'bold' }}>{this.props.Price}</Text>
			)
		}
	}


	render() {
		return (
			<TouchableOpacity activeOpacity={.9} onPress={this.props.onPress}>
				<Card  style={{ flex: 1, borderRadius: 5 }} >
					<CardItem style={{ borderRadius: 5 }}>
					<Text style={{color: '#175a8f', fontSize: 15, fontWeight: 'bold' ,fontFamily:'Droid Arabic Kufi'}}>ريال</Text>
						<Left style={{ flex: 0.5 }} >
							{this.btn()}
							{this.deliveryClock()}
							{this.LeftText()}

						</Left>
						<Right style={{ flex: 1, alignContent: 'flex-end' }}>
							<View style={{ flexDirection: 'row' }}>
								<Text style={{ color: '#175a8f',opacity:.8, fontSize: 20,fontWeight:'bold', fontFamily:'Droid Arabic Kufi' }} >{this.props.header}</Text>
							</View>
							<View style={{width:'140%'}}>
								<Text style={{ color: '#707070', fontSize: 15,fontFamily:'Droid Arabic Kufi', textAlign: "right" }} >{this.props.footer}</Text>
							</View>
							<View style={{ flexDirection: 'row' }}>
								<View style={{ flexDirection: 'column' }}>
									{this.StarsComponent()}
									<View style={{flexDirection:'row'}}>
									{this.acceptButton()}
									{this.ignoreButton()}
									</View>
								</View>

								{/*<View style={{ flexDirection: 'column' }}>*/}
									{/*<Icon type="FontAwesome"  name={this.props.rightIcon? this.props.rightIcon:"map-marker"} style={{ color: 'black', marginLeft: 4 }} />*/}
								{/*</View>*/}
							</View>
						</Right>
						{this.cardRightIcon()}
					</CardItem>
				</Card>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	myStarStyle: {
		color: '#FAC819',
		backgroundColor: 'transparent',
		textShadowColor: 'black',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
	},
	myEmptyStarStyle: {
		color: '#FAC819',
	}
});
