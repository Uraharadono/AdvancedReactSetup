import React from 'react';
import ajax from 'common/ajax';

class PageTwo extends React.Component {
    componentDidMount() {
        let data = {};
        ajax.get('/api/users')
            .then((serverData) => {
                console.log(serverData);
                data = serverData;
            });
        // If you are confused why this console log is showing "undefined" or "null" educate yourself about asynchronous programming and promises in javascript
        console.log(data);
    }

    render() {
        return (
            <h1>Page two</h1>
        );
    }
}

export default PageTwo;
