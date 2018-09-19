/* eslint-disable no-param-reassign */
import React, { PureComponent, Fragment} from 'react';
import { connect } from 'dva';
import {
  Form,
  InputNumber,
  Input,
  Modal,
  Switch,
  Button,
  message,
  Radio,
  Upload,
  Icon,
  TreeSelect,
  Divider,

  List,
  Card,
  Row,
  Col,
  Progress,
  Dropdown,
  Menu,
  Avatar,
  DatePicker,
  Select,
} from 'antd';

import StandardTable from '@/components/StandardTable';
import moment from 'moment';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const SelectOption = Select.Option;
const { TextArea } = Input;

@connect(({ bannerSubset, loading }) => ({
  bannerSubset,
  loading: loading.models.bannerSubset,
}))
@Form.create()
class BannerSubset extends PureComponent {

  columns = [
    {
      title: '缩略图',
      dataIndex: 'thumbUrl',
      width: '10%',
      render: (val, record) => (
        <img src={record.thumbUrl} width={'100%'} onClick={() => this.setPreviewUrl(record)}/>
      )
    },
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
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleFormModalVisible(true, 'update', record)}>更新</a>
        </Fragment>
      ),
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      formModalVisible: false,
      isUpdate: false,
      subFormValues: {},
      previewUrl: '',
      previewModalVisible: false,
    };
  }

  componentDidMount() {
    const { dispatch, formValues } = this.props;

    dispatch({
      type: 'bannerSubset/fetch',
      payload: {
        subsetParentId: formValues.id,
      },
    });
  }

  handleFormModalVisible = (show, type, record)=> {
    console.log('formModalVisible', type, record)
    switch(type){
      case 'add' :
        this.setState({
          formModalVisible: !!show,
          isUpdate: false,
          subFormValues: record,
        });
        break;
      case 'update':
        this.setState({
          formModalVisible: !!show,
          isUpdate: true,
          subFormValues: record,
        });
        break;
      default:
        this.setState({
          formModalVisible: !!show,
          subFormValues: {},
        });
    }
  }

  handleOk = () => {
    const { form } = this.props;
    const { isUpdate, subFormValues} = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();

      if(isUpdate){
        fieldsValue.id = subFormValues.id
        this.handleUpdate(fieldsValue);
      }else{
        this.handleAdd(fieldsValue);
      }
    });
  }

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'bannerSubset/add',
      payload: fields,
    });

    message.success('添加成功');
    this.handleFormModalVisible(false)
  }

  handleUpdate = (fields) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'bannerSubset/update',
      payload: fields,
    });

    message.success('更新成功');
    this.handleFormModalVisible(false)
  }

  handleChangeEnable = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'bannerSubset/enable',
      payload: {
        id: record.id,
        isEnable: !record.isEnable,
        key: record.key,
      },
    });
  };


  uploadChangeOnPicture1 = (changeObj) => {
    const { subFormValues} = this.state;
    subFormValues.picture1 = changeObj.fileList
  }

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
          type: 'bannerSubset/delete',
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
      previewUrl: record.thumbUrl,
      previewModalVisible: true,
    });
  }

  closePreviewModal = () => {
    this.setState({
      previewModalVisible: false,
    });
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  render(){
    const {
      bannerSubset: { data },
      loading,
    } = this.props;
    const { modalVisible, common, formValues , handleModalVisible, form } = this.props;
    const { selectedRows, formModalVisible, subFormValues, isUpdate, previewUrl, previewModalVisible } = this.state;

    subFormValues.picture1 = subFormValues.picture1 || []

    return (
      <Modal
        destroyOnClose
        title="子集列表"
        width="80%"
        visible={modalVisible}
        onOk={() => {}}
        onCancel={() => handleModalVisible(false, 'subset', {})}
      >

          <Button
            type="dashed"
            style={{ width: '100%', marginBottom: 8 }}
            icon="plus"
            onClick={() => this.handleFormModalVisible(true, 'add', {})}
          >
            添加
          </Button>

          {selectedRows.length > 0 && (
            <Button
              type="danger"
              style={{ width: '100%', marginBottom: 8 }}
              icon="delete"
              onClick={() => this.handleRemove()}
            >
              删除
            </Button>
          )}

          <StandardTable
            selectedRows={selectedRows}
            loading={loading}
            data={data}
            columns={this.columns}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleStandardTableChange}
          />
          <Modal
            destroyOnClose
            title="新建"
            width="60%"
            visible={formModalVisible}
            onOk={() => this.handleOk()}
            onCancel={() => this.handleFormModalVisible(false)}
          >
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="名称">
              {form.getFieldDecorator('name', {
                initialValue: subFormValues.name || '',
                rules: [{required: true, message: '名称不能为空！'}],
              })(<Input placeholder="" />)}
            </FormItem>



            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="图片">
              {form.getFieldDecorator('picture1', {
                rules: [{required: true, message: '图片不能为空！'}],
              })(
                <Upload
                  listType="picture"
                  className="upload-list-inline"
                  action="/api/file/upload"
                  defaultFileList={subFormValues.picture1}
                  beforeUpload={(file) => {console.log('before upload file type', file.type)}}
                  onRemove={() => {subFormValues.picture1 = []}}
                  onChange={this.uploadChangeOnPicture1}
                >
                  {
                    subFormValues.picture1.length === 0 ? (
                      <Button>
                        <Icon type="upload" /> 点击上传
                      </Button>
                    ) : null
                  }
                </Upload>
              )}
            </FormItem>

            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="排序">
              {form.getFieldDecorator('rankNum', {
                initialValue: subFormValues.rankNum || 888,
                rules: [{required: true, message: '排序值为整数！'}],
              })(<InputNumber style={{width: '100%'}} placeholder="升序排列" min={1} />)}
            </FormItem>

            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="备注">
              {form.getFieldDecorator('remark', {
                initialValue: subFormValues.remark || '',
                rules: [],
              })(<TextArea rows={2} placeholder="" />)}
            </FormItem>

            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="状态">
              {form.getFieldDecorator('isEnable', {
                initialValue: !isUpdate || isUpdate && subFormValues.isEnable,
                valuePropName: 'checked',
                rules: [],
              })(<Switch checkedChildren="启用" unCheckedChildren="隐藏" />)}
            </FormItem>
          </Modal>
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
      </Modal>
    );
  }
};


export default BannerSubset;
