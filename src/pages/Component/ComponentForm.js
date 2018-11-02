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
  Card,
  Row,
  Col,
} from 'antd';

import moment from 'moment';

import { buildFormSelectOption, getFormSelectOption, getUploadFileId} from '@/utils/BdHelper';

const FormItem = Form.Item;
const { TextArea } = Input;



@Form.create()
class ComponentForm extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  firstLetterUpper = str => {
    return str.charAt(0).toUpperCase()+str.slice(1);
  }

  toLower = str => {
   return str.toLowerCase()
  }

  // 组件名称更新
  handleComponentNameChange = (e) => {
    const { form } = this.props;
    const {value} = e.target
    const firstUpName = this.firstLetterUpper(value);
    const lower = this.toLower(value);

    form.setFieldsValue({'componentName': firstUpName})
    form.setFieldsValue({'backendComponentName': firstUpName})

    form.setFieldsValue({'routePrefix': lower})

    form.setFieldsValue({'menuParam': `menu.beidou.${firstUpName}`})
    form.setFieldsValue({'pageSubFolderName': firstUpName})
    form.setFieldsValue({'backendSubFolderName': firstUpName})

  }

  // 子目录更新
  handleSubPathChange = (e) => {
    const { form } = this.props;
    const {value} = e.target

    const firstUpName = this.firstLetterUpper(value);

    form.setFieldsValue({'pageSubFolderName': firstUpName})
    form.setFieldsValue({'backendSubFolderName': firstUpName})
  }


  render(){
    const { modalVisible, form, handleAdd, handleModalVisible, formValues,
      isUpdate, handleUpdate} = this.props;

    const {
      form: { getFieldDecorator},
    } = this.props;

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();

        console.log(fieldsValue)
        return

        if(isUpdate){
          fieldsValue.id = formValues.id
          handleUpdate(fieldsValue);
        }else{
          handleAdd(fieldsValue);
        }
      });
    };


    const formItemLayout = {
      labelCol: {
        md: { span: 6 },
      },
      wrapperCol: {
        md: { span: 12 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    const fileColumns = [
      {
        title: '编号',
        dataIndex: 'id',
        width: '5%',
      },
      {
        title: '名称',
        dataIndex: 'name',
        width: '10%',
      },
      {
        title: '模版源文件',
        dataIndex: 'srcFile',
      },
      {
        title: '目标文件',
        dataIndex: 'targetFile',
        width: '40%',
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
    ];

    return (
      <Modal
        destroyOnClose
        title="新建组件"
        width="90%"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
        <Card title="参数信息" bordered={false} gutter={12}>
          <Row>
            <Col md={12}>
              <Card title="前端基本信息">
                <FormItem {...formItemLayout} label="前台模版类型">
                  {form.getFieldDecorator('pageTemplateType', {
                    initialValue: 'basic',
                    rules: [],
                  })(
                    <Select
                      showSearch
                      placeholder='请选择'
                      style={{width: '100%'}}
                      filterOption={false}
                    >
                      <Select.Option value="basic">basic</Select.Option>
                      <Select.Option value="subset">subset</Select.Option>
                    </Select>
                  )}
                </FormItem>

                <FormItem {...formItemLayout} label="项目路径">
                  {getFieldDecorator('projectPath', {
                    initialValue: '/Users/fangfei/work/www/beidou',
                  })(<Input placeholder="" disabled={true} />)}
                </FormItem>
                <FormItem {...formItemLayout} label="组件名称">
                  {getFieldDecorator('componentName', {
                    initialValue: 'ExampleBasic',
                    rules: [{required: true, message: '组件名称不能为空！'}],
                  })(<Input placeholder="组件名称, 如ExampleBasic" onChange={this.handleComponentNameChange} />)}
                </FormItem>

                <FormItem {...formItemLayout} label="子目录">
                  {getFieldDecorator('pageSubFolderName', {
                    initialValue: 'Example',
                    rules: [{required: true, message: '页面子目录不能为空！'}],
                  })(<Input placeholder="页面子目录, 如Example" onChange={this.handleSubPathChange} />)}
                </FormItem>

                <FormItem {...formItemLayout} label="路由前缀">
                  {getFieldDecorator('routePrefix', {
                    initialValue: 'example/basic',
                    rules: [{required: true, message: '路由前缀不能为空！'}],
                  })(<Input placeholder="路由前缀, 如example/basic" />)}
                </FormItem>

                <FormItem {...formItemLayout} label="菜单变量">
                  {getFieldDecorator('menuParam', {
                    initialValue: 'menu.beidou.ExampleBasic',
                    rules: [{required: true, message: '表单组件名不能为空！'}],
                  })(<Input placeholder="菜单变量, 如menu.beidou.ExampleBasic" />)}
                </FormItem>

                <FormItem {...formItemLayout} label="菜单中文名">
                  {getFieldDecorator('menuParamTextCn', {
                    initialValue: '基本模版',
                    rules: [{required: true, message: '菜单中文名不能为空！'}],
                  })(<Input placeholder="菜单中文名, 如component" />)}
                </FormItem>
              </Card>
            </Col>

            <Col md={12}>
              <Card title="后端基本信息">
                <FormItem {...formItemLayout} label="后台模版类型">
                  {form.getFieldDecorator('backendTemplateType', {
                    initialValue: 'basic',
                    rules: [],
                  })(
                    <Select
                      showSearch
                      placeholder='请选择'
                      style={{width: '100%'}}
                      filterOption={false}
                    >
                      <Select.Option value="basic">basic</Select.Option>
                      <Select.Option value="category">category</Select.Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="模块名称">
                  {getFieldDecorator('backendModuleName', {
                    initialValue: 'Component',
                    rules: [{required: true, message: '模块名称不能为空！'}],
                  })(<Input placeholder="模块名称, 如Component" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="组件名称">
                  {getFieldDecorator('backendComponentName', {
                    initialValue: 'ExampleBasic',
                    rules: [{required: true, message: '组件名称不能为空！'}],
                  })(<Input placeholder="组件名称, 如ExampleBasic" onChange={this.handleComponentNameChange} />)}
                </FormItem>

                <FormItem {...formItemLayout} label="子目录">
                  {getFieldDecorator('backendSubFolderName', {
                    initialValue: 'Example',
                    rules: [{required: true, message: '子目录名称不能为空！'}],
                  })(<Input placeholder="子目录, 如Example" onChange={this.handleSubPathChange} />)}
                </FormItem>
                <FormItem {...formItemLayout} label="数据表名称">
                  {getFieldDecorator('backendTableName', {
                    initialValue: 'comp_component',
                    rules: [{required: true, message: '数据表名称不能为空！'}],
                  })(<Input placeholder="数据表名称, 如comp_component" />)}
                </FormItem>
              </Card>
            </Col>
          </Row>
        </Card>


        <Card title="表单信息" bordered={false}>
          <Row gutter={16}>
            <Col md={6}>
              <FormItem {...formItemLayout} label="有文件">
                {getFieldDecorator('hasFile', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [],
                })(<Switch checkedChildren="有" unCheckedChildren="无" />)}
              </FormItem>
            </Col>
            <Col md={6}>
              <FormItem {...formItemLayout} label="有分类">
                {getFieldDecorator('hasCategory', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [],
                })(<Switch checkedChildren="有" unCheckedChildren="无" />)}
              </FormItem>
            </Col>
            <Col md={6}>
              <FormItem {...formItemLayout} label="有分组">
                {getFieldDecorator('hasGroup', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [],
                })(<Switch checkedChildren="有" unCheckedChildren="无" />)}
              </FormItem>
            </Col>
          </Row>
        </Card>

      </Modal>
    );
  }
};


export default ComponentForm;
