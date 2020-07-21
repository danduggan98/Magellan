import React, { FunctionComponent } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import '../styles/banner.css'

interface Props extends RouteComponentProps {
    verified: boolean,
    auth_error: string,
    logout: () => Promise<void>
}

const Banner: FunctionComponent<Props> = (props) => {
    return (
        <div id='logoBanner'>
            <Link to='/home' className='logo'>
                MAGELLAN
            </Link>

            { props.verified
              ? <Link to='/user' className='loginButton'>View Your Saved Recipes</Link>
              : <div></div>
            }

            { props.verified
              ? <button className='logoutButton' onClick={props.logout}>Log Out</button>
              : <Link
                    to={{
                        pathname: '/login',
                        state: { source: props.location.pathname }
                    }}
                    className='loginButton'>
                        Log In
                </Link>
            }
        </div>
    );
}

export default withRouter(Banner);
