import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import { UserCard } from '../style';
import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import FontAwesome from 'react-fontawesome';
import Axios from 'axios';
import swal from 'sweetalert';


const UserCards = ({ user }) => {
  const { email, country, phone, firstName, lastName, gender, user_type  } = user;

  const deleteUser = (email) => {
    try {
      const del = Axios.delete(`${process.env.REACT_APP_API}/api/v1/user/delete/${email}`)
      swal("Congratulation!", "Employee Deleted Successfully", "warning")

    window.location.reload()
    } catch(err){
      console.log(err);
    window.location.reload()
    }
  }

  return (
    <UserCard>
      <div className="card user-card">
        <Cards headless>
          
          <figcaption>
            <div className="card__content">
              <Heading className="card__name" as="h6">
                <Link to={`/admin/users/grid/${email}`}>{firstName + ' ' + lastName}</Link>
              </Heading>
              <span className="card__designation">({user_type})</span><br />
              <span className="card__designation">{email}</span><br />
              <span className="card__designation">{phone}</span><br />
              <span className="card__designation">{gender}</span><br />
              <span className="card__designation">{country}</span>

            </div>
            <div>
            <Link onClick={() => deleteUser(email)} className="btn-icon instagram" to="#">
                  <FontAwesome name="trash" />
                </Link>
            </div>
          </figcaption>
        </Cards>
      </div>
    </UserCard>
  );
};

UserCards.propTypes = {
  user: PropTypes.object,
};

export default UserCards;
