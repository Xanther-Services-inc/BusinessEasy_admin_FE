import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import Content from './Content';

const Inbox = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [searchData, email] = useSelector(state => [state.headerSearchData, state.email.allMessage]);
  return (
    <Content
      email={email.filter(value => {
        return value.type === 'inbox';
      })}
      searchData={searchData}
    />
  );
};

export default Inbox;
