import React from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Image } from 'antd';
// import { Dropdown } from '../../home/OrderCreate/dependency/dropdown';

const FileListCard = ({ doc }) => {
  const download = () => {
    window.location.href = doc;
  };
  return (
    <Cards>
      <div className="file-list">
        <div className="file-list__single d-flex">
          <div className="file-single-info d-flex">
            <div className="file-single-logo">
              <Image src={doc} alt="File Logo" height={40} width={80} style={{ cursor: 'pointer' }} />
            </div>
            <div className="file-single__content">
              <span className="file-content-action">
                <Link onClick={download}>Download</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Cards>
  );
};

export default FileListCard;
