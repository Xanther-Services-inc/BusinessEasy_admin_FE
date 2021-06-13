import React from 'react';
import { Progress, Tag } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { ProjectCard } from './style';

const GridCard = ({values}) => {
  // const { id, title, status, content, percentage } = value;
  const {id,product_id, firstName, lastName, zip,email, country, doc_key, gender, satate, city, dob, payment, price, phone, pan, status,dueDate, endDate,startDate, emp_assigned} = values;
  return (
    <ProjectCard>
      <Cards headless>
        <div className="project-top">
          <div className="project-title">
            <h1>
              <Link to={`/admin/ecommerce/orders/${id}`}>{firstName + ' ' + lastName}</Link>
              <Tag className="status">{status}</Tag>
            </h1>
           
          </div>
          <p className="project-desc">Email: {email}</p>
          <p className="project-desc">Phone No: {phone}</p>
          <p className="project-desc">Product Name: {product_id}</p>

          <div className="project-timing">
            <div>
              <span>Order Date</span>
              <strong>{startDate}</strong>
            </div>
            <div>
              <span>Deadline</span>
              <strong>{endDate.length !==0 ? endDate : "NA" }</strong>
            </div>
          </div>
          
        </div>
        <div className="project-bottom">
          <div className="project-assignees">
            <p>Assigned To</p>
            <ul>
              <li>
                <p>{emp_assigned.length !== 0 ? emp_assigned : 'NA'}</p>
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
