import React from 'react';
import Spinner from 'components/Spinner';

const ComponentLoader = ({ isVisible }) => {
    if (!isVisible)
        return null;
    return (
        <div className="component-loader">
            <Spinner />
        </div>
    );
};

export default ComponentLoader;
