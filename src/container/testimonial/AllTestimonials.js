import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Cards } from '../../components/cards/frame/cards-frame';
import { ProjectCard } from '../ecommerce/orders/style';
import FeatherIcon from 'feather-icons-react'
import Axios from 'axios';
import swal from 'sweetalert';

const Testimonials = ({values}) => {
  const handleDelete = async (id) => {
    const {data} = await Axios.delete(`${process.env.REACT_APP_API}/api/v1/testimonial/delete?id=${id}`)
    .then(swal("Deleted!", "Testimonial Deleted Successfully.", "warning"))
    .then(window.location.reload())
  }
  const {id, name, message, doc_key} = values;
  return (
    <ProjectCard>
      
      <Cards headless>
      <Link to={`/admin/testimonial/${id}`}>
        <div className="project-top">
          <div className="project-title">
            <h1>
              {name}
            
            </h1>
           
          </div>
         
          <p className="project-desc"><b>Message:</b> {message.length > 25 ? message.substring(0,25) + '..' : message}</p>
 
        </div>
        </Link>
        
      <FeatherIcon onClick={() => handleDelete(id)} style={{marginLeft: '7rem', cursor: 'pointer'}} icon='trash' />
      </Cards>
      
      
    </ProjectCard>
  );
};

Testimonials.propTypes = {
  value: PropTypes.object,
};

export default Testimonials;
