import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import '../styles/banner.css'

interface Props {
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
              : <Link to='/login' className='loginButton'>Log In</Link>
            }
        </div>
    );
}

export default Banner;
