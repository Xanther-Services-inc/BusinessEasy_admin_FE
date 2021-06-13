import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserCard } from '../style';
import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import FontAwesome from 'react-fontawesome';
import Axios from 'axios';

const UserCardStyle = ({ user }) => {
  const { email, country, phone, firstName, lastName, gender, user_type } = user;

  const deleteOrder = (email) => {
    try {
      const del = Axios.delete(`${process.env.REACT_APP_API}/api/v1/user/delete/${email}`)
    } catch(err){
      console.log(err);
    }
  }
  return (
    <UserCard>
      <div className="card user-card theme-grid-2">
        <Cards headless>
          <figure>
            

            <figcaption>
              
              <div className="card__bottom">
                <div className="card__content">
                  <Heading className="card__name" as="h6">
                    <Link to={`/admin/users/grid-style/${email}`}>{firstName + ' ' + lastName}</Link>
                  </Heading>
                  <p className="card__designation">({user_type})</p>
                  <p className="card__designation">{email}</p>
                  <p className="card__designation">{phone}</p>
                  <p className="card__designation">{gender}</p>
                  <p className="card__designation">{country}</p>

                </div>
              </div>
              <div>
            <Link onClick={() => deleteOrder(email)} className="btn-icon instagram" to="#">
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

UserCardStyle.propTypes = {
  user: PropTypes.object,
};

export default UserCardStyle;
