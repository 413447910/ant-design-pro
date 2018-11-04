
import { Select, message, Modal, Button } from 'antd';

export const DATEIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function componentHiddenFields(columns, hiddenFields) {
    const showColumn = columns.filter( (item) => {
      if(!hiddenFields.includes(item.dataIndex)) {
        return item
      }
    });
    return showColumn
}
export function issetParam(param) {
  if(param === null || param === undefined){
    return false
  }
  return true
}

export function buildFormSelectOption(common) {
  let arr = [{'key' : 1, 'text': 'a'}]
  if(issetParam(common) && issetParam(common.selectOption)){
      arr = common.selectOption
  }
 // arr = [{'key' : 1, 'text': 'a'}]
 // console.log(arr)
  const options = arr.map(d => <Select.Option key={d.key} value={d.key}>{d.text}</Select.Option>);
  return options
}

export function buildTagSelectOption(common) {
  let arr = [{'key' : 1, 'text': 'a'}]
  if(issetParam(common) && issetParam(common.tagSelectOption)){
    arr = common.tagSelectOption
  }
  const options = arr.map(d => <Select.Option key={d.key} value={d.key}>{d.text}</Select.Option>);
  return options
}

export function getFormSelectOption(common, groupId) {

  if(issetParam(common) && issetParam(common.selectOption)){
    const arr = common.selectOption
    const selectItem = arr.filter((item)  => {
      if(item.key === groupId){
        return true
      }
      return false
    })
    if(selectItem.length > 0){
      return selectItem[0].text
    }
  }
  return '';

}

// 获取上传文件
export function getUploadFileId(formValues) {
  console.log(formValues)

  if(issetParam(formValues.picture1)){
    const fileList = formValues.picture1
    if(fileList.length > 0){
      const file = fileList[0]
      // 刚上传
      if(issetParam(file.response)){
        return file.response.data.fileId
      }
      // 已存在
      return file.uid
    }
  }
  if(issetParam(formValues.fileThumbnail)){
    return formValues.fileThumbnail;
  }
  return ''
}

export function checkRespData(respData, type) {
  console.log('check resp data')
  console.log(respData)
  let errorMsg = "请求失败" + respData.msg

  if(respData.code !== 0){
    message.error(errorMsg)
    return false
  }

  if(['enable'].includes(type)){
    return true
  }

  let successMsg = '请求成功'
  switch(type){
    case 'store'  : successMsg  = '添加成功'; break;
    case 'update' : successMsg  = '更新成功'; break;
    case 'destroy': successMsg  = '删除成功'; break;
    case 'enable' : successMsg  = '请求成功'; break;
  }
  message.success(successMsg)

  return true
}

export function formatMomentTimeToStr(m) {
  return m.format('YYYY-MM-DD HH:mm:ss')
}

export const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');



