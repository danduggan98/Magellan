import React, { Component, FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import BeatLoader from 'react-spinners/BeatLoader';
import { Redirect, Link, RouteComponentProps } from 'react-router-dom';
import '../styles/authPage.css';

interface RegisterRouterProps {
    source: string
}

interface Props extends RouteComponentProps<RegisterRouterProps>{
    verified: boolean
}

interface State {
    email:                string,
    password:             string,
    confirmPassword:      string,
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
                    <div className='authError' key={err}>
                        {err}
                    </div>
                )
              : <p className='invisibleElement'></p>
            }
        </div>
    );
}

export default class Register extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            email:                '',
            password:             '',
            confirmPassword:      '',
            errors:               [],
            redirectAfterSumbit:  false,
            submissionInProgress: false
        };
    }

    //Store the most recent inputs in state
    updateInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let { id, value } = event.currentTarget;

        switch(id) {
            case 'email':
                this.setState({
                    email: value
                });
                break;
            case 'password':
                this.setState({
                    password: value
                });
                break;
            case 'confirmPassword':
                this.setState({
                    confirmPassword: value
                });
                break
            ;
        }
    }

    //Submit the form and save any errors that might have returned
    submitPage = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        this.setState({
            submissionInProgress: true
        })

        const inputs = JSON.stringify({
            email:           this.state.email,
            password:        this.state.password,
            confirmPassword: this.state.confirmPassword
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
                const response = await fetch('/auth/register', options);
                const errors: string[] = await response.json();
                
                if (!errors.length) {
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
            console.log('Error submitting registration form:', err);
        }
    }

    render() {
        //Already signed in
        if (this.props.verified) {
            return (
                <div>
                    <Helmet>
                        <title>{'Magellan - Register'}</title>
                    </Helmet>

                    <div className='alreadyAuthorizedNotice'>
                        You already have an account!

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
            return (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { source: destination }
                    }}>
                </Redirect>
            );
        }

        return (
            <div className='authWrapper'>
                <Helmet>
                    <title>{'Magellan - Register'}</title>
                </Helmet>
                
                <div className='authHeader'>Create an account</div>

                <form
                    name='registerForm'
                    onSubmit={this.submitPage}>

                    <div className='authInputWrapper'>
                        <input
                            className='authInput'
                            id='email'
                            name='email'
                            type='text'
                            autoComplete='off'
                            placeholder='Email Address'
                            value={this.state.email}
                            onChange={this.updateInput}>
                        </input>

                        <input
                            className='authInput'
                            id='password'
                            name='password'
                            type='password'
                            autoComplete='off'
                            placeholder='Password'
                            value={this.state.password}
                            onChange={this.updateInput}>
                        </input>

                        <input
                            className='authInput'
                            id='confirmPassword'
                            name='confirmPassword'
                            type='password'
                            autoComplete='off'
                            placeholder='Confirm Password'
                            value={this.state.confirmPassword}
                            onChange={this.updateInput}>
                        </input>
                    </div>

                    <div className='authLink'>
                        Already have an account?&nbsp;
                        <Link
                            to={{
                                pathname: '/login',
                                state: { source: destination }
                            }}>
                                Log in here
                        </Link>
                    </div>

                    <div className='authSubmitButtonWrapper'>
                        <button
                            type='submit'
                            className='linkButton'>
                                <span className='linkButtonText'>Submit</span>
                        </button>
                    </div>
                </form>

                { this.state.submissionInProgress
                  ? <div className='authorizingNotice'>
                        Registering
                        <BeatLoader size={16} margin={6}/>
                    </div>
                  : <div className='authErrorList'>
                        <ErrorList errorList={this.state.errors}/>
                    </div>
                }
            </div>
        );
    }
}
