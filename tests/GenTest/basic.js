
const fsObj = require('fs');

// 初始化变量
const currTime = new Date();
let fileList = [];
let tableListDataSource = [];
// mock tableListDataSource
for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    key: i + 1,
    id: i,
    name: `Effective ${i + 1}`,
    path:   'file path',
    srcFile:   'src file path',
    targetFile:   'target file path',
    rankNum: Math.floor(Math.random() * 10) % 100 ,
    createdAt: currTime,
    updatedAt: currTime,

  });
}

function firstLetterUpper(str) {
  return str.charAt(0).toUpperCase()+str.slice(1);
}

function trimEmptyLine(tpl) {
  return tpl.split('\n').filter( str => str.trim().length > 0).join('\n');
}

function generateFiles(body) {
  const { projectPath, templatePath, componentName,
    pageSubPath , menuParam, menuNameCn, menuNameEn} = body;

  const componentLowerName = componentName;
  const componentFirstUpperName = firstLetterUpper(componentName);
  const pageSubPathFirstUpper = firstLetterUpper(pageSubPath)
  const menuEnStr = `'${menuParam}': '${menuNameEn}',`
  const menuCnStr = `'${menuParam}': '${menuNameCn}',`
  const listStr = `${menuNameCn}`

  // menu & pages & service & mock  文件

  const tplFileSrcMenuCn = `${projectPath}/src/locales/zh-CN.js`
  const tplFileSrcMenuEn = `${projectPath}/src/locales/en-US.js`
  const tplFileSrcPageList = `${templatePath}/pages/componentList.txt`
  const tplFileSrcPageForm = `${templatePath}/pages/componentForm.txt`
  const tplFileSrcPageLess= `${templatePath}/pages/componentList.less`
  const tplFileSrcPageModel = `${templatePath}/pages/models/component.txt`
  const tplFileSrcService = `${templatePath}/services/component.txt`
  const tplFileSrcMock = `${templatePath}/mock/component.txt`



  const tplFileTargetMenuCn = `${projectPath}/src/locales/zh-CN.js`
  const tplFileTargetMenuEn = `${projectPath}/src/locales/en-US.js`
  const tplFileTargetPageList = projectPath + '/src/pages/' + pageSubPathFirstUpper + '/' + componentFirstUpperName + 'List.js'
  const tplFileTargetPPageForm = projectPath + '/src/pages/' + pageSubPathFirstUpper + '/' +  componentFirstUpperName + 'Form.js'
  const tplFileTargetPPageLess= projectPath + '/src/pages/' + pageSubPathFirstUpper + '/' + componentFirstUpperName + 'List.less'
  const tplFileTargetPPageModel = projectPath + '/src/pages/' + pageSubPathFirstUpper + '/models/' + componentLowerName + '.js'
  const tplFileTargetService = projectPath + '/src/services/' + componentLowerName + '.js'
  const tplFileTargetMock = projectPath + '/mock/' + componentLowerName + '.js'


  fileList = [];
  fileList.push({'name' : 'menuCn', 'srcFile' : tplFileSrcMenuCn, 'targetFile' : tplFileTargetMenuCn});
  fileList.push({'name' : 'menuEn', 'srcFile' : tplFileSrcMenuEn, 'targetFile' : tplFileTargetMenuEn});
  fileList.push({'name' : 'pageList', 'srcFile' : tplFileSrcPageList, 'targetFile' : tplFileTargetPageList});
  fileList.push({'name' : 'pageLess', 'srcFile' : tplFileSrcPageLess, 'targetFile' : tplFileTargetPPageLess});
  fileList.push({'name' : 'pageForm', 'srcFile' : tplFileSrcPageForm, 'targetFile' : tplFileTargetPPageForm});
  fileList.push({'name' : 'pageModel', 'srcFile' : tplFileSrcPageModel, 'targetFile' : tplFileTargetPPageModel});
  fileList.push({'name' : 'service', 'srcFile' : tplFileSrcService, 'targetFile' : tplFileTargetService});
  fileList.push({'name' : 'mock', 'srcFile' : tplFileSrcMock, 'targetFile' : tplFileTargetMock});

  let item = {};

  const replaceMap = new Map();
  replaceMap.set('#COMPONENT_UPPER#', componentFirstUpperName);
  replaceMap.set('#COMPONENT_LOWER#', componentLowerName);
  replaceMap.set('#LIST_STR#', listStr);

  // 写文件
  for(let i = 0; i < fileList.length; i += 1) {
    item = fileList[i]

    // 同步读文件
    let fileContent = fsObj.readFileSync(item.srcFile);
    let newTpl = fileContent.toString()
    // 替换
    for(const [key, value] of replaceMap.entries()) {
      const reg = new RegExp(key, "g");
      newTpl = newTpl.replace(reg, value)
    }

    const lastLine = '};';
    // 中文目录
    if(item.name === 'menuCn'){
      // 去除 lastLine 和原来的菜单
      newTpl = newTpl.replace(new RegExp(lastLine, "g"), '')
      newTpl = newTpl.replace(new RegExp(menuCnStr, "g"), '')
      // 新内容 & 去除空行
      newTpl = `${newTpl} \n ${menuCnStr} \n ${lastLine}`
      newTpl = trimEmptyLine(newTpl)
    }

    if(item.name === 'menuEn'){
      // 去除 lastLine 和原来的菜单
      newTpl = newTpl.replace(new RegExp(lastLine, "g"), '')
      newTpl = newTpl.replace(new RegExp(menuEnStr, "g"), '')
      // 新内容 & 去除空行
      newTpl = `${newTpl} \n ${menuEnStr} \n ${lastLine}`
      newTpl = trimEmptyLine(newTpl)
    }

    // 写文件
    fsObj.writeFileSync(item.targetFile, newTpl)
  }

  // 修改权限
  fsObj.chmodSync(`${projectPath}/src`, '0777', (err) => {console.log(err)});
  fsObj.chmodSync(`${projectPath}/mock`, '0777', (err) => {console.log(err)});


  const regProjectPath = new RegExp(projectPath, "g");

  tableListDataSource = []
  for (let i = 0; i < fileList.length; i += 1) {
    item = fileList[i]

    tableListDataSource.push({
      key: i + 1,
      id: i + 1,
      name: item.name,
      path:   333,
      srcFile: (item.srcFile).replace(regProjectPath, ''),
//      srcFile:   333,
      targetFile:   item.targetFile,
      rankNum: Math.floor(Math.random() * 10) % 100 ,
      createdAt: currTime,
      updatedAt: currTime,
    });
  }
}


const body = {
  'projectPath' : '/Users/fangfei/work/www/beidou',
  'templatePath' : '/Users/fangfei/work/www/beidou/template/basic',
  'componentName' : 'example',
  'pageSubPath' : 'base',
  'serviceJsName' : 'example',
  'mockJsName' : 'example',
  'menuParam' : 'menu.list.exampleList',
  'menuNameCn' : '示例列表',
  'menuNameEn' : 'ExampleList',
};

console.log('begin')
generateFiles(body);
console.log('done')
