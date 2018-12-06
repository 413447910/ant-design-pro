/* eslint-disable no-param-reassign */
import React, { PureComponent } from 'react';

import {
  Form,
  InputNumber,
  Input,
  Modal,
  Switch,
  Button,
  Icon,
  Select,
  TreeSelect,
  Card,
  Row,
  Col,
} from 'antd';

import { getUploadFileId } from '@/utils/BdHelper';

const FormItem = Form.Item;


@Form.create()
class GeneratorForm extends PureComponent {

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

  handleTemplateTypeChange = (value) => {
    const { form } = this.props;
    console.log(value)
    form.setFieldsValue({'backendTemplateType': value})
  }


  handlePageSubFolderNameChange = (value) => {
    const { form } = this.props;
    console.log(value)
    form.setFieldsValue({'backendSubFolderName': value})
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

  // 路由前缀更新
  handleRoutePrefixChange = (e) => {
    const { form } = this.props;
    const {value} = e.target

    let lower = this.toLower(value);
    lower = lower.replace(new RegExp('/', "g"), '_')

    form.setFieldsValue({'backendTableName': `comp_${lower}`})
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

        console.log(fieldsValue)

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
                    initialValue: formValues.pageTemplateType || 'simple',
                    rules: [],
                  })(
                    <Select
                      showSearch
                      placeholder='请选择'
                      style={{width: '100%'}}
                      filterOption={false}
                      onChange={this.handleTemplateTypeChange}
                    >
                      <Select.Option value="basic">basic</Select.Option>
                      <Select.Option value="simple">simple</Select.Option>
                      <Select.Option value="file">file</Select.Option>
                      <Select.Option value="group">group</Select.Option>
                      <Select.Option value="category">category</Select.Option>
                      <Select.Option value="post">post</Select.Option>
                    </Select>
                  )}
                </FormItem>

                <FormItem {...formItemLayout} label="项目路径">
                  {getFieldDecorator('pageProjectPath', {
                    initialValue: '/Users/fangfei/work/www/beidou',
                  })(<Input placeholder="" disabled={true} />)}
                </FormItem>
                <FormItem {...formItemLayout} label="组件名称">
                  {getFieldDecorator('componentName', {
                    initialValue: formValues.componentName || 'ExampleBasic',
                    rules: [{required: true, message: '组件名称不能为空！'}],
                  })(<Input placeholder="组件名称, 如ExampleBasic" onChange={this.handleComponentNameChange} />)}
                </FormItem>

                <FormItem {...formItemLayout} label="子目录">
                  {form.getFieldDecorator('pageSubFolderName', {
                    initialValue: formValues.pageSubFolderName || 'Example',
                    rules: [{required: true, message: '页面子目录不能为空！'}],
                  })(
                    <Select
                      showSearch
                      placeholder='请选择'
                      style={{width: '100%'}}
                      filterOption={false}
                      onChange={this.handlePageSubFolderNameChange}
                    >
                      <Select.Option value="Example">Example</Select.Option>
                      <Select.Option value="Wenqu">Wenqu</Select.Option>
                      <Select.Option value="Kaiyang">Kaiyang</Select.Option>
                      <Select.Option value="System">System</Select.Option>
                      <Select.Option value="Cms">Cms</Select.Option>
                      <Select.Option value="Generator">Generator</Select.Option>
                    </Select>
                  )}
                </FormItem>



                <FormItem {...formItemLayout} label="路由前缀">
                  {getFieldDecorator('routePrefix', {
                    initialValue: formValues.routePrefix || 'example/basic',
                    rules: [{required: true, message: '路由前缀不能为空！'}],
                  })(<Input placeholder="路由前缀, 如example/basic" onChange={this.handleRoutePrefixChange} />)}
                </FormItem>

                <FormItem {...formItemLayout} label="菜单变量">
                  {getFieldDecorator('menuParam', {
                    initialValue: formValues.menuParam || 'menu.beidou.ExampleBasic',
                    rules: [{required: true, message: '表单组件名不能为空！'}],
                  })(<Input placeholder="菜单变量, 如menu.beidou.ExampleBasic" />)}
                </FormItem>

                <FormItem {...formItemLayout} label="菜单中文名">
                  {getFieldDecorator('menuParamTextCn', {
                    initialValue: formValues.menuParamTextCn || '基本模版',
                    rules: [{required: true, message: '菜单中文名不能为空！'}],
                  })(<Input placeholder="菜单中文名, 如component" />)}
                </FormItem>
              </Card>
            </Col>

            <Col md={12}>
              <Card title="后端基本信息">
                <FormItem {...formItemLayout} label="后台模版类型">
                  {form.getFieldDecorator('backendTemplateType', {
                    initialValue: formValues.backendTemplateType || 'simple',
                    rules: [],
                  })(
                    <Select
                      showSearch
                      placeholder='请选择'
                      style={{width: '100%'}}
                      filterOption={false}
                    >
                      <Select.Option value="basic">basic</Select.Option>
                      <Select.Option value="simple">simple</Select.Option>
                      <Select.Option value="file">file</Select.Option>
                      <Select.Option value="group">group</Select.Option>
                      <Select.Option value="category">category</Select.Option>
                      <Select.Option value="post">post</Select.Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="模块名称">
                  {getFieldDecorator('backendModuleName', {
                    initialValue: formValues.backendModuleName || 'Component',
                    rules: [{required: true, message: '模块名称不能为空！'}],
                  })(<Input placeholder="模块名称, 如Component" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="组件名称">
                  {getFieldDecorator('backendComponentName', {
                    initialValue: formValues.backendComponentName ||'ExampleBasic',
                    rules: [{required: true, message: '组件名称不能为空！'}],
                  })(<Input placeholder="组件名称, 如ExampleBasic" onChange={this.handleComponentNameChange} />)}
                </FormItem>

                <FormItem {...formItemLayout} label="子目录">
                  {form.getFieldDecorator('backendSubFolderName', {
                    initialValue: formValues.backendSubFolderName || 'Example',
                    rules: [{required: true, message: '页面子目录不能为空！'}],
                  })(
                    <Select
                      showSearch
                      placeholder='请选择'
                      style={{width: '100%'}}
                      filterOption={false}
                    >
                      <Select.Option value="Example">Example</Select.Option>
                      <Select.Option value="Wenqu">Wenqu</Select.Option>
                      <Select.Option value="Kaiyang">Kaiyang</Select.Option>
                      <Select.Option value="System">System</Select.Option>
                      <Select.Option value="Cms">Cms</Select.Option>
                      <Select.Option value="Generator">Generator</Select.Option>
                    </Select>
                  )}
                </FormItem>

                <FormItem {...formItemLayout} label="数据表名称">
                  {getFieldDecorator('backendTableName', {
                    initialValue: formValues.backendTableName || 'comp_example_basic',
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
              <FormItem {...formItemLayout} label="组件名称">
                {getFieldDecorator('name', {
                  initialValue: formValues.name || '组件名称',
                  rules: [{required: true, message: '组件名称！'}],
                })(<Input placeholder="请输入组件名称，如菜单列表" />)}
              </FormItem>
            </Col>

            <Col md={6}>
              <FormItem {...formItemLayout} label="排序">
                {getFieldDecorator('rankNum', {
                  initialValue: formValues.rankNum || '1',
                  rules: [{required: true, message: '排序不能为空！'}],
                })(<Input placeholder="从低到高排序值，如1" />)}
              </FormItem>
            </Col>
            <Col md={6}>
              <FormItem {...formItemLayout} label="生成前端">
                {getFieldDecorator('generatePage', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [],
                })(<Switch checkedChildren="是" unCheckedChildren="否" />)}
              </FormItem>
            </Col>
            <Col md={6}>
              <FormItem {...formItemLayout} label="生成后端">
                {getFieldDecorator('generateBackend', {
                  initialValue: false,
                  valuePropName: 'checked',
                  rules: [],
                })(<Switch checkedChildren="是" unCheckedChildren="否" />)}
              </FormItem>
            </Col>
          </Row>
        </Card>

      </Modal>
    );
  }
};


export default GeneratorForm;
