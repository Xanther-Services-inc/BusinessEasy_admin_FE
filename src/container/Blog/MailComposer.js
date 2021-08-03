import React, { useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import RichTextEditor from 'react-rte';
// import TagsInput from 'react-tagsinput';
// import 'react-tagsinput/react-tagsinput.css';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { Form, Input, Upload, message } from 'antd';
import { MailBox } from './style';
import { Button } from '../../components/buttons/buttons';
import axios from 'axios';
import { Spin, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import swal from 'sweetalert';

const MailComposer = ({ onChange, onSend, defaultTag, replay, text }) => {
  const [state, setState] = useState({
    desc: RichTextEditor.createEmptyValue(),
    tags: defaultTag ? [defaultTag] : [],
    author: '',
    title: '',
    doc_key: '',
    fetchData: '',
  });

  const onChanges = desc => {
    setState({ ...state, desc });
    if (onChange) {
      onChange(desc.toString('html'));
    }
  };

  const handleChange = tags => {
    setState({ ...state, tags });
  };
  const authorHandle = e => {
    setState({ ...state, author: e.target.value });
  };
  const titleHandle = e => {
    setState({ ...state, title: e.target.value });
  };

  const onSubmit = async () => {
    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/api/v1/blog/create`,
      data: {
        title: state.title,
        author: state.author,
        desc: state.desc.toString('html'),
        doc_key: state.doc_key,
      },
    })
      .then(response =>
        swal({
          icon: 'success',
        }),
      )
      .catch(error => console.log(error));

    window.location.reload();
  };

  const props = {
    name: 'image',
    action: `${process.env.REACT_APP_API}/api/v1/blog/upload`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        <Space size="middle">
          <Spin size="small" />
          <Spin />
          <Spin size="large" />
        </Space>;
        console.log(info.file);
        console.log(info.file.response.key);
      }
      if (info.file.status === 'done') {
        setState({ ...state, doc_key: info.file.response.key });
        message.success(`${info.file.name} file uploaded successfully`);
        console.log(state.doc_key);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <MailBox>
      <div className="body" style={{ height: '100%' }}>
        {!text && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="group">
            <div className="reply-inner" style={{ display: 'flex', alignItems: 'center' }}>
              <input
                style={{ padding: '1rem', width: '50vw', border: '3px solid #f2f2f2', margin: '1rem' }}
                type="text"
                placeholder="Blog Title"
                value={state.title}
                onChange={titleHandle}
              />
            </div>
          </div>
        )}
        <div className="group">
          <RichTextEditor placeholder="Type your Content..." value={state.desc} onChange={onChanges} />
          <input
            type="text"
            placeholder="Author"
            value={state.author}
            onChange={authorHandle}
            style={{ padding: '1rem', margin: '1rem', border: '3px solid #c2c2c2' }}
          />
        </div>
        <div className="left d-flex align-items-center" style={{ padding: '1rem', marginLeft: '2rem' }}>
          <Link to="#">
            <p style={{ color: '#000' }}>Upload Blog Image..</p>
            <Upload {...props}>
              {/* <FeatherIcon icon="paperclip" size={16} /> */}
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Link>
        </div>
      </div>
      {!text && (
        <div className="footer">
          <div className="left d-flex align-items-center"></div>
          <div className="right">
            {state.doc_key ? (
              <Button size="default" type="primary" onClick={onSubmit} raised>
                Send
              </Button>
            ) : (
              <Button disabled size="default" type="primary" onClick={onSubmit} raised>
                Send
              </Button>
            )}
          </div>
        </div>
      )}
    </MailBox>
  );
};

MailComposer.propTypes = {
  onChange: propTypes.func,
  onSend: propTypes.func,
  defaultTag: propTypes.string,
  replay: propTypes.bool,
  text: propTypes.bool,
};

export default MailComposer;
