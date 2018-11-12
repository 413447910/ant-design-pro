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
  Radio,
  DatePicker,
} from 'antd';

import moment from 'moment'

import { issetParam, buildFormSelectOption, DATEIME_FORMAT, getUploadFileId} from '@/utils/BdHelper';

const FormItem = Form.Item;
const { TextArea } = Input;


@Form.create()
class ConfigForm extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
        picture1ModalVisible: false,
        picture1PreviewUrl: '',
        paramType: 'string',
        dateAt: null,
    };
  }

  uploadChangeOnPicture1 = (changeObj) => {
    const { formValues} = this.props;
    formValues.picture1 = changeObj.fileList
  }

  previewPicture1 = (file) => {
    this.setState({
        picture1ModalVisible: true,
        picture1PreviewUrl: file.thumbUrl,
    })
  }

  closePreviewModal = () => {
    this.setState({
        picture1ModalVisible: false,
    })
  }

  changeParamType = (e) => {
    this.setState({
      paramType: e.target.value
    })
  }

  handleDateAtChange = (t) => {
    const tf = t.format(DATEIME_FORMAT)
    this.setState({
      dateAt: tf
    })
  }

  getSelectGroupId = (common, groupKey) => {

    let selectedGroupId = 0

    if(!issetParam(common.selectOption)){
      return selectedGroupId
    }

    for(let i = 0; i < common.selectOption.length; i++) {
      const item = common.selectOption[i]
      if(item.name === groupKey){
        selectedGroupId = item.key
        break;
      }
    }

    return selectedGroupId
  }

  render(){
    const { modalVisible, form, handleAdd, handleModalVisible, formValues,
      isUpdate, handleUpdate, data, hiddenFields, groupKey } = this.props;

    const {picture1ModalVisible, picture1PreviewUrl, paramType, dateAt} = this.state;
    const {treeData, common} = data;

    formValues.picture1 = formValues.picture1 || []
    formValues.fileThumbnail = getUploadFileId(formValues)
    formValues.groupId = this.getSelectGroupId(common, groupKey)

    const showType = paramType || formValues.type

    const propUpload = {
        listType: 'picture',
        className: 'upload-list-inline',
    };

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;

        const fileThumbnail = getUploadFileId(formValues)
        fieldsValue.fileThumbnail = fileThumbnail
        fieldsValue.content = dateAt || fieldsValue.content

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
        {
          !hiddenFields.includes('groupId') &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="所属组">
            {form.getFieldDecorator('groupId', {
              initialValue: formValues.groupId || 'ant',
              rules: [{required: true, message: '所属组不能为空！'}],
            })(
              <Select
                showSearch
                placeholder='请选择'
                style={{width: '100%'}}
                disabled
              >
                {buildFormSelectOption(common)}
              </Select>
            )}
          </FormItem>
        }

        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}}  label="变量类型">
          {form.getFieldDecorator('type', {
            initialValue: formValues.type || 'string',
            rules: [],
          })(
            <Radio.Group  buttonStyle="solid" onChange={this.changeParamType}>
              <Radio.Button value="string">整数(字符)</Radio.Button>
              <Radio.Button value="date">日期</Radio.Button>
              <Radio.Button value="file">文件</Radio.Button>
            </Radio.Group>
          )}
        </FormItem>

        {
          !hiddenFields.includes('remark') &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="变量标题">
            {form.getFieldDecorator('remark', {
              initialValue: formValues.remark || '',
              rules: [{required: true, message: '变量标题不能为空!'}],
            })(<Input rows={1} placeholder="" />)}
          </FormItem>
        }

        {
          !hiddenFields.includes('name') &&
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="变量标识">
              {form.getFieldDecorator('name', {
                initialValue: formValues.name || '',
                rules: [{required: true, message: '变量标识不能为空！'}],
              })(<Input placeholder="如 appId" />)}
            </FormItem>
        }

        {
          showType === 'string' &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="变量值">
            {form.getFieldDecorator('content', {
              initialValue: formValues.content || '',
              rules: [{required: true, message: '变量值不能为空！'}],
            })(<TextArea rows={1} placeholder="" />)}
          </FormItem>
        }

        {
          showType === 'date' &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="时间">
            {form.getFieldDecorator('content', {
              initialValue: moment(formValues.content) || '',
              rules: [{required: true, message: '时间不能为空！'}],
            })(<DatePicker format={DATEIME_FORMAT} style={{ width: '100%' }} placeholder="" onChange={this.handleDateAtChange} />)}
          </FormItem>
        }

        {
          !hiddenFields.includes('picture1') && showType === 'file' &&
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="文件">
              {form.getFieldDecorator('picture1', {
                initialValue: formValues.picture1 || '',
              })(
                <Upload
                  {...propUpload}
                  action="/api/file/upload"
                  defaultFileList={formValues.picture1}
                  beforeUpload={(file) => {console.log('before upload file type', file.type)}}
                  onRemove={() => {formValues.picture1 = []}}
                  onChange={this.uploadChangeOnPicture1}
                  onPreview={this.previewPicture1}
                >
                  {
                    formValues.picture1.length === 0 ? (
                    // formValues.picture1.length === 0 && formValues.fileThumbnail === '' ? (
                      <Button>
                        <Icon type="upload" /> 点击上传
                      </Button>
                    ) : null
                  }
                </Upload>
              )}
            </FormItem>
        }



        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="排序">
          {form.getFieldDecorator('rankNum', {
            initialValue: formValues.rankNum || 888,
            rules: [{required: true, message: '排序值为整数！'}],
          })(<InputNumber style={{width: '100%'}} placeholder="升序排列" min={1} />)}
        </FormItem>

        {
          !hiddenFields.includes('isEnable') &&
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="状态">
              {form.getFieldDecorator('isEnable', {
                initialValue: !isUpdate || isUpdate && formValues.isEnable,
                valuePropName: 'checked',
                rules: [],
              })(<Switch checkedChildren="启用" unCheckedChildren="隐藏" />)}
            </FormItem>
        }

        <Modal
          title="图片预览"
          visible={picture1ModalVisible}
          onOk={this.closePreviewModal}
          onCancel={this.closePreviewModal}
          afterClose={this.closePreviewModal}
          footer={null}
        >
          <img src={picture1PreviewUrl} width={'100%'}/>
        </Modal>
      </Modal>
    );
  }
};


export default ConfigForm;
