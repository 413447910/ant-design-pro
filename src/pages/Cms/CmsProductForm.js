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
  DatePicker,
  Row,
  Col,
  Card,
} from 'antd';

import moment from 'moment'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'

import { buildTagSelectOption, DATEIME_FORMAT, issetParam, getUploadFileId} from '@/utils/BdHelper';


const FormItem = Form.Item;
const { TextArea } = Input;


@Form.create()
class CmsProductForm extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
        picture1ModalVisible: false,
        picture1PreviewUrl: '',
        editorStateHtml: null,
        publishedAt: null,
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

  handleCategoryChange = (value) => {
    console.log(value)
  }

  handlePublishedTimeChange = (t) => {
    const tf = t.format(DATEIME_FORMAT)
    this.setState({
      publishedAt: tf
    })
  }

  handleEditorChange = (editorState) => {
    console.log(editorState.toHTML())
    this.setState({
      editorStateHtml: editorState.toHTML()
    })
  }

  handleTagChange = (value) => {
    console.log(value)
  }

  render(){
    const { modalVisible, form, handleAdd, handleModalVisible, formValues,
      isUpdate, handleUpdate, data, hiddenFields} = this.props;

    const {picture1ModalVisible, picture1PreviewUrl, editorStateHtml,
      publishedAt} = this.state;

    const {treeData, common} = data;

    formValues.picture1 = formValues.picture1 || []
    formValues.fileThumbnail = getUploadFileId(formValues)

    console.log(formValues)

    const propUpload = {
        listType: 'picture',
        className: 'upload-list-inline',
    };


    const treeProps = {
      treeData,
      onChange: this.handleCategoryChange,
      treeDefaultExpandAll: true,
      searchPlaceholder: '请选择分类',
      style: {
        width: '100%',
      },
    };

    const tagOptions = buildTagSelectOption(common)


    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;

        const fileThumbnail = getUploadFileId(formValues)
        fieldsValue.fileThumbnail = fileThumbnail

        fieldsValue.publishedAt = publishedAt || fieldsValue.publishedAt
        fieldsValue.postContent = editorStateHtml || fieldsValue.postContent

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
        width="80%"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >

        <Row>
          <Col md={16}>

            <Card title="基本信息" bordered={false}>

          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="分类">
            {form.getFieldDecorator('categoryId', {
              initialValue: formValues.categoryId|| '',
              rules: [{required: true, message: '分类不能为空！'}],
            })(<TreeSelect multiple {...treeProps} />)}
          </FormItem>

        {
          !hiddenFields.includes('name') &&
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="标题">
              {form.getFieldDecorator('name', {
                initialValue: formValues.name || '',
                rules: [{required: true, message: '标题不能为空！'}],
              })(<Input placeholder="" />)}
            </FormItem>
        }
        {
          !hiddenFields.includes('postKeywords') &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="关键字">
            {form.getFieldDecorator('postKeywords', {
              initialValue: formValues.postKeywords || 'cms',
              rules: [{required: true, message: '关键字不能为空！'}],
            })(<Input placeholder="请输入关键字" />)}
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
                  formValues.picture1.length === 0 ? (
                  //formValues.picture1.length === 0 && formValues.fileThumbnail === '' ? (
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
          !hiddenFields.includes('tag') &&
          <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="标签">
            {form.getFieldDecorator('tagId', {
              initialValue: formValues.tagStrArr || [],
              rules: [{required: true, message: '标签不能为空！'}],
            })(
              <Select mode="multiple" style={{ width: '100%' }} onChange={this.handleTagChange} placeholder="请选择">
                {tagOptions}
              </Select>
            )}
          </FormItem>
        }

          </Card>
         </Col>
         <Col md={8}>
           <Card title="发布信息" bordered={false}>
             {
               !hiddenFields.includes('publishedAt') &&
               <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="时间">
                 {form.getFieldDecorator('publishedAt', {
                   initialValue: moment(formValues.publishedAt) || '',
                   rules: [{required: true, message: '发布时间不能为空！'}],
                 })(<DatePicker format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} placeholder="" onChange={this.handlePublishedTimeChange} />)}
               </FormItem>
             }
                <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="排序">
                  {form.getFieldDecorator('rankNum', {
                    initialValue: formValues.rankNum || 888,
                    rules: [{required: true, message: '排序值为整数！'}],
                  })(<InputNumber style={{width: '100%'}} placeholder="升序排列" min={1} />)}
                </FormItem>
             {
               !hiddenFields.includes('isTop') &&
               <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="置顶">
                 {form.getFieldDecorator('isTop', {
                   initialValue: !isUpdate || isUpdate && formValues.isTop,
                   valuePropName: 'checked',
                   rules: [],
                 })(<Switch checkedChildren="是" unCheckedChildren="否" />)}
               </FormItem>
             }
             {
               !hiddenFields.includes('isRecommend') &&
               <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="推荐">
                 {form.getFieldDecorator('isRecommend', {
                   initialValue: !isUpdate || isUpdate && formValues.isRecommend,
                   valuePropName: 'checked',
                   rules: [],
                 })(<Switch checkedChildren="是" unCheckedChildren="否" />)}
               </FormItem>
             }
           </Card>
         </Col>
        </Row>

        <Card title="正文内容">
          <FormItem labelCol={{span: 0}} wrapperCol={{span: 24}} label="">
            {form.getFieldDecorator('postContent', {
              initialValue: BraftEditor.createEditorState(formValues.postContent || ''),
              rules: [{required: true, message: '正文内容不能为空！'}],
            })(<BraftEditor onChange={this.handleEditorChange}
            />)}
          </FormItem>
        </Card>

        {
          !hiddenFields.includes('appendCard') &&
          <Card title="附加信息" bordered={false}>
            {
              !hiddenFields.includes('postAuthor') &&
              <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="作者">
                {form.getFieldDecorator('postAuthor', {
                  initialValue: formValues.postAuthor || '',
                  rules: [],
                })(<Input placeholder=""/>)}
              </FormItem>
            }

            {
              !hiddenFields.includes('postSource') &&
              <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="来源">
                {form.getFieldDecorator('postSource', {
                  initialValue: formValues.postSource || '',
                  rules: [],
                })(<Input placeholder=""/>)}
              </FormItem>
            }

            {
              !hiddenFields.includes('postSourceUrl') &&
              <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="来源链接">
                {form.getFieldDecorator('postSourceUrl', {
                  initialValue: formValues.postSourceUrl || '',
                  rules: [],
                })(<Input placeholder=""/>)}
              </FormItem>
            }
            {
              !hiddenFields.includes('remark') &&
              <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="备注">
                {form.getFieldDecorator('remark', {
                  initialValue: formValues.remark || '',
                  rules: [],
                })(<TextArea rows={2} placeholder=""/>)}
              </FormItem>
            }
            {
              !hiddenFields.includes('isEnable') &&
              <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}} label="状态">
                {form.getFieldDecorator('isEnable', {
                  initialValue: !isUpdate || isUpdate && formValues.isEnable,
                  valuePropName: 'checked',
                  rules: [],
                })(<Switch checkedChildren="启用" unCheckedChildren="隐藏"/>)}
              </FormItem>
            }
          </Card>
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

export default CmsProductForm;
