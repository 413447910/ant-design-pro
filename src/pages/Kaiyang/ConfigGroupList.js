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
  Modal,
  Switch,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi/locale';
import ConfigGroupForm from './ConfigGroupForm';
import {componentHiddenFields, getValue} from '@/utils/BdHelper';

import styles from '../Less/DefaultList.less';

const FormItem = Form.Item;


/* eslint react/no-multi-comp:0 */
@connect(({ configgroup, loading }) => ({
  configgroup,
  loading: loading.models.configgroup,
}))
@Form.create()
class ConfigGroupList extends PureComponent {
  state = {
    modalVisible: false,
    isUpdate: false,
    selectedRows: [],
    hiddenFields: ['isEnable'],
    formValues: {},
  };

  columns = [
    {
      title: '组名称',
      dataIndex: 'remark',
    },
    {
      title: '组标识',
      dataIndex: 'name',
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
      type: 'configgroup/fetch',
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
      type: 'configgroup/fetch',
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
      type: 'configgroup/fetch',
      payload: {},
    });
  };



  handleChangeEnable = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'configgroup/enable',
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
        type: 'configgroup/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = (flag, type, record) => {
    switch(type){
      case 'store' :
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
          isUpdate: false,
          formValues: {},
        });
    }
  };

  reserveForm = fields => {
    this.setState({
      formValues: fields,
    });
  }

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'configgroup/store',
      payload: fields,
      callback: this.handleModalVisible
    });

    this.reserveForm(fields);
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'configgroup/update',
      payload: fields,
      callback: this.handleModalVisible
    });

    this.reserveForm(fields);
  };

  handleRemove = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows) return;

    Modal.confirm({
      title: '您是否确认要删除选中内容',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'configgroup/destroy',
          payload: {
            id: selectedRows.map(row => row.id),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
      }
    });
  }

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
    return this.renderSimpleForm();
  }

  render() {
    const {
      configgroup: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, isUpdate, formValues, hiddenFields} = this.state;

    const showColumn = componentHiddenFields(this.columns, hiddenFields)

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <PageHeaderWrapper title="配置组">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true, 'store')}>
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
              columns={showColumn}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <ConfigGroupForm
          {...parentMethods}
          modalVisible={modalVisible}
          isUpdate={isUpdate}
          formValues={formValues}
          hiddenFields={hiddenFields}
          data={data}
        />
      </PageHeaderWrapper>
    );
  }
}

export default ConfigGroupList;
