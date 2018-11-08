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
} from 'antd';

import { buildFormSelectOption, getFormSelectOption} from '@/utils/BdHelper';

const FormItem = Form.Item;
const { TextArea } = Input;


@Form.create()
class PermissionForm extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    const { modalVisible, form, handleAdd, handleModalVisible, formValues,
      isUpdate, handleUpdate, data, hiddenFields} = this.props;

    const {treeData, common} = data;



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
          !hiddenFields.includes('groupId') &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="所属组">
            {form.getFieldDecorator('groupId', {
              initialValue: getFormSelectOption(common, formValues.groupId) || '',
              rules: [{required: true, message: '所属组不能为空！'}],
            })(
              <Select
                showSearch
                placeholder='请选择'
                style={{width: '100%'}}
                filterOption={false}
              >
                {buildFormSelectOption(common)}
              </Select>
            )}
          </FormItem>
        }

        {
          !hiddenFields.includes('nameCn') &&
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="名称">
              {form.getFieldDecorator('nameCn', {
                initialValue: formValues.nameCn || '',
                rules: [{required: true, message: '名称不能为空！'}],
              })(<Input placeholder="" />)}
            </FormItem>
        }
        {
          !hiddenFields.includes('name') &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="标识">
            {form.getFieldDecorator('name', {
              initialValue: formValues.name || '',
              rules: [{required: true, message: '标识不能为空！'}],
            })(<Input placeholder="" />)}
          </FormItem>
        }
        {
          !hiddenFields.includes('guardName') &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="应用端">
            {form.getFieldDecorator('guardName', {
              initialValue: formValues.guardName || 'api',
              rules: [{required: true, message: '应用端不能为空！'}],
            })(<Input placeholder="应用端，如api" />)}
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


export default PermissionForm;
