export default [
  // user
  {
    key:49,
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      // forms
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        routes: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            component: './Forms/BasicForm',
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/form/step-form',
                name: 'stepform',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: './Forms/StepForm/Step2',
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: './Forms/StepForm/Step3',
              },
            ],
          },
          {
            path: '/form/advanced-form',
            name: 'advancedform',
            component: './Forms/AdvancedForm',
          },
        ],
      },
      {
        path: '/beidou',
        icon: 'table',
        name: 'beidou',
        routes: [
          {
            path: '/beidou/generator',
            name: 'Generator',
            component: './Generator/GeneratorList',
          },
          {
            path: '/beidou/example-basic',
            name: 'ExampleBasic',
            component: './Example/ExampleBasicList',
          },
          {
            path: '/beidou/example-simple',
            name: 'ExampleSimple',
            component: './Example/ExampleSimpleList',
          },
          {
            path: '/beidou/example-file',
            name: 'ExampleFile',
            component: './Example/ExampleFileList',
          },
          {
            path: '/beidou/example-group',
            name: 'ExampleGroup',
            component: './Example/ExampleGroupList',
          },
          {
            path: '/beidou/example-category',
            name: 'ExampleCategory',
            component: './Example/ExampleCategoryList',
          },
          {
            path: '/beidou/example-post',
            name: 'ExamplePost',
            component: './Example/ExamplePostList',
          },
          {
            path: '/beidou/example/post/tag',
            name: 'ExamplePostTag',
            component: './Example/ExamplePostTagList',
          },
          {
            path: '/beidou/example/post/category',
            name: 'ExamplePostCategory',
            component: './Example/ExamplePostCategoryList',
          },
          {
            path: '/beidou/menu',
            name: 'Menu',
            component: './Wenqu/MenuList',
          },
          {
            path: '/beidou/permissions/group',
            name: 'PermissionGroup',
            component: './Wenqu/PermissionGroupList',
          },
          {
            path: '/beidou/permissions/index',
            name: 'Permission',
            component: './Wenqu/PermissionList',
          },
          {
            path: '/beidou/roles',
            name: 'Role',
            component: './Wenqu/RoleList',
          },
          {
            path: '/beidou/bdusers/index',
            name: 'BdUser',
            component: './Wenqu/BdUserList',
          },
        ],
      },
      {
        path: '/config',
        icon: 'table',
        name: 'kaiyang',
        routes: [
          {
            path: '/config/group',
            name: 'ConfigGroup',
            component: './Kaiyang/ConfigGroupList',
          },
          {
            path: '/config/index',
            name: 'Config',
            component: './Kaiyang/ConfigTabList',
            routes: [
              {
                path: '/config/index',
                redirect: '/config/index/base',
              },
              {
                path: '/config/index/:group',
                component: './Kaiyang/ConfigList',
              },
            ],
          },
          {
            path: '/config/banner/group',
            name: 'BannerGroup',
            component: './Kaiyang/BannerGroupList',
          },
          {
            path: '/config/banner/index',
            name: 'Banner',
            component: './Kaiyang/BannerTabList',
            routes: [
              {
                path: '/config/banner/index',
                redirect: '/config/banner/index/base',
              },
              {
                path: '/config/banner/index/:group',
                component: './Kaiyang/BannerList',
              },
            ],
          },
          {
            path: '/config/nav/group',
            name: 'NavGroup',
            component: './Kaiyang/NavGroupList',
          },
          {
            path: '/config/nav/index',
            name: 'Nav',
            component: './Kaiyang/NavTabList',
            routes: [
              {
                path: '/config/nav/index',
                redirect: '/config/nav/index/base',
              },
              {
                path: '/config/nav/index/:group',
                component: './Kaiyang/NavList',
              },
            ],
          },
        ]
      },
      {
        path: '/cms',
        icon: 'table',
        name: 'cms',
        routes: [
          {
            path: '/cms/post/tag',
            name: 'CmsPostTag',
            component: './Cms/CmsPostTagList',
          },
          {
            path: '/cms/post/category',
            name: 'CmsPostCategory',
            component: './Cms/CmsPostCategoryList',
          },
          {
            path: '/cms/post/index',
            name: 'CmsPost',
            component: './Cms/CmsPostList',
          },
          {
            path: '/cms/scrapy/index',
            name: 'CmsScrapy',
            component: './Cms/CmsScrapyList',
          },
          {
            path: '/cms/product/tag',
            name: 'CmsProductTag',
            component: './Cms/CmsProductTagList',
          },
          {
            path: '/cms/product/category',
            name: 'CmsProductCategory',
            component: './Cms/CmsProductCategoryList',
          },
          {
            path: '/cms/product/index',
            name: 'CmsProduct',
            component: './Cms/CmsProductList',
          },
          /*
          */
        ]
      },

      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              },
              {
                path: '/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: './List/Applications',
              },
            ],
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        routes: [
          // profile
          {
            path: '/profile/basic',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            component: './Profile/AdvancedProfile',
          },
        ],
      },
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
