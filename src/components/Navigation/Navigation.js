import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn){
    return (
        <nav style = {{display: 'flex',justifyContent: 'flex-end'}}>
            <p onClick = {() => onRouteChange('signout')} className = 'pa3 dim f3 pointer underline black link'>Signout</p>
        </nav>
    );
    }
    else{
        return(
            <nav style = {{display: 'flex',justifyContent: 'flex-end'}}>
            <p onClick = {() => onRouteChange('signin')} className = 'pa3 dim f3 pointer underline black link'>Signin</p>
            <p onClick = {() => onRouteChange('register')} className = 'pa3 dim f3 pointer underline black link'>Register</p>
            </nav>
        )
        }
}

export default Navigation;