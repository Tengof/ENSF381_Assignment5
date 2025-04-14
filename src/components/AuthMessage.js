import React, { useContext } from 'react';
import { DisplayContext } from './LoginForm';
import DisplayStatus from './DisplayStatus';

const AuthMessage = () => {
    const { authMessage } = useContext(DisplayContext);
    return authMessage ? <DisplayStatus type={authMessage.type} message={authMessage.message} /> : null;
};

export default AuthMessage;
