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
} from 'antd';

import { buildFormSelectOption, getFormSelectOption, getUploadFileId} from '@/utils/BdHelper';

const FormItem = Form.Item;
const { TextArea } = Input;


@Form.create()
class NavForm extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      picture1ModalVisible: false,
      picture1PreviewUrl: '',
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

  render(){
    const { modalVisible, form, handleAdd, handleModalVisible, formValues,
      isUpdate, handleUpdate, data, hiddenFields, groupKey} = this.props;

    const {picture1ModalVisible, picture1PreviewUrl} = this.state;
    const {treeData, common} = data;
    const formTitle = isUpdate ? '更新' : '新建'

    formValues.picture1 = formValues.picture1 || []
    formValues.fileThumbnail = getUploadFileId(formValues)
    formValues.groupId = groupKey

    const propUpload = {
      listType: 'picture',
      className: 'upload-list-inline',
    };

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;

        const fileThumbnail = getUploadFileId(formValues)
        fieldsValue.fileThumbnail = fileThumbnail

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
        title={formTitle}
        width="60%"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >

        {
          !hiddenFields.includes('groupId') &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="所属组">
            {form.getFieldDecorator('groupId', {
              initialValue: formValues.groupId || '',
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

        {
          !hiddenFields.includes('parentId') &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="父级">
            {form.getFieldDecorator('parentId', {
              initialValue: formValues.parentId || '1',
              rules: [{required: true, message: '父级不能为空！'}],
            })(
              <TreeSelect
                showSearch
                style={{width: '100%'}}
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                treeData={treeData}
                allowClear
                placeholder="请选择"
                treeDefaultExpandAll
                onChange={(value) => console.log(value)}
              />
            )}
          </FormItem>
        }
        {
          !hiddenFields.includes('name') &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="名称">
            {form.getFieldDecorator('name', {
              initialValue: formValues.name || '',
              rules: [{required: true, message: '名称不能为空！'}],
            })(<Input placeholder="" />)}
          </FormItem>
        }
        <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}}  label="跳转方式">
          {form.getFieldDecorator('linkTarget', {
            initialValue: formValues.linkTarget || '_blank',
            rules: [],
          })(
            <Radio.Group  buttonStyle="solid">
              <Radio.Button value="_blank">新标签页打开</Radio.Button>
              <Radio.Button value="_self">原标签页打开</Radio.Button>
            </Radio.Group>
          )}
        </FormItem>
        {
          !hiddenFields.includes('linkHref') &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="链接">
            {form.getFieldDecorator('linkHref', {
              initialValue: formValues.linkHref || '',
              rules: [{required: true, message: '链接不能为空！'}],
            })(<Input placeholder="" />)}
          </FormItem>
        }
        {
          !hiddenFields.includes('picture1') &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="图片">
            {form.getFieldDecorator('picture1', {
              initialValue: formValues.picture1 || '',
              rules: [{required: true, message: '图片不能为空！'}],
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
                  formValues.picture1.length === 0 && formValues.fileThumbnail === '' ? (
                    <Button>
                      <Icon type="upload" /> 点击上传
                    </Button>
                  ) : null
                }
              </Upload>
            )}
          </FormItem>
        }

        {
          !hiddenFields.includes('remark') &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="备注">
            {form.getFieldDecorator('remark', {
              initialValue: formValues.remark || '',
              rules: [],
            })(<TextArea rows={2} placeholder="" />)}
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


export default NavForm;