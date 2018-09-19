import { parse } from 'url';

const common = {
    'bannerType': [{
        'id' : 1,
        'desc' : '首页',
    },{
        'id' : 2,
        'desc' : '详情页',
    }],
};

const fileList = [{
  uid: '-1',
  name: 'xxx.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}];

const t = new Date();

// mock tableListDataSource
let tableListDataSource = [];
let subsetDataSource = [];
for (let i = 0; i < 46; i += 1) {

  subsetDataSource = [];
  for(let j = 1; j < 9; j += 1){
    subsetDataSource.push({
      key: j,
      id: j,
      name: `Subset Banner ${j}`,
      remark: `remark`,
      isEnable: true,
      disabled: i % 6 === 0,
      rankNum: Math.floor(Math.random() * 10) % 100 ,
      createdAt: new Date(`2018-07-${Math.floor(i / 2) + 1}`),
      updatedAt: new Date(`2018-07-${Math.floor(i / 2) + 1}`),
      picture1 : fileList,
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    });
  }

  tableListDataSource.push({
    key: i + 1,
    id: i + 1,
    name: `Banner ${i + 1}`,
    remark: `remark`,
    isEnable: true,
    disabled: i % 6 === 0,
    rankNum: Math.floor(Math.random() * 10) % 100 ,
    createdAt: new Date(`2018-07-${Math.floor(i / 2) + 1}`),
    updatedAt: new Date(`2018-07-${Math.floor(i / 2) + 1}`),
    picture1 : fileList,
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    subset: subsetDataSource,
  });
}

const subsetList = tableListDataSource;


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


function getBanner(req, res, u) {
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
    subsetList: subsetList,
    common: common
  };

  return res.json(result);
}

function postBanner(req, res, u, b) {
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
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'add':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        id: i,
        name: body.name,
        disabled: i % 6 === 0,
        rankNum: body.rankNum,
        remark: body.remark,
        isEnable: body.isEnable,
        createdAt: currTime,
        updatedAt: currTime,
        picture1 : fileList,
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
//    subsetList: subsetList,
    common: common
  };

  return res.json(result);
}



function getBannerSubset(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;
  const { subsetParentId } = params;

  let dataSource = tableListDataSource;

  if (params.subsetParentId) {
    dataSource = dataSource.filter(data => data.id === subsetParentId);
  }


  subsetDataSource = [];
  for(let j = 1; j < 9; j += 1){
    subsetDataSource.push({
      key: j,
      id: j,
      name: `Subset Banner ${j}`,
      remark: `remark`,
      isEnable: true,
      disabled: j % 6 === 0,
      rankNum: Math.floor(Math.random() * 10) % 100 ,
      createdAt: new Date(`2018-09-${Math.floor(j / 2) + 1}`),
      updatedAt: new Date(`2018-09-${Math.floor(j / 2) + 1}`),
      picture1 : fileList,
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    });
  }

  let pageSize = 20;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: subsetDataSource,
    pagination: {
      total: subsetDataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
    treeData: treeData,
//    subsetList: subsetList,
    common: common
  };

  return res.json(result);
}



function postBannerSubset(req, res, u, b) {
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
      subsetDataSource = subsetDataSource.filter(item => id.indexOf(item.id) === -1);
      break;
    case 'add':
      const i = Math.ceil(Math.random() * 10000);
      subsetDataSource.unshift({
        key: i,
        id: i,
        name: body.name,
        disabled: i % 6 === 0,
        rankNum: body.rankNum,
        remark: body.remark,
        isEnable: body.isEnable,
        createdAt: currTime,
        updatedAt: currTime,
        picture1 : fileList,
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      });
      break;
    case 'update':
      subsetDataSource = subsetDataSource.map(item => {
        if (item.id === id) {
          Object.assign(item, body, {updatedAt});
          return item;
        }
        return item;
      });
      break;
    case 'enable':
      subsetDataSource = subsetDataSource.map(item => {
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
    list: subsetDataSource,
    pagination: {
      total: subsetDataSource.length,
    },
    treeData: treeData,
//    subsetList: subsetList,
    common: common
  };

  return res.json(result);
}




export default {
  'GET /api/banner': getBanner,
  'POST /api/banner/add': postBanner,
  'POST /api/banner/update': postBanner,
  'POST /api/banner/delete': postBanner,
  'POST /api/banner/enable': postBanner,


  'GET /api/bannerSubset': getBannerSubset,
  'POST /api/bannerSubset/add': postBannerSubset,
  'POST /api/bannerSubset/update': postBannerSubset,
  'POST /api/bannerSubset/delete': postBannerSubset,
  'POST /api/bannerSubset/enable': postBannerSubset,
};
