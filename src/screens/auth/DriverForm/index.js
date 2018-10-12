import React, { Component } from 'react';
import { Form, Text, Button, Icon, View } from 'native-base';
import AppTemplate from '../appTemplate';
import FormInput from '../../../components/common/input';
import Square from '../../../components/common/square';
import {TouchableOpacity} from 'react-native'
import CarSelected from '../../../assets/images/png/CarSelected.png';
import PickupSelected from '../../../assets/images/png/PickupSelected.png';
import CarUnSelected from '../../../assets/images/png/CarUnSelected.png';
import PickupUnSelected from '../../../assets/images/png/PickupUnSelected.png';


export default class AccountType extends Component {
  constructor(props){
    super(props);
    this.state= {
      pickup:true,
      car:false,
      selected:'pickup'
    }
  }
  render() {
    const nav = this.props.navigation
    return (
      <AppTemplate back={true} navigation={nav} name="البيانات الشخصيه">
        <Form style={{ width: '80%', alignSelf: 'center' }}>
          <FormInput label='الاسم الكامل' />
          <FormInput label='رقم الهاتف' />
          <FormInput label='تاريخ الميلاد' />
          <Text style={{ textAlign: 'right', color: '#266A8F', fontSize: 18,textAlign:'center', marginTop: '2%',fontFamily:'Droid Arabic Kufi' }}>نوع السياره</Text>
        </Form>
        <View style={{ alignItems: 'center' }}>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <View style={{ flexDirection: 'row', width: '80%', alignSelf: 'center', flex: 1 }}>
            <TouchableOpacity activeOpacity={.9} style={{flex: 1, flexDirection: 'column'}} onPress={
              ()=>{
                this.setState({car:false,pickup:true,selected:'pickup'})
              }
            }
            >
              <Square ImgS={PickupSelected} ImgU={PickupUnSelected} status={this.state.pickup} InnerText='بيك أب' width={90} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.9} style={{flex: 1, flexDirection: 'column'}} onPress={
                ()=>{
                  this.setState({car:true,pickup:false,selected:'car'})
                }
              }
              >
              <Square ImgS={CarSelected} ImgU={CarUnSelected} status={this.state.car} InnerText='سيدان' width={90} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
          <Button activeOpacity={.9} iconLeft style={styles.btnBot}>
            <Icon name='add' />
            <Text style={{ fontSize: 18,fontFamily:'Droid Arabic Kufi' }}>ارفق صوره الرخصه</Text>
          </Button>
          <Button activeOpacity={.9} iconLeft style={styles.btnBot}>
            <Icon name='add' />
            <Text style={{ fontSize: 18,fontFamily:'Droid Arabic Kufi' }}>ارفق صوره السياره</Text>
          </Button>
          <Button onPress={
            ()=>{
                nav.navigate('App')

            }
          } activeOpacity={.9}  block style={{ backgroundColor: '#15588D',width:'90%',justfyContent:'center',alignItems:'center',alignSelf:'center' }}>
            <Text style={{ fontSize: 18,fontFamily:'Droid Arabic Kufi' }}>موافق</Text>
          </Button>
        </View>
      </AppTemplate>
    );
  }
}

const styles = {
  btnBot: {
    marginBottom: 10,
    backgroundColor: '#15588D',
    borderRadius: 20,
    alignSelf: 'center',
    paddingRight: '10%',
    paddingLeft: '10%',
  }
}
