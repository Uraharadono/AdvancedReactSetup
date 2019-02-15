import React from 'react';
import ajax from 'common/ajax';
import axios from 'axios';

function* fetchData({ data }) {
    try {
        // for testing purposes this "data" object will always be empty object "{}"
        const response = yield ajax.get('/api/users', data);
        return response;
    } catch (ex) {
        // handle error here
        console.log(ex);
    }
}

class PageTwo extends React.Component {
    componentDidMount() {
        // const response = ajax.get('/api/users', { });
        // console.log(response);
        // console.log(response.data);

        const data = fetchData({});
        console.log(data);

        // axios.get('https://reqres.in/api/users')
        //     .then((response) => {
        //         // handle success
        //         console.log(response);
        //         console.log(response.data);
        //     })
        //     .catch((error) => {
        //         // handle error
        //         console.log(error);
        //     })
        //     .then(() => {
        //         // always executed
        //     });
    }

    render() {
        return (
            <h1>Page two</h1>
        );
    }
}

export default PageTwo;
