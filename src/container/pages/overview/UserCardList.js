import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserCard } from '../style';
import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import FontAwesome from 'react-fontawesome';
import Axios from 'axios';

const UserCardList = ({ user }) => {
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
      <div className="card user-card theme-list">
        <Cards headless>
          <figure>
            

            <figcaption>
              <div className="card__content">
                <Heading className="card__name" as="h6">
                  <Link to={`/admin/users/list/${email}`}>{firstName + ' ' + lastName}</Link>
                </Heading>
                <p className="card__designation">({user_type})</p>
                <p className="card-text">{email}</p>
                <p className="card-text">{phone}</p>
                <p className="card-text">{gender}</p>
                <p className="card-text">{country}</p>
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

UserCardList.propTypes = {
  user: PropTypes.object,
};

export default UserCardList;
