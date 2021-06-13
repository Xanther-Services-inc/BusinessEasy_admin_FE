import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import { UserCard } from '../style';
import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';
import Axios from 'axios';
import swal from 'sweetalert';

const TeamCard = ({ user }) => {
  const { email, country, phone, firstName, lastName, gender, user_type } = user;

  const deleteEmp = async (email) => {
    try {
      const {data} = await Axios.delete(`${process.env.REACT_APP_API}/api/v1/employee/delete/${email}`)
      swal("Congratulation!", "Employee Deleted Successfully", "warning")

    window.location.reload()
    } catch(err){
      
      window.location.reload()
    }
  }
  const deleteBManager = async (email) => {
    try {
      const {data} = await Axios.delete(`${process.env.REACT_APP_API}/api/v1/b_manager/delete?email=${email}`)
      swal("Congratulation!", "Employee Deleted Successfully", "warning")

    window.location.reload()
    } catch(err){
      
      window.location.reload()
    }
  }

  return (
    <UserCard>
      <div className="card team-card">
        <Cards headless>
          <figure>
            
            <figcaption>
              
              <Heading className="card__name" as="h6">
                <Link to={`/admin/users/team/${email}`}>{firstName + ' ' + lastName}</Link>
              </Heading>
              <span className="card__designation">({user_type})</span><br />
              <span className="card__designation">{gender}</span><br />
              <span className="card__designation">{email}</span><br />
              <span className="card__designation">{phone}</span><br />
              <span className="card__designation">{country}</span>

              <div className="card__social">
                <Link onClick={() => user_type === 'b_manager' ? deleteBManager(email) : deleteEmp(email)} className="btn-icon instagram" to="#">
                  <FontAwesome name="trash" />
                </Link>
              </div>
            </figcaption>
          </figure>
        </Cards>
      </div>
    </UserCard>
  );
};

TeamCard.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.node,
};

export default TeamCard;
