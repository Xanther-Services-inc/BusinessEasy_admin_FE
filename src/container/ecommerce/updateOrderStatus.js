import React from 'react'
import axios from 'axios'

const updateOrderStatus = async (e) => {
    const order_id = e.target.id
    console.log(e.target.value);
    const status = e.target.value


    try{
        const data = await axios.patch(`${process.env.REACT_APP_API}/api/v1/b_manager/order-status`, {status: status, id: order_id})
    } catch(err) {
        console.log(err);
    }

}

export default updateOrderStatus