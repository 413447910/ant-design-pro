import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Row,
  message,
  Table,
  Col,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Effective.less';
import moment from 'moment';

const FormItem = Form.Item;

@connect(({ effective, loading }) => ({
  effective,
  loading: loading.models.effective,
}))

@Form.create()
class Effective extends PureComponent {

  state = {

  };

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.generateCode(values)
      }
    });
  };

  generateCode = values => {
    console.log(values)

    const { dispatch } = this.props;
    dispatch({
      type: 'effective/add',
      payload: values,
    });

    message.success('添加成功');
  }

  firstLetterUpper = str => {
    return str.charAt(0).toUpperCase()+str.slice(1);
  };

  // 变量更新
  handleComponentNameChange = (e) => {
    const { form } = this.props;
    const {value} = e.target

    form.setFieldsValue({'serviceJsName': value})
    form.setFieldsValue({'mockJsName': value})
    const pageSubPath = form.getFieldValue('pageSubPath')

    if(value.length > 0){
      const firstUpName = this.firstLetterUpper(value);
      form.setFieldsValue({'menuParam': `menu.${pageSubPath}.${value}List`})
      form.setFieldsValue({'menuNameEn': `${firstUpName}List`})
    }
  }

  handlePageSubPathChange = (e) => {
    const { form } = this.props;
    const {value} = e.target

    if(value.length > 0){
      const pageSubPath = value
      const componentName = form.getFieldValue('componentName');
      form.setFieldsValue({'menuParam': `menu.${pageSubPath}.${componentName}List`})
    }

  }


  render() {
    const {
      effective: { data },
      loading,
    } = this.props;

    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
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
      <PageHeaderWrapper
        title="代码生成器"
        content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
      >
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>

          <Card title="基本信息" bordered={false}>
              <FormItem {...formItemLayout} label="项目路径">
                {getFieldDecorator('projectPath', {
                  initialValue: '/Users/fangfei/work/www/beidou',
                })(<Input placeholder="" disabled={true} />)}
              </FormItem>

              <FormItem {...formItemLayout} label="模版路径">
                {getFieldDecorator('templatePath', {
                  initialValue: '/Users/fangfei/work/www/beidou/template/basic',
                  disabled: true,
                })(<Input placeholder="" disabled={true} />)}
              </FormItem>

              <FormItem {...formItemLayout} label="表单组件名">
                {getFieldDecorator('componentName', {
                  initialValue: 'example',
                  rules: [{required: true, message: '表单组件名不能为空！'}],
                })(<Input placeholder="表单组件名, 如component" onChange={this.handleComponentNameChange} />)}
              </FormItem>
          </Card>

          <Card title="Pages & Service & mock 信息" bordered={false}>
            <FormItem {...formItemLayout} label="Pages子目录">
              {getFieldDecorator('pageSubPath', {
                initialValue: 'base',
                rules: [{required: true, message: 'pages子目录不能为空！'}],
              })(<Input placeholder="pages目录的子目录" onChange={this.handlePageSubPathChange} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Service文件名">
              {getFieldDecorator('serviceJsName', {
                initialValue: 'example',
                rules: [{required: true, message: 'Service文件名不能为空！'}],
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Mock文件名">
              {getFieldDecorator('mockJsName', {
                initialValue: 'example',
                rules: [{required: true, message: 'Mock文件名不能为空！'}],
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Card>
          <Card title="菜单信息" bordered={false}>
            <Row gutter={16}>
              <Col lg={8} md={8} sm={8}>
                <FormItem {...formItemLayout} label="菜单变量">
                  {getFieldDecorator('menuParam', {
                    initialValue: 'menu.list.exampleList',
                    rules: [{required: true, message: '菜单变量名不能为空！'}],
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col lg={8} md={8} sm={8}>
                <FormItem {...formItemLayout} label="英文文案">
                  {getFieldDecorator('menuNameEn', {
                    initialValue: 'ExampleList',
                    rules: [{required: true, message: '英文文案不能为空！'}],
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
              <Col lg={8} md={8} sm={8}>
                <FormItem {...formItemLayout} label="中文文案">
                  {getFieldDecorator('menuNameCn', {
                    initialValue: '示例列表',
                    rules: [{required: true, message: '中文文案不能为空！'}],
                  })(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
            </Row>
          </Card>
          <Card bordered={false}>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Card>

        </Form>

          <Card title="生成的文件" bordered={false} style={{marginTop: 30}}>
            <Table
              style={{ marginBottom: 0 }}
              pagination={false}
              loading={loading}
              dataSource={data.list}
              columns={fileColumns}
              rowKey="id"
            />
          </Card>


      </PageHeaderWrapper>
    );
  }
}

export default Effective;
