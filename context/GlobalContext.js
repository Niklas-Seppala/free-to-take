import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * @type {React.Context<{
 * user: {user_id: number, username: string, email: string, full_name: ?string, token: string},
 * setUser: React.Dispatch<{user_id: number, username: string, email: string, full_name: ?string}>,
 * apiAction: boolean,
 * apiActionComplete: () => void,
 * }>}
 */
const GlobalContext = React.createContext({});

const GlobalProvider = (props) => {
  // API call that invalidates previous fetch results.
  const [apiAction, setApiAction] = useState(false);
  const apiActionComplete = () => setApiAction(!apiAction);

  // User state and authentication
  const [user, setUser] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        apiAction,
        apiActionComplete,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node,
};

export { GlobalContext, GlobalProvider };
