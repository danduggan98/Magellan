import React, { Component } from 'react';

interface Props {
    verified: boolean
}

interface State {
    email: string
};

export default class User extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    render() {
        if (!this.props.verified) {
            return (
                <div>
                    <h3>You are not yet logged in</h3>
                    <h4>Click 
                        <a href={'/login'}> here </a>
                        to log in
                    </h4>
                </div>
            )
        }
    
        return (
            <div>GREAT SUCCESS!</div>
        );
    }
}
