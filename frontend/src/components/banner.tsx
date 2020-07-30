import React, { FunctionComponent } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import '../styles/banner.css';

interface Props extends RouteComponentProps {
    verified: boolean,
    auth_error: string,
    logout: () => Promise<void>
}

const Banner: FunctionComponent<Props> = (props) => {
    return (
        <div id='banner'>
            <Link to='/home' className='logo'>
                Magellan
            </Link>

            { props.verified
              ? props.location.pathname === '/user'
                ? <Link to='/home' id='homeLink'>Back to the home page</Link>
                : <Link to='/user' id='userLink'>View Your Saved Recipes</Link>
              : <div></div>
            }

            { props.verified
              ? <button id='logoutButton' onClick={props.logout}>Log Out</button>
              : <Link
                    to={{
                        pathname: '/login',
                        state: { source: props.location.pathname }
                    }}>
                    <button className='loginButton'>
                        <span id='loginButtonText'>Sign In</span>
                    </button>
                </Link>
            }
        </div>
    );
}

export default withRouter(Banner);
