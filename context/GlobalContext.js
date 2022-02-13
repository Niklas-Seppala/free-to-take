import React, { useState } from 'react';
import PropTypes from 'prop-types';

const GlobalContext = React.createContext({});

const GlobalProvider = (props) => {
  const [user, setUser] = useState({});
  const [apiAction, setApiAction] = useState(false);
  const apiActionComplete = () => setApiAction(!apiAction);

  return (
    <GlobalContext.Provider value={{ user, setUser, apiAction, apiActionComplete }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node,
};

export { GlobalContext, GlobalProvider };
