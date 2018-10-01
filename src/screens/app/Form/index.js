import React, { Component } from 'react';
import{ Form } from 'native-base';
import AppTemplate from '../appTemplate'
import FormInput from '../../../components/common/input'

export default class UserForm extends Component {
  render() {
    const nav = this.props.navigation
    return (
        <AppTemplate navigation={nav} name="البيانات الشخصيه">
            <Form style={{ width: '80%', alignSelf: 'center' }}>
              <FormInput label='الاسم الكامل' />
              <FormInput label='رقم الهاتف' />
              <FormInput label='تاريخ الميلاد' />
            </Form>
        </AppTemplate>
    );
  }
}