import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Menu } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from '../Less/DefaultTabList.less';
import ConfigList from './ConfigList';

const { Item } = Menu;

@connect(({ user, config, loading }) => ({
  currentUser: user.currentUser,
  config,
  loading: loading.models.config,
}))
class ConfigTabList extends Component {
  constructor(props) {
    super(props);
    const { match, location } = props;
    const menuMap = {

    };
    const key = location.pathname.replace(`${match.path}/`, '');
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: menuMap[key] ? key : 'base',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { match, location } = props;
    let selectKey = location.pathname.replace(`${match.path}/`, '');
    selectKey = state.menuMap[selectKey] ? selectKey : 'base';
    if (selectKey !== state.selectKey) {
      return { selectKey };
    }
    return null;
  }


  componentDidMount() {

    const { dispatch } = this.props;
    const { selectKey } = this.state;
    dispatch({
      type: 'config/fetch',
      payload: {'groupKey' : selectKey},
      callback: this.callbackConfigFetch
    });

    window.addEventListener('resize', this.resize);
    this.resize();
  }

  callbackConfigFetch = (resp) => {
    const selectOption = resp.data.common.selectOption
    const respMenuMap = {}
    for(let i = 0; i < selectOption.length; i += 1){
      const item = selectOption[i]
      const menuKey = item.name
      respMenuMap[menuKey]= item.text
    }

    this.setState({
      menuMap : respMenuMap
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
    dispatch({
      type: 'config/fetch',
      payload: {'groupKey' : key},
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
    return (
      <PageHeaderWrapper title="配置列表">
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
              <ConfigList groupKey={selectKey} />
            </div>
          </div>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default ConfigTabList;
