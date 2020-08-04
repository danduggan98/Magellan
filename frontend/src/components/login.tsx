import React, { Component, FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import BeatLoader from 'react-spinners/BeatLoader';
import { Redirect, Link, RouteComponentProps } from 'react-router-dom';
import '../styles/login.css';

interface LoginRouterProps {
    source: string
}

interface Props extends RouteComponentProps<LoginRouterProps> {
    verified: boolean,
    updateLoginStatus: () => Promise<void>
}

interface State {
    email:                string,
    password:             string,
    errors:               string[],
    redirectAfterSumbit:  boolean,
    submissionInProgress: boolean
};

interface ErrorListProps {
    errorList: string[]
}

const ErrorList: FunctionComponent<ErrorListProps> = (props) => {
    return (
        <div>
            { props.errorList.length
              ? props.errorList.map(err =>
                    <div className='loginError' key={err}>
                        {err}
                    </div>
                )
              : <p className='invisibleElement'></p>
            }
        </div>
    );
}

export default class Login extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.updateLoginStatus = props.updateLoginStatus;
        this.state = {
            email:                '',
            password:             '',
            errors:               [],
            redirectAfterSumbit:  false,
            submissionInProgress: false
        };
    }

    updateLoginStatus() {}

    //Store the most recent inputs in state
    updateInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let { id, value } = event.currentTarget;

        id === 'email'
          ? this.setState({
                email: value
            })

          : this.setState({
                password: value
            })
        ;
    }

    //Submit the form and save any errors that might have returned
    submitPage = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        this.setState({
            submissionInProgress: true
        })

        const inputs = JSON.stringify({
            email:    this.state.email,
            password: this.state.password
        });

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: inputs
        };

        try {
            (async() => {
                const response = await fetch('/auth/login', options);
                const errors: string[] = await response.json();
                
                if (!errors.length) {
                    this.updateLoginStatus();
                    this.setState({
                        redirectAfterSumbit:  true,
                        submissionInProgress: false
                    });
                }
                else {
                    this.setState({
                        errors,
                        submissionInProgress: false
                    });
                }
            })();
        }
        catch (err) {
            console.log('Error submitting login form:', err);
        }
    }

    render() {
        //Already signed in
        if (this.props.verified) {
            return (
                <div>
                    <Helmet>
                        <title>{'Magellan - Sign In'}</title>
                    </Helmet>

                    <div id='alreadyLoggedInNotice'>
                        You are already signed in

                        <div>
                            Click&nbsp;
                            <span>
                                <Link to='/home'>
                                    here
                                </Link>
                            </span>
                            &nbsp;to return to the home page
                        </div>
                    </div>
                </div>
            )
        }

        //Determine where to redirect after submission
        const location = this.props.location.state as any;
        const destination = location ? location.source : '/home';
        
        //Successful submission - move on
        if (this.state.redirectAfterSumbit) {
            return (<Redirect to={destination} />);
        }

        return (
            <div id='loginWrapper'>
                <Helmet>
                    <title>{'Magellan - Sign In'}</title>
                </Helmet>
                
                <div id='loginHeader'>Sign In</div>

                <form
                    name='loginForm'
                    onSubmit={this.submitPage}>

                    <div id='inputWrapper'>
                        <input
                            className='input'
                            id='email'
                            name='email'
                            type='text'
                            autoComplete='off'
                            placeholder='Email Address'
                            value={this.state.email}
                            onChange={this.updateInput}>
                        </input>

                        <input
                            className='input'
                            id='password'
                            name='password'
                            type='password'
                            autoComplete='off'
                            placeholder='Password'
                            value={this.state.password}
                            onChange={this.updateInput}>
                        </input>
                    </div>

                    <div id='registerLink'>
                        Don't have an account yet?&nbsp;
                        <Link
                            to={{
                                pathname: '/register',
                                state: { source: destination }
                            }}>
                                Register here
                        </Link>
                    </div>

                    <div id='submitButtonWrapper'>
                        <button
                            type='submit'
                            id='submitButton'
                            className='linkButton'>
                                <span className='linkButtonText'>Submit</span>
                        </button>
                    </div>
                </form>

                { this.state.submissionInProgress
                  ? <div id='loggingInNotice'>
                        Logging In
                        <BeatLoader size={16} margin={6}/>
                    </div>
                  : <div id='errorList'>
                        <ErrorList errorList={this.state.errors}/>
                    </div>
                }
            </div>
        );
    }
}
