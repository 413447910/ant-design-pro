import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i + 1,
    id: i,
    name: `App ${i + 1}`,
    remark: `remark`,
    disabled: i % 6 === 0,
    rankNum: Math.floor(Math.random() * 10) % 100 ,
    createdAt: new Date(`2018-07-${Math.floor(i / 2) + 1}`),
    updatedAt: new Date(`2018-07-${Math.floor(i / 2) + 1}`),

  });
}


function getApp(req, res, u) {
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
  };

  return res.json(result);
}

function postApp(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, key, status,id } = body;
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
        createdAt: currTime,
        updatedAt: currTime,
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
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /api/app': getApp,
  'POST /api/app/add': postApp,
  'POST /api/app/update': postApp,
  'POST /api/app/delete': postApp,
};
