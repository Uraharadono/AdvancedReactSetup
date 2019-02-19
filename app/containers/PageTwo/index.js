/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React, { Fragment } from 'react';
import ajax from 'common/ajax';
import ComponentLoader from 'components/ComponentLoader';

class PageTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            items: []
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        let data = {};
        ajax.get('/api/users')
            .then((serverData) => {
                console.log(serverData);
                data = serverData;

                this.setState({
                    isLoading: false,
                    items: serverData.data
                });
            });
        // If you are confused why this console log is showing "undefined" or "null" educate yourself about asynchronous programming and promises in javascript
        console.log(data);
    }

    render() {
        return (
            <Fragment>
                <h1>Page two</h1>
                <ComponentLoader isVisible={this.state.isLoading} />
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.items.map((item) => (
                                <tr key={item.id}>
                                    <td className="col-2">{item.first_name}</td>
                                    <td className="col-2">{item.last_name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

export default PageTwo;
