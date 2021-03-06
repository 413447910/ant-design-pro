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
  Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi/locale';
import CmsScrapyForm from './CmsScrapyForm';
import {componentHiddenFields, getValue} from '@/utils/BdHelper';

import styles from '../Less/DefaultList.less';

const FormItem = Form.Item;


/* eslint react/no-multi-comp:0 */
@connect(({ cmsscrapy, loading }) => ({
  cmsscrapy,
  loading: loading.models.cmsscrapy,
}))
@Form.create()
class CmsScrapyList extends PureComponent {
  state = {
    modalVisible: false,
    isUpdate: false,
    selectedRows: [],
    hiddenFields: [],
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
      title: '域名',
      dataIndex: 'domain',
      render: (val, record) => {
        return <a href={record.domain} target='_blank'>查看</a>;
      }
    },
    {
      title: '解压子路径',
      dataIndex: 'unzipSubPath',
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
      title: '生成代码',
      render: (text, record) => (
        record.isEnable === false ? (
          <Fragment>
            <a onClick={() => this.freshData(record, 'generate')}>生成代码</a>
          </Fragment>
        ) : '已生成'
      ),
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleModalVisible(true, 'update', record)}>更新</a>
          <Divider type="vertical" />
          <a onClick={() => this.freshData(record, 'sync')}>同步数据</a>
          <Divider type="vertical" />
          <a onClick={() => this.freshData(record, 'fresh')}>刷新数据</a>
          <Divider type="horizontal" />
          <a onClick={() => this.freshData(record, 'arrange')}>整理数据</a>
          <Divider type="vertical" />
          <a onClick={() => this.freshData(record, 'clear')}>清除数据</a>
        </Fragment>
      ),
    },
  ];

  freshData = (record, opType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'cmsscrapy/fresh',
      payload: {
        id: record.id,
        type: opType,
      },
      callback: this.successMsg
    });
  };

  successMsg = () => {
    console.log('操作成功')
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'cmsscrapy/fetch',
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
      type: 'cmsscrapy/fetch',
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
      type: 'cmsscrapy/fetch',
      payload: {},
    });
  };



  handleChangeEnable = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'cmsscrapy/enable',
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
        type: 'cmsscrapy/fetch',
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
      type: 'cmsscrapy/store',
      payload: fields,
      callback: this.handleModalVisible
    });

    this.reserveForm(fields);
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'cmsscrapy/update',
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
          type: 'cmsscrapy/destroy',
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
      cmsscrapy: { data },
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
      <PageHeaderWrapper title="数据对接">
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
        <CmsScrapyForm
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

export default CmsScrapyList;
