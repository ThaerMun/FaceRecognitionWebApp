import React from 'react';


class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password: '',
            name: ''
        }
    }

        onNameChange = (event) => {
            this.setState({name:event.target.value});
        }
    
        onEmailChange = (event) => {
            this.setState({email:event.target.value});
        }
    
        onPasswordChange = (event) => {
            this.setState({password:event.target.value});
        }
    
        onSubmitSignIn = () => {
            fetch('https://shrouded-ravine-14330.herokuapp.com/register', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                   email: this.state.email,
                   password: this.state.password,
                   name: this.state.name
                    
                })
            })
            // console.log(this.state)
            .then(response => response.json())
            .then(user => {
                if(user.id){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
                // else if(data ==='error logging in'){
                //     alert('Invalid Credentials')
                // }
            })
    
        }
        render(){
        // const { onRouteChange } = this.props;
        return (
        <article className="h10 br4 ba dark-gray b--black-10 mv4  w-100 w-50-m w-25-l mw5 center shadow-5">
           <div action="sign-up_submit" method="get" acceptCharset="utf-8">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
            <div className="mt3">
                <label className="db fw6 lh-copy f6 black" htmlFor="name">Name</label>
                <input onChange = {this.onNameChange} className="b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80" type="name" name="name"  id="name"/>
            </div>
            <div className="mt3">
                <label className="db fw6 lh-copy f6 black" htmlFor="email-address">Email address</label>
                <input onChange = {this.onEmailChange} className="b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80" type="email" name="email-address"  id="email-address"/>
            </div>
            <div className="mt3">
                <label className="db fw6 lh-copy f6 black" htmlFor="password">Password</label>
                <input onChange = {this.onPasswordChange} className="b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80" type="password" name="password"  id="password"/>
            </div>
            </fieldset>
            <div onClick = {this.onSubmitSignIn} className="mt3"><input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 black" type="submit" value="Register"/></div>
            </div> 
        </article>  
        )
        }
} 

export default Register;