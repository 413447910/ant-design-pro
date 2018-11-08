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

import { buildFormSelectOption, getFormSelectOption, getUploadFileId} from '@/utils/BdHelper';

const FormItem = Form.Item;
const { TextArea } = Input;


@Form.create()
class RoleForm extends PureComponent {

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
          !hiddenFields.includes('nameCn') &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="中文名称">
            {form.getFieldDecorator('nameCn', {
              initialValue: formValues.nameCn || '',
              rules: [{required: true, message: '中文名称不能为空！'}],
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
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="应用端名称">
            {form.getFieldDecorator('guardName', {
              initialValue: formValues.guardName || 'api',
              rules: [{required: true, message: '应用端名称不能为空！'}],
            })(<Input placeholder="应用端名称, 如api" />)}
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

        {
          !hiddenFields.includes('permIdArr') &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="权限">
            {form.getFieldDecorator('permIdArr', {
              initialValue: formValues.permIdArr || '',
              rules: [{required: true, message: '权限不能为空！'}],
            })(
              <TreeSelect
                showSearch
                multiple
                style={{width: '100%'}}
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                treeData={treeData}
                allowClear
                placeholder="请选择"
                treeDefaultExpandAll
                treeCheckable={true}
                showCheckedStrategy={TreeSelect.SHOW_ALL}
                onChange={(value) => console.log(value)}
              />
            )}
          </FormItem>
        }
      </Modal>
    );
  }
};


export default RoleForm;
