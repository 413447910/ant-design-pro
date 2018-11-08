/* eslint-disable no-param-reassign */
import React, { PureComponent } from 'react';

import {
  Form,
  InputNumber,
  Input,
  Modal,
  Switch,
  Upload,
  Button,
  Icon,
  Select,
  TreeSelect,
  Checkbox,
} from 'antd';

import { buildFormSelectOption, issetParam} from '@/utils/BdHelper';

const FormItem = Form.Item;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;


@Form.create()
class PermissionGroupForm extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onChange = (value) => {
    console.log(value)
  }

  render(){
    const { modalVisible, form, handleAdd, handleModalVisible, formValues,
      isUpdate, handleUpdate, data, hiddenFields} = this.props;

    const {common} = data;

    const defaultOptions = issetParam(common.defaultCheckboxOption) ? common.defaultCheckboxOption : []
    const options = issetParam(common.checkboxOption) ? common.checkboxOption : []

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;

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
        {
          !hiddenFields.includes('name') &&
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="名称">
              {form.getFieldDecorator('name', {
                initialValue: formValues.name || '',
                rules: [{required: true, message: '名称不能为空！'}],
              })(<Input placeholder="请输入名称，如文章" />)}
            </FormItem>
        }

        {
          !hiddenFields.includes('permName') &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="标识">
            {form.getFieldDecorator('permName', {
              initialValue: formValues.permName || '',
              rules: [{required: true, message: '标识不能为空！'}],
            })(<Input placeholder="请输入标识, 如post" />)}
          </FormItem>
        }

        {
          !hiddenFields.includes('permStrArr') &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="权限集">
            {form.getFieldDecorator('permStrArr', {
              initialValue: formValues.permStrArr || defaultOptions,
              rules: [{required: true, message: '标识不能为空！'}],
            })(
              <CheckboxGroup options={options} onChange={this.onChange} />
            )}
          </FormItem>
        }

        {
          !hiddenFields.includes('remark') &&
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="备注">
              {form.getFieldDecorator('remark', {
                initialValue: formValues.remark || '',
                rules: [],
              })(<TextArea rows={2} placeholder="" />)}
            </FormItem>
        }

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="排序">
          {form.getFieldDecorator('rankNum', {
            initialValue: formValues.rankNum || 888,
            rules: [{required: true, message: '排序值为整数！'}],
          })(<InputNumber style={{width: '100%'}} placeholder="升序排列" min={1} />)}
        </FormItem>

        {
          !hiddenFields.includes('isEnable') &&
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="状态">
              {form.getFieldDecorator('isEnable', {
                initialValue: !isUpdate || isUpdate && formValues.isEnable,
                valuePropName: 'checked',
                rules: [],
              })(<Switch checkedChildren="启用" unCheckedChildren="隐藏" />)}
            </FormItem>
        }
      </Modal>
    );
  }
};


export default PermissionGroupForm;
