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

            { props.location.pathname === '/home'
              ? props.verified
                ? <Link to='/user'
                    className='linkButton'>
                        <span className='linkButtonText'>View Your Saved Recipes</span>
                  </Link>
                : <p className='invisibleElement'></p>
              : <Link to='/home'
                    className='linkButton'>
                        <span className='linkButtonText'>Back to the home page</span>
                </Link>
            }

            { props.verified
              ? <button className='linkButton' onClick={props.logout}>
                    <span className='linkButtonText'>Sign Out</span>
                </button>
              : <Link
                    to={{
                        pathname: '/login',
                        state: { source: props.location.pathname }
                    }}
                    className='linkButton'>
                        <span className='linkButtonText'>Sign In</span>
                </Link>
            }
        </div>
    );
}

export default withRouter(Banner);
