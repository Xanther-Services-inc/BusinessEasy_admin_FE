import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';

const { SubMenu } = Menu;

const MenuItems = ({ darkMode, toggleCollapsed, topMenu, events }) => {
  const { path } = useRouteMatch();
  const { isLoggedIn } = useSelector(state => {
    return {
      isLoggedIn: state.auth.login || localStorage.getItem('adminInfo'),
    };
  });
  // const isLoggedInJsonObject = (isLoggedIn)?JSON.parse(JSON.stringify(isLoggedIn)):{}
  // console.log(isLoggedIn)
  var isLoggedInJsonObject = {};
  try {
    isLoggedInJsonObject = JSON.parse(isLoggedIn);
  } catch (e) {
    isLoggedInJsonObject = isLoggedIn;
  }

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const { onRtlChange, onLtrChange, modeChangeDark, modeChangeLight, modeChangeTopNav, modeChangeSideNav } = events;
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = keys => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = item => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      {console.log(isLoggedInJsonObject)}
      {console.log(isLoggedInJsonObject.type)}

      {!topMenu && (
        <p className="sidebar-nav-title">
          {isLoggedInJsonObject.type === 'super_user'
            ? 'Super User View'
            : isLoggedInJsonObject.type === 'b_manager'
            ? 'Business Manager View'
            : 'Employee View'}
        </p>
      )}
      {!topMenu && <p className="sidebar-nav-title">Applications</p>}
      {isLoggedInJsonObject &&
      (isLoggedInJsonObject.type === 'super_user' || isLoggedInJsonObject.type === 'b_manager') ? (
        <Menu.Item key="products">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/products`}>
            Products
          </NavLink>
        </Menu.Item>
      ) : null}
      {isLoggedInJsonObject.type === 'super_user' ? (
        <Menu.Item key="add-product">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/add-product`}>
            Product Add
          </NavLink>
        </Menu.Item>
      ) : null}

      {isLoggedInJsonObject &&
      (isLoggedInJsonObject.type === 'super_user' || isLoggedInJsonObject.type === 'b_manager') ? (
        <Menu.Item key="orders">
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/orders`}>
            Orders
          </NavLink>
        </Menu.Item>
      ) : null}
      {isLoggedInJsonObject.type === 'super_user' ? (
        <Menu.Item>
          <NavLink onClick={toggleCollapsed} to={`${path}/ecommerce/ordersgraph`}>
            Orders Graph
          </NavLink>
        </Menu.Item>
      ) : null}
      {isLoggedInJsonObject &&
      (isLoggedInJsonObject.type === 'super_user' || isLoggedInJsonObject.type === 'b_manager') ? (
        <Menu.Item key="inbox">
          <NavLink onClick={toggleCollapsed} to={`${path}/email/inbox`}>
            Issues
          </NavLink>
        </Menu.Item>
      ) : null}
      {isLoggedInJsonObject.type === 'super_user' ? (
        <Menu.Item key="testimonials">
          <NavLink onClick={toggleCollapsed} to={`${path}/testimonials`}>
            Testimonials
          </NavLink>
        </Menu.Item>
      ) : null}
      {isLoggedInJsonObject.type === 'super_user' ? (
        <Menu.Item key="add-testimonial">
          <NavLink onClick={toggleCollapsed} to={`${path}/add-testimonial`}>
            Add Testimonial
          </NavLink>
        </Menu.Item>
      ) : null}
      {/* blog */}
      {isLoggedInJsonObject.type === 'super_user' ? (
        <Menu.Item key="add-blog">
          <NavLink onClick={toggleCollapsed} to={`${path}/blogs`}>
            Blogs
          </NavLink>
        </Menu.Item>
      ) : null}
      {isLoggedInJsonObject.type === 'super_user' ? (
        <Menu.Item key="add-blog">
          <NavLink onClick={toggleCollapsed} to={`${path}/create-blog`}>
            Create Blog
          </NavLink>
        </Menu.Item>
      ) : null}
      {/* blog */}
      {isLoggedInJsonObject.type === 'super_user' ? (
        <Menu.Item key="faq">
          <NavLink onClick={toggleCollapsed} to={`${path}/faq`}>
            FAQ
          </NavLink>
        </Menu.Item>
      ) : null}
      {isLoggedInJsonObject.type === 'super_user' ? (
        <Menu.Item key="add-faq">
          <NavLink onClick={toggleCollapsed} to={`${path}/add-faq`}>
            Add FAQ
          </NavLink>
        </Menu.Item>
      ) : null}

      {isLoggedInJsonObject.type === 'super_user' ||
      isLoggedInJsonObject.type === 'super_user' ||
      isLoggedInJsonObject.type === 'super_user' ? (
        <Menu.Item key="contact">
          <NavLink onClick={toggleCollapsed} to={`${path}/contact-messages`}>
            Contact Messages
          </NavLink>
        </Menu.Item>
      ) : null}

      {isLoggedInJsonObject && isLoggedInJsonObject.type === 'employee' ? (
        <Menu.Item icon={!topMenu && <FeatherIcon icon="users" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/workhour`}>
            Attendence
          </NavLink>
        </Menu.Item>
      ) : null}
      {isLoggedInJsonObject && isLoggedInJsonObject.type === 'employee' ? (
        <Menu.Item icon={!topMenu && <FeatherIcon icon="briefcase" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/assigned-orders`}>
            Assigned Orders
          </NavLink>
        </Menu.Item>
      ) : null}
      {isLoggedInJsonObject && isLoggedInJsonObject.type === 'employee' ? (
        <Menu.Item icon={!topMenu && <FeatherIcon icon="alert-circle" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/assigned-issues`}>
            Assigned Issues
          </NavLink>
        </Menu.Item>
      ) : null}

      {isLoggedInJsonObject &&
      (isLoggedInJsonObject.type === 'super_user' || isLoggedInJsonObject.type === 'b_manager') ? (
        <SubMenu key="users" title={isLoggedInJsonObject.type === 'super_user' ? 'Employees & Users' : 'Employees'}>
          <Menu.Item key="team">
            <NavLink onClick={toggleCollapsed} to={`${path}/users/team`}>
              Employees
            </NavLink>
          </Menu.Item>
          {isLoggedInJsonObject.type === 'super_user' ? (
            <Menu.Item key="addBM">
              <NavLink onClick={toggleCollapsed} to={`${path}/users/add-user/binfo`}>
                Add Business Manager
              </NavLink>
            </Menu.Item>
          ) : null}
          <Menu.Item key="addUser">
            <NavLink onClick={toggleCollapsed} to={`${path}/users/add-user/info`}>
              Add Employee
            </NavLink>
          </Menu.Item>
          {isLoggedInJsonObject.type === 'super_user' ? (
            <Menu.Item key="grid">
              <NavLink onClick={toggleCollapsed} to={`${path}/users/grid`}>
                User List
              </NavLink>
            </Menu.Item>
          ) : null}
        </SubMenu>
      ) : null}
    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
  events: propTypes.object,
};

export default MenuItems;
