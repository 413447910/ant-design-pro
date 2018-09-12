import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i + 1,
    name: `Menu ${i + 1}`,
    path: `/profile/basic`,
    parentId: `0`,
    id: i,
    icon: `table`,
    isMenu: `table`,
    remark: `remark`,
    menuCondition: `menu condition`,
    componentPath: `./Forms/BasicForm`,
    disabled: i % 6 === 0,
    rankNum: Math.floor(Math.random() * 10) % 100 ,
    status: false,
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),

  });
}

const menuTreeData = [{
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

function getMenu(req, res, u) {
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

  if (params.path) {
    dataSource = dataSource.filter(data => data.path.indexOf(params.path) > -1);
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

    menuTree: menuTreeData,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function postMenu(req, res, u, b) {
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
        name: body.name,
        path: body.path,
        parentId: body.parendId,
        id: i,
        icon: body.icon,
        disabled: i % 6 === 0,
        rankNum: body.rankNum,
        status: body.status ? 1 : 0,
        remark: body.remark,
        menuCondition: body.menuCondition,
        componentPath: body.componentPath,
        createdAt: currTime,
        updatedAt: currTime,

      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.id === id) {
          Object.assign(item, body);
          return item;
        }
        return item;
      });
      break;
    case 'updateStatus':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          Object.assign(item, { status , updatedAt});
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
    menuTree: menuTreeData,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /api/menu': getMenu,
  'POST /api/menu': postMenu,
};
