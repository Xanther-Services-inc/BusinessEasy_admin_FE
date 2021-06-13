import React, { useEffect, useState } from 'react';
import {Row, Col, Image} from 'antd';
import PropTypes from 'prop-types';
import Heading from '../../components/heading/heading';
import Axios from 'axios';


const FaqDetails = ({match}) => {
 
    const [faqDetails, setFaqDetails] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await Axios.get(`${process.env.REACT_APP_API}/api/v1/faq?id=${match.params.id}`)
            
            setFaqDetails(data)
        }
        fetchData()
    }, [])

  const { id, ques, ans } = faqDetails;

  return (

    <div className="product-details-box__right pdbr" style={{padding: '2rem'}}>
        <br />
    
        <Heading className="pdbr__title" as="h2">
        {ques}
      </Heading> 
     
      {/* <p className="pdbr__desc">Id: {id}</p> */}
      <p className="pdbr__desc">Answer: {ans}</p>
     
    
    </div>
  );
};

FaqDetails.propTypes = {
  product: PropTypes.object,
};

export default FaqDetails;
