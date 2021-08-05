import React, { useState, useEffect, useLayoutEffect } from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { Style, EmailAuthor, EmailHeader } from './style';

import Heading from '../../../components/heading/heading';

import Axios from 'axios';

import { Button } from 'antd';
import ComposeMail from '../overview/Compose';

const Content = () => {
  // const userLogin = useSelector((state)=> state.userLogin)
  // const {loading, error,isAuth, userInfo} = userLogin
  const [isMailEditorOpen, setMailEditorStatus] = useState(false);
  const toggleMailComposer = () => {
    setMailEditorStatus(!isMailEditorOpen);
  };

  const [bstate, setbState] = useState({
    responsive: 0,
    collapsed: false,
  });
  const { responsive, collapsed } = bstate;

  useLayoutEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      setbState({ responsive: width });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const toggleCollapsed = () => {
    setbState({
      ...bstate,
      collapsed: !collapsed,
    });
  };

  const closeMailComposr = () => {
    setMailEditorStatus(false);
  };

  const dispatch = useDispatch();
  const [state, setState] = useState({
    selectedRowKeys: [],

    sort: true,
    issues: [],
    responsive: 0,
    collapsed: false,
  });
  const { selectedRowKeys, notData, emails, sort, issues } = state;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await Axios.get(`${process.env.REACT_APP_API}/api/v1/issue/all-issues`);
      setState({
        ...state,
        issues: data,
      });
    };

    fetchData();
  }, []);

  console.log(issues);

  const data = [];
  if (issues !== undefined)
    issues.map((item, key) => {
      const { id, employee, issue_details, order_id, user_email, title } = item;

      return data.push({
        // key: id,
        // name: (
        //   <EmailAuthor>
        //     <Heading as="h5">

        //       <Link>Emp Assigned: [<strong>{employee}</strong>]</Link>
        //     </Heading>
        //   </EmailAuthor>
        // ),

        id: (
          <EmailAuthor>
            <Heading as="h5">
              <Link to={`/admin/issue/single/${id}`}>
                <strong>{id}</strong>
              </Link>
            </Heading>
          </EmailAuthor>
        ),
        email: (
          <EmailAuthor>
            <Heading as="h5">
              <Link to={`/admin/issue/single/${id}`}>
                <strong>{user_email}</strong>
              </Link>
            </Heading>
          </EmailAuthor>
        ),
        emp: (
          <EmailAuthor>
            <Heading as="h5">
              <Link to={`/admin/issue/single/${id}`}>
                <strong>{employee}</strong>
              </Link>
            </Heading>
          </EmailAuthor>
        ),
        title: (
          <EmailHeader>
            <Heading as="h5">
              <Link to={`/admin/issue/single/${id}`}>
                <strong>{title}</strong>
              </Link>
            </Heading>
          </EmailHeader>
        ),
      });
    });

  const handleChange = (pagination, filters, sorter) => {
    setState({
      ...state,
      sortedInfo: sorter,
    });
  };

  const onRowSelection = filterObj => {
    const { filter, byValue } = filterObj;

    const newSelectedRowKeys = emails
      .filter(value => {
        return value[filter] === byValue;
      })
      .map(item => item.id);

    setState({ ...state, selectedRowKeys: newSelectedRowKeys });
  };

  const onSelectChange = selectedRowKey => {
    setState({ ...state, selectedRowKeys: selectedRowKey });
  };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  //   hideDefaultSelections: true,
  //   selections: [
  //     {
  //       key: 'all',
  //       text: 'All',
  //       onSelect: () => {
  //         const newSelectedRowKeys = issues.map(item => item.id);
  //         setState({ ...state, selectedRowKeys: newSelectedRowKeys });
  //       },
  //     },
  //     {
  //       key: 'read',
  //       text: 'Read',
  //       onSelect: onRowSelection.bind(null, { filter: 'status', byValue: 'read' }),
  //     },
  //     {
  //       key: 'unread',
  //       text: 'Unread',
  //       onSelect: onRowSelection.bind(null, { filter: 'status', byValue: 'unread' }),
  //     },
  //     {
  //       key: 'stared',
  //       text: 'Stared',
  //       onSelect: onRowSelection.bind(null, { filter: 'stared', byValue: true }),
  //     },
  //     {
  //       key: 'unstared',
  //       text: 'Unstared',
  //       onSelect: onRowSelection.bind(null, { filter: 'status', byValue: false }),
  //     },
  //   ],
  // };

  const columns = [
    // {
    //   title: 'Issue Lists',
    //   dataIndex: 'name',
    // },
    {
      title: 'Issue Id',
      dataIndex: 'id',
    },
    {
      title: 'Issue Title',
      dataIndex: 'title',
    },
    {
      title: 'User Email',
      dataIndex: 'email',
    },
    {
      title: 'Employee Assigned',
      dataIndex: 'emp',
    },
  ];

  return (
    <>
      {/* {responsive > 991 ? (<Button onClick={toggleMailComposer} style={{position: 'relative', left: '75rem'}} shape="round" type="primary" size="default">
                        <FeatherIcon icon="plus" size={18} /> Issue
                      </Button>) : (<div className="mail-sidebar-top">
                      <Button onClick={toggleMailComposer} shape="round" type="primary" size="default" block>
                        + Issue
                      </Button>
                    </div>
                      )}
                      {isMailEditorOpen && <ComposeMail close={closeMailComposr} />} */}
      <Style
        className="table-responsive"
        pagination={false}
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        onChange={handleChange}
      />
      {/* <Footer1 /> */}
    </>
  );
};

Content.propTypes = {
  searchData: propTypes.arrayOf(propTypes.object).isRequired,
  email: propTypes.arrayOf(propTypes.object).isRequired,
};

export default Content;
