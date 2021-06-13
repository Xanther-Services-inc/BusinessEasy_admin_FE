import React from 'react';

const AdminHome = () => {
    const bg = {
        height: '100%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
    }
    return (
        <img src="adminHome.svg" className={bg} alt="Admin Home Image" />
    )
}

export default AdminHome