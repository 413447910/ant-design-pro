import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Icon,
  Button,
  Dropdown,
  Menu,
  message,
  Switch,
  Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi/locale';
import MenuForm from './MenuForm';

import styles from './MenuList.less';

const FormItem = Form.Item;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


/* eslint react/no-multi-comp:0 */
@connect(({ menu, loading }) => ({
  menu,
  loading: loading.models.menu,
}))
@Form.create()
class MenuList extends PureComponent {
  state = {
    modalVisible: false,
    isUpdate: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  columns = [
    {
      title: '标题',
      dataIndex: 'name',
    },
    {
      title: '图标',
      dataIndex: 'icon',
    },
    {
      title: '规则',
      dataIndex: 'path',
    },
    {
      title: '组件',
      dataIndex: 'componentPath',
    },
    {
      title: '排序',
      dataIndex: 'rankNum',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (val, record) => (
        <Switch checked={val} onChange={() => this.handleChangeMenuStatus(record)} />
      )

    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleModalVisible(true, 'update', record)}>更新</a>
          <Divider type="vertical" />
          <a href="">订阅警报</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/fetch',
    });
  };


  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'menu/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'menu/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleRemove = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows) return;

    dispatch({
      type: 'menu/remove',
      payload: {
        key: selectedRows.map(row => row.key),
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
      },
    });
  }


  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'menu/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = (flag, type, record) => {
    switch(type){
      case 'add' :
        this.setState({
          modalVisible: !!flag,
          isUpdate: false,
          formValues: {},
        });
        break;
      case 'update' :
        console.log('record', record)
        this.setState({
          modalVisible: !!flag,
          isUpdate: true,
          formValues: record || {},
        });
        break;
      default:
        this.setState({
          modalVisible: !!flag,
          formValues: {},
        });
        break;
    }
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/add',
      payload: fields,
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/update',
      payload: fields,
    });

    message.success('更新成功');
    this.handleModalVisible();
  };

  handleChangeMenuStatus = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/status',
      payload: {
        id: record.id,
        status: !record.status,
        key: record.key,
      },
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="标题">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="规则">
              {getFieldDecorator('path')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      menu: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, isUpdate, formValues } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <PageHeaderWrapper title="查询菜单">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true, 'add')}>
                <FormattedMessage id="app.form.create" defaultMessage="Create" />
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Button key="rrr" onClick={this.handleRemove}>删除</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <MenuForm
          {...parentMethods}
          modalVisible={modalVisible}
          isUpdate={isUpdate}
          formValues={formValues}
          menuTree={data.menuTree}
        />

      </PageHeaderWrapper>
    );
  }
}

export default MenuList;
