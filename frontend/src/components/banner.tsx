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
            <div id='bannerLeft'>
                <div id='titleContainer'>
                    <Link to='/home' className='logo'>
                        Magellan
                    </Link>
                    <div id='tagline'>Explore the culinary world</div>
                </div>

                { props.location.pathname === '/home'
                  ? <p className='invisibleElement'></p>
                  : <Link to='/home'
                        className='linkButton'>
                            <span className='linkButtonText'>Back to the home page</span>
                    </Link>
                }
            </div>
            
            <div id='bannerRight'>
                { props.verified
                  ? <div>
                        <Link to='/user'
                            className='linkButton'>
                                <span id='userLinkButtonText' className='linkButtonText'>View your saved recipes</span>
                        </Link>
                        <button className='linkButton' onClick={props.logout}>
                            <span className='linkButtonText'>Sign Out</span>
                        </button>
                    </div>
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
        </div>
    );
}

export default withRouter(Banner);
