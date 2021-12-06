import React from 'react';
import { Progress, Tag } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { ProjectCard } from './style';
var _ = require('lodash');

const GridCard = ({ values }) => {
  // const { id, title, status, content, percentage } = value;
  const { id, email, payment, price, status, startDate, emp_assigned, payment_id, product_id } = values;

  const image = _.get(values, 'image.image');
  const order_data = _.get(values, 'order_data');
  // console.log(order_data);
  // console.log(values);

  return (
    <ProjectCard>
      <Cards headless>
        <div className="project-top">
          <div className="project-title">
            <h1>
              <Link to={`/admin/ecommerce/orders/${id}`}>{email}</Link>
              <Tag className="status">{status}</Tag>
            </h1>
          </div>
          {/* <p className="project-desc">Email: {email}</p> */}
          {/* <p className="project-desc">Phone No: {phone}</p> */}
          <p className="project-desc">Product Name: {product_id}</p>
          <p className="project-desc">Payment: {payment}</p>

          <div className="project-timing">
            <div>
              <span>Order Date</span>
              <strong>{startDate}</strong>
            </div>
            {/* <div>
              <span>Deadline</span>
              <strong>{endDate.length !== 0 ? endDate : 'NA'}</strong>
            </div> */}
          </div>
        </div>
        <div className="project-bottom">
          <div className="project-assignees">
            <p>Assigned To</p>
            <ul>
              <li>
                <p>{emp_assigned}</p>
              </li>
            </ul>
          </div>
        </div>
      </Cards>
    </ProjectCard>
  );
};

GridCard.propTypes = {
  value: PropTypes.object,
};

export default GridCard;
