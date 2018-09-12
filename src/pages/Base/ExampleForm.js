/* eslint-disable no-param-reassign */
import React, { PureComponent } from 'react';

import {
  Form,
  InputNumber,
  Input,
  Modal,
  Switch,
  Radio,
  TreeSelect,
} from 'antd';


const FormItem = Form.Item;
const { TextArea } = Input;


@Form.create()
class ExampleForm extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render(){
    const { modalVisible, form, handleAdd, handleModalVisible, formValues,
      isUpdate, handleUpdate} = this.props;

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();

        if(isUpdate){
          fieldsValue.id = formValues.id
          handleUpdate(fieldsValue);
        }else{
          handleAdd(fieldsValue);
        }
      });
    };

    return (
      <Modal
        destroyOnClose
        title="新建"
        width="60%"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="名称">
          {form.getFieldDecorator('name', {
            initialValue: formValues.name || '',
            rules: [{required: true, message: '名称不能为空！'}],
          })(<Input placeholder="" />)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="备注">
          {form.getFieldDecorator('remark', {
            initialValue: formValues.remark || '',
            rules: [],
          })(<TextArea rows={2} placeholder="" />)}
        </FormItem>


        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="排序">
          {form.getFieldDecorator('rankNum', {
            initialValue: formValues.rankNum || 888,
            rules: [{required: true, message: '排序值为整数！'}],
          })(<InputNumber style={{width: '100%'}} placeholder="升序排列" min={1} />)}
        </FormItem>

      </Modal>
    );
  }
};


export default ExampleForm;
