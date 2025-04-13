import React from 'react';

const DisplayStatus = ({ type, message }) => (
    <div style={{
        padding: '10px',
        color: type === 'success' ? 'green' : 'red',
        backgroundColor: type === 'success' ? '#d4edda' : '#f8d7da',
        border: `1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
        borderRadius: '4px',
        marginBottom: '10px'
    }}>
        {message}
    </div>
);

export default DisplayStatus;
