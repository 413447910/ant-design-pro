import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Menu } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from '../Less/DefaultTabList.less';
import ConfigList from './ConfigList';
import { PREFIX_GROUP } from '@/utils/BdHelper';

const { Item } = Menu;

@connect(({ user, config, loading }) => ({
  currentUser: user.currentUser,
  config,
  loading: loading.models.config,
}))
class ConfigTabList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'inline',
      menuMap: {},
      selectKey: '',
    };
  }

  componentDidMount() {

    const { dispatch } = this.props;
    const { selectKey } = this.state;
    dispatch({
      type: 'config/fetch',
      payload: {'groupKey' : selectKey},
      callback: this.callbackFetch
    });

    window.addEventListener('resize', this.resize);
    this.resize();
  }

  callbackFetch = (resp) => {
    const { selectKey } = this.state
    let defaultKey = '';

    const selectOption = resp.data.common.selectOption
    const respMenuMap = {}
    for(let i = 0; i < selectOption.length; i += 1){
      const item = selectOption[i]
      const menuKey = `${PREFIX_GROUP}${item.key}`
      respMenuMap[menuKey]= item.text

      if(i === 0){
        defaultKey = menuKey
      }
    }

    const newSelectkey = selectKey !== '' ? selectKey : defaultKey

    this.setState({
      menuMap : respMenuMap,
      selectKey: newSelectkey
    })

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getmenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = ({ key }) => {
    router.push(`/config/index/${key}`);

    const { dispatch } = this.props;
    const queryKey = key.replace(new RegExp(PREFIX_GROUP, "g"), '')
    dispatch({
      type: 'config/fetch',
      payload: {'groupKey' : queryKey},
    });

    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
  };

  render() {
    const { currentUser } = this.props;
    if (!currentUser.userid) {
//      return '';
    }
    const { mode, selectKey } = this.state;
    console.log('tab state', this.state)
    const realGroupKey = selectKey.replace(new RegExp(PREFIX_GROUP, "g"), '')

    return (
      <PageHeaderWrapper title="幻灯片列表">
        <GridContent>
          <div
            className={styles.main}
            ref={ref => {
              this.main = ref;
            }}
          >
            <div className={styles.leftmenu}>
              <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
                {this.getmenu()}
              </Menu>
            </div>
            <div className={styles.right}>
              <div className={styles.title}>{this.getRightTitle()}</div>
              <ConfigList groupKey={realGroupKey} />
            </div>
          </div>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default ConfigTabList;
