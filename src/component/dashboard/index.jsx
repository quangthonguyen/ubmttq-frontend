import React from 'react';
import {
  Layout,
  Menu,
  Avatar,
  Popover,
  Button,
  notification,
  Badge,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  TeamOutlined,
  SendOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import style from './dashboard.module.scss';
import TableCvd from '../tableCvd/index.jsx';
import TableGuestCvd from '../tableCvd/guest';
import TableCvdi from '../tableCvdi/index.jsx';
import TableGuestCvdi from '../tableCvdi/guest';
import TableQlnd from '../qlnd/index';
import TableQlcv from '../tableQlcv/tableQlcv';
import ChangePassword from '../modal/changePasswork';
import { Redirect } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  NavLink,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reduxRemoveUserInfo } from '../../redux/slice/userInfo';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');
// const socket = io('https://api-ummttqqbt.herokuapp.com');

const badge = {
  top: '8px',
  right: '-4px',
  fontSize: '10px',
  padding: '0px',
  minWidth: '12px',
  maxHeight: '12px',
  lineHeight: '10px',
};
const badge2 = {
  top: '-3px',
  right: '7px',
  fontSize: '10px',
  padding: '0px',
  minWidth: '12px',
  maxHeight: '12px',
  lineHeight: '10px',
};
const { Header, Sider, Content } = Layout;
const quyen = ['Guest', 'Admin'];
function DashBoard() {
  const [collapsed, setCollapsed] = React.useState(true);
  const match = useRouteMatch();
  const userInfo = useSelector((state) => state.userInfo);
  const notificationState = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const content = (
    <div style={{ textAlign: 'Center' }}>
      <p>{`Họ và tên : ${userInfo.lastname} ${userInfo.firstname} `}</p>
      <p>{`Quyền : ${quyen[userInfo.access]}`}</p>
      <Button
        type="primary"
        danger
        block
        onClick={() => {
          dispatch({ type: 'LOGOUT' });
        }}
      >
        Đăng xuất
      </Button>
      <ChangePassword id={userInfo._id} />
    </div>
  );
  const { access } = userInfo;
  React.useEffect(() => {
    if (userInfo._id) {
      socket.on('socketAddCvd', (data) => {
        if (data.nguoithuchien.filter((e) => e === userInfo._id).length > 0) {
          dispatch({ type: 'SOCKET_ADD_CVD', payload: data });
        }
      });
      if (userInfo.access === 1) {
        socket.on('socketDeXuatHoanThanh', (data) => {
          notification.info({
            message: ` Đề xuất hoàn thành từ văn bản số ${data.sovb}!`,
            placement: 'bottomRight',
            duration: 0,
          });
          dispatch({ type: 'NOTI_QLCV_ADD_ONE' });
        });
      }
      if (userInfo.access === 0) {
        socket.on('socketTuChoiDeXuat', (data) => {
          if (data.nguoithuchien.filter((e) => e === userInfo._id).length > 0) {
            notification.warning({
              message: ` Văn bản số ${data.sovb} bị từ chối!`,
              placement: 'bottomRight',
              duration: 0,
            });
          }
          dispatch({ type: 'NOTI_GUEST_ADD_ONE' });
        });
        socket.on('socketHoanThanh', (data) => {
          if (data.nguoithuchien.filter((e) => e === userInfo._id).length > 0) {
            notification.success({
              message: ` Văn bản số ${data.sovb} hoàn thành!`,
              placement: 'bottomRight',
              duration: 0,
            });
          }
          dispatch({ type: 'NOTI_GUEST_ADD_ONE' });
        });
        socket.on('socketdeleteCvd', (data) => {
          dispatch({ type: 'SOCKET_REMOVE_CVD', payload: { _id: data._id } });
        });
      }
    }
  }, [userInfo._id]);
  React.useEffect(() => {
    socket.on('socketUpdateCvd', (data) => {
      dispatch({ type: 'SOCKET_UPDATE_CVD', payload: data });
      console.log({ socketUpdateCvd: data });
    });
  }, []);
  return (
    <>
      {localStorage.username && localStorage.password ? null : (
        <Redirect to="/Login" />
      )}
      <Router>
        <Layout>
          <Header className={style.header}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: style.trigger,
                onClick: () => setCollapsed((prevCount) => !prevCount),
              }
            )}
            <div className={style.bander}>
              <Avatar
                src={process.env.PUBLIC_URL + 'UBMTTQ.png'}
                className={style.avatar}
                size="small"
              />
              <b>ỦY BAN MẶT TRẬN TỔ QUỐC QUẬN BÌNH THẠNH</b>
            </div>

            <Popover
              content={content}
              title="Thông tin người dùng"
              placement="bottomRight"
              className={style.userinfo}
            >
              <Avatar
                icon={<UserOutlined />}
                size="small"
                className={style.avatar}
              />
              <div
                className={style.name}
              >{`${userInfo.lastname} ${userInfo.firstname}`}</div>
            </Popover>
          </Header>
          <Layout className={style.siteLayout}>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              className={style.sider}
            >
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item
                  key="1"
                  icon={
                    <NavLink
                      to={`${match.url}`}
                      className={collapsed ? style.menuNav : ''}
                    >
                      {access === 0 ? (
                        <Badge
                          count={notificationState.guestCvd}
                          style={collapsed ? badge : badge2}
                        >
                          <MailOutlined />
                        </Badge>
                      ) : (
                        <MailOutlined />
                      )}
                    </NavLink>
                  }
                  className={style.sliderLi}
                  title="Công văn đến"
                >
                  <span style={collapsed ? { width: '0px', opacity: 0 } : {}}>
                    Công văn đến
                  </span>
                </Menu.Item>

                <Menu.Item
                  key="2"
                  icon={
                    <Link
                      to={`${match.url}/congvandi`}
                      className={collapsed ? style.menuNav : ''}
                    >
                      <SendOutlined />
                    </Link>
                  }
                  className={style.sliderLi}
                  title="Công văn đi"
                >
                  <span style={collapsed ? { width: '0px', opacity: 0 } : {}}>
                    Công văn đi
                  </span>
                </Menu.Item>
                {access === 0 ? (
                  ''
                ) : (
                  <Menu.Item
                    key="3"
                    icon={
                      <Link
                        to={`${match.url}/quanlycongviec`}
                        className={collapsed ? style.menuNav : ''}
                      >
                        <Badge
                          count={notificationState.qlcv}
                          style={collapsed ? badge : badge2}
                        >
                          <DashboardOutlined className="head-example" />
                        </Badge>
                      </Link>
                    }
                    className={style.sliderLi}
                    title="Quản lý công việc"
                  >
                    <span style={collapsed ? { width: '0px', opacity: 0 } : {}}>
                      Quản lý công việc
                    </span>
                  </Menu.Item>
                )}
                {access === 0 ? (
                  ''
                ) : (
                  <Menu.Item
                    key="4"
                    icon={
                      <Link
                        to={`${match.url}/quanlynguoidung`}
                        className={collapsed ? style.menuNav : ''}
                      >
                        <TeamOutlined />
                      </Link>
                    }
                    className={style.sliderLi}
                    title="Quản lý người dùng"
                  >
                    <span style={collapsed ? { width: '0px', opacity: 0 } : {}}>
                      Quản lý người dùng
                    </span>
                  </Menu.Item>
                )}
              </Menu>
            </Sider>
            <Content className={style.content}>
              <Switch>
                <Route exact path={`${match.path}`}>
                  {access === 0 ? <TableGuestCvd /> : <TableCvd />}
                </Route>
                <Route exact path={`${match.path}/congvandi`}>
                  {access === 0 ? <TableGuestCvdi /> : <TableCvdi />}
                </Route>
                {access === 0 ? (
                  ''
                ) : (
                  <>
                    <Route exact path={`${match.path}/quanlycongviec`}>
                      <TableQlcv />
                    </Route>
                    <Route exact path={`${match.path}/quanlynguoidung`}>
                      <TableQlnd />
                    </Route>
                  </>
                )}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </>
  );
}

export default DashBoard;
