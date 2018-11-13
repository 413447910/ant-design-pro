import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Card,
  Form,
  Button,
  Modal,
  Switch,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import { FormattedMessage } from 'umi/locale';
import ConfigForm from './ConfigForm';
import {componentHiddenFields, getValue} from '@/utils/BdHelper';
import styles from '../Less/DefaultList.less';


/* eslint react/no-multi-comp:0 */
@connect(({ config, loading }) => ({
  config,
  loading: loading.models.config,
}))
@Form.create()
class ConfigList extends PureComponent {
  state = {
    modalVisible: false,
    isUpdate: false,
    selectedRows: [],
    hiddenFields: ['parentId','isEnable'],
    formValues: {},
  };

  columns = [
    {
      title: '变量标题',
      dataIndex: 'remark',
      width: 120,
    },
    {
      title: '变量标识',
      dataIndex: 'name',
      width: 180,
    },
    {
      title: '变量值',
      dataIndex: 'content',
      render: (val, record) => {
        if (record.type === 'file') {
          return <a href={record.thumbUrl.thumbUrl} target='_blank'> 查看文件</a>
        }
        return val
      }
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
      type: 'config/fetch',
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
      type: 'config/fetch',
      payload: {},
    });
  };



  handleChangeEnable = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'config/enable',
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
        type: 'config/fetch',
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
      type: 'config/store',
      payload: fields,
      callback: this.handleModalVisible
    });

    this.reserveForm(fields);
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'config/update',
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
          type: 'config/destroy',
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

  setPreviewUrl = (record) => {
    this.setState({
      previewUrl: record.thumbUrl.thumbUrl,
      previewModalVisible: true,
    });
  }

  closePreviewModal = () => {
    this.setState({
      previewModalVisible: false,
    });
  }

  render() {
    const {
      config: { data },
      loading,
      groupKey,
    } = this.props;
    const { selectedRows, modalVisible, isUpdate, formValues, hiddenFields,
        previewUrl, previewModalVisible } = this.state;

    const showColumn = componentHiddenFields(this.columns, hiddenFields)

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableList}>
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
        <ConfigForm
          {...parentMethods}
          modalVisible={modalVisible}
          isUpdate={isUpdate}
          formValues={formValues}
          hiddenFields={hiddenFields}
          data={data}
          groupKey={groupKey}
        />
        {
            previewModalVisible && (<Modal
              title="图片预览"
              visible={previewModalVisible}
              onOk={this.closePreviewModal}
              onCancel={this.closePreviewModal}
              afterClose={() => this.closePreviewModal}
              footer={null}
            >
              <img src={previewUrl} width={'100%'}/>
            </Modal>
            )
        }
      </div>
    );
  }
}

export default ConfigList;
