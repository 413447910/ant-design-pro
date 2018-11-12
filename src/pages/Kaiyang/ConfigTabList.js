import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Menu } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './ConfigTabList.less';
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
      base: '基本设置',
      site: '安全设置',
      email: '账号绑定',
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

    this.setState({
      menuMap : {
        base: '基本设置',
        site: '安全设置',
        email: '账号绑定',
      }
    })

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
    console.log(resp)
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
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      let mode = 'inline';
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      this.setState({
        mode,
      });
    });
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
              <ConfigList groupKey={selectKey}></ConfigList>
            </div>
          </div>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default ConfigTabList;
