import { parse } from 'url';

const common = {
  'selectOption' : [
    {'key' : 1, 'text' : 'ant'},
    {'key' : 2, 'text' : 'design'},
    {'key' : 3, 'text' : 'pro'}
   ],
};

const fileList = [{
  uid: '-1',
  name: 'xxx.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  fileUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}];

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i + 1,
    id: i + 1,
    name: `ExampleBasic ${i + 1}`,
    remark: `remark`,
    isEnable: true,
    disabled: i % 6 === 0,
    rankNum: Math.floor(Math.random() * 10) % 100 ,
    groupId: Math.floor(Math.random() * 10) % 10 ,
    createdAt: new Date(`2018-07-${Math.floor(i / 2) + 1}`),
    updatedAt: new Date(`2018-07-${Math.floor(i / 2) + 1}`),
    picture1 : fileList,
    thumbUrl: fileList[0],
  });
}

const treeData = [{
  title: 'Node1',
  value: '0-0',
  key: '0-0',
  children: [{
    title: 'Child Node1',
    value: '0-0-1',
    key: '0-0-1',
  }, {
    title: 'Child Node2',
    value: '0-0-2',
    key: '0-0-2',
  }],
}, {
  title: 'Node2',
  value: '0-1',
  key: '0-1',
}];


function getExampleBasic(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }


  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 100;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
    treeData: treeData,
    common: common
  };

  return res.json(result);
}

function postExampleBasic(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, key, isEnable, id } = body;
  const updatedAt = new Date();
  const currTime = new Date();

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
      break;
    case 'add':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        id: i,
        name: body.name,
        disabled: i % 6 === 0,
        rankNum: body.rankNum,
        groupId:  i % 10,
        remark: body.remark,
        createdAt: currTime,
        updatedAt: currTime,
        picture1 : fileList,
        thumbUrl: fileList[0],
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.id === id) {
          Object.assign(item, body, {updatedAt});
          return item;
        }
        return item;
      });
      break;
    case 'enable':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.id === id) {
            Object.assign(item, {isEnable, updatedAt});
            return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
    treeData: treeData,
    common: common
  };

  return res.json(result);
}

export default {
  'GET /api/example/basic/index': getExampleBasic,
  'POST /api/example/basic/store': postExampleBasic,
  'POST /api/example/basic/update': postExampleBasic,
  'POST /api/example/basic/enable': postExampleBasic,
  'POST /api/example/basic/destroy': postExampleBasic,
};
