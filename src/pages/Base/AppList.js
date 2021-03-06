import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  message,
  Modal,
  Switch,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi/locale';
import AppForm from './AppForm';

import styles from './AppList.less';

const FormItem = Form.Item;
const confirm = Modal.confirm;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


/* eslint react/no-multi-comp:0 */
@connect(({ app, loading }) => ({
  app,
  loading: loading.models.app,
}))
@Form.create()
class AppList extends PureComponent {
  state = {
    modalVisible: false,
    isUpdate: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'remark',
    },
    {
      title: '排序',
      dataIndex: 'rankNum',
    },
    {
      title: '启用',
      dataIndex: 'isEnable',
      render: (val, record) => (
        <Switch checked={val} onChange={() => this.handleChangeEnable(record)} />
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
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/fetch',
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
      type: 'app/fetch',
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
      type: 'app/fetch',
      payload: {},
    });
  };

  handleRemove = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows) return;

    confirm({
      title: '您是否确认要删除选中内容',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: function() {
        dispatch({
          type: 'app/delete',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {},
        });
      },
      onCancel: function() {}
    });

  }

  handleChangeEnable = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/enable',
      payload: {
        id: record.id,
        isEnable: !record.isEnable,
        key: record.key,
      },
    });
  };


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
        type: 'app/fetch',
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
      type: 'app/add',
      payload: fields,
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/update',
      payload: fields,
    });

    message.success('更新成功');
    this.handleModalVisible();
  };


  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
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
      app: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, isUpdate, formValues } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <PageHeaderWrapper title="应用列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true, 'add')}>
                <FormattedMessage id="app.form.create" defaultMessage="Create" />
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button onClick={this.handleRemove}>删除</Button>
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
        <AppForm
          {...parentMethods}
          modalVisible={modalVisible}
          isUpdate={isUpdate}
          formValues={formValues}
          treeData={data.treeData}
          common={data.common}
        />

      </PageHeaderWrapper>
    );
  }
}

export default AppList;
