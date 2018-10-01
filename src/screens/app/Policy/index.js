import React, { Component } from 'react';
import {
    Left,Right,Text,Card,ListItem,CheckBox,View
} from 'native-base'
import {ScrollView} from 'react-native'
import AppTemplate from '../appTemplate'

export default class Policy extends Component {
  render() {
    const nav = this.props.navigation
    return (
        <AppTemplate navigation={nav} name="سياسه الخصوصيه">
                <View style={{flex:1, width:'90%', alignSelf:'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>
                        عند استخدام خدماتنا فانك تاتمنا علي معلوماتك. نحن ندرك  انها مسؤوليه كبيره ونعمل بجديه لحمايه معلوماتك   
                        </Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <Card style={{flex:1,height:300, alignSelf:'center'}}>
                            <ScrollView>
                                <Text style={{padding:20, fontSize:14, color:'#6E6E6E', fontWeight:'bold'}}>
                                                    يجب اتباع أية سياسات تتوفر لك داخل الخدمات.
                                                    لا تسئ استخدام خدماتنا. على سبيل المثال، لا تتدخل في خدماتنا أو تحاول الدخول إليها باستخدام وسيلة بخلاف الواجهة والإرشادات اللتين نقدمهما. يجوز لك أن تستخدم خدماتنا وفقًا لما يسمح به القانون فقط، بما في ذلك القوانين واللوائح السارية للرقابة على التصدير وإعادة التصدير. يجوز أن نعلق أو نوقف تقديم خدماتنا إليك إذا كنت غير ملتزم ببنودنا أو سياساتنا، أو إذا كنا نحقق في شبهات حول إساءة تصرف من جانبك.
                                    لا يمنحك استخدام خدماتنا ملكية أي حق من حقوق الملكية الفكرية في خدماتنا أو المحتوى الذي تدخل إليه. لا يجوز لك استخدام محتوى من خدماتنا إلا بعد الحصول على إذن من مالك المحتوى، أو إذا كان القانون يسمح لك بذلك. وهذه البنود لا تمنحك الحق في استخدام أية علامة تجارية أو شعارات مستخدمة في خدماتنا. لا تزل أو تحجب أو تبدل أي إشعارات قانونية يتم عرضها في خدماتنا أو معها.
                                    تعرض خدماتنا بعض المحتويات التي لا تتبع Google. وتقع مسؤولية هذه المحتويات على عاتق الكيان الذي أتاحها فقط. يجوز لنا مراجعة المحتوى من أجل تحديد ما إذا كان غير شرعي أو مخالفًا لسياساتنا، ويجوز أن نزيل أو نرفض عرض المحتوى الذي نعتقد بشكل معقول أنه مخالف لسياساتنا أو للقانون. ولا يعني هذا بالضرورة أننا نراجع المحتوى، لذا، يرجى عدم افتراض أننا نراجعه.
                                    في ما يتعلق باستخدامك للخدمات، يجوز أن نرسل إليك إعلانات الخدمات ورسائل إدارية ومعلومات أخرى. يمكنك تعطيل بعض تلك المراسلات.
                                    تتوفر بعض خدماتنا على أجهزة الجوّال. ويوصى بعدم استخدام هذه الخدمات بطريقة تشتت انتباهك وتمنعك عن تنفيذك لقوانين المرور أو قواعد السلامة
                                </Text>
                            </ScrollView>
                        </Card>
                    </View>
                    <ListItem style={{borderBottomWidth:0, color:'#6E6E6E', alignSelf:'flex-end',marginRight:10}} >
                        <Left style={{flex:0}} >
                            <Text style={{color:'#6E6E6E'}} >قرات الشروط والاحكام واوفق عليها</Text>
                        </Left>
                        <Right>
                            <CheckBox value={true} />
                        </Right>
                    </ListItem>
                </View>   
        </AppTemplate>
    );
  }
}

const styles = {   
       text:{
        color:'#2A6C91',
        alignSelf:'center',
        fontSize:20,
        textAlign:'right',
        fontWeight:'bold',
        marginRight:5,
        marginTop:10,
        marginBottom:10
       }
   }