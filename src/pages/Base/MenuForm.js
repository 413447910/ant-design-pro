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
class MenuForm extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render(){
    const { modalVisible, form, handleAdd, handleModalVisible, formValues,
      isUpdate, handleUpdate, menuTree } = this.props;

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
        
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="菜单">
          {form.getFieldDecorator('isMenu', {
            initialValue: formValues.isMenu || '1',
          })(
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="1">是</Radio.Button>
              <Radio.Button value="0">否</Radio.Button>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="父级">
          {form.getFieldDecorator('parentId', {
            initialValue: formValues.parentId || '0-0',
            rules: [{required: true, message: '父级不能为空！'}],
          })(
            <TreeSelect
              showSearch
              style={{width: '100%'}}
              dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
              treeData={menuTree}
              allowClear
              placeholder="Please select"
              treeDefaultExpandAll
              onChange={(value) => console.log(value)}
            />
          )}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="标题">
          {form.getFieldDecorator('name', {
            initialValue: formValues.name || '',
            rules: [{required: true, message: '标题不能为空！'}],
          })(<Input placeholder="" />)}
        </FormItem>


        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="图标">
          {form.getFieldDecorator('icon', {
            initialValue: formValues.icon || '',
            rules: [{required: true, message: '图标不能为空！'}],
          })(<Input placeholder="如 form" />)}
        </FormItem>
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="规则">
          {form.getFieldDecorator('path', {
            initialValue: formValues.path || '',
            rules: [{required: true, message: '规则不能为空！'}],
          })(<Input placeholder="父级菜单无需匹配控制器和方法,子级菜单请使用控制器名" />)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="组件">
          {form.getFieldDecorator('componentPath', {
            initialValue: formValues.componentPath || '',
          })(<Input placeholder="父级菜单无需组件,子级菜单请填写组件对应路径" />)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="排序">
          {form.getFieldDecorator('rankNum', {
            initialValue: formValues.rankNum || 888,
            rules: [{required: true, message: '排序值为整数！'}],
          })(<InputNumber style={{width: '100%'}} placeholder="升序排列" min={1} />)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="规则条件">
          {form.getFieldDecorator('menuCondition', {
            initialValue: formValues.menuCondition || '',
            rules: [],
          })(<TextArea rows={2} placeholder="" />)}
        </FormItem>

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="备注">
          {form.getFieldDecorator('remark', {
            initialValue: formValues.remark || '',
            rules: [],
          })(<TextArea rows={2} placeholder="" />)}
        </FormItem>


        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="状态">
          {form.getFieldDecorator('status', {
            initialValue: !isUpdate || isUpdate && formValues.status,
            valuePropName: 'checked',
            rules: [],
          })(<Switch checkedChildren="启用" unCheckedChildren="隐藏" />)}
        </FormItem>
      </Modal>
    );
  }
};


export default MenuForm;
