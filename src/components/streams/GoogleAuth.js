import React, { Component } from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../../actions';
class GoogleAuth extends Component{
   

    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:'607806916391-1j1u6smi47baujn1n1pvea0t1hvl9ihu.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
             this.auth = window.gapi.auth2.getAuthInstance();
             this.onAuthChange(this.auth.isSignedIn.get());
             this.auth.isSignedIn.listen(this.onAuthChange);
            // console.log(this.state.isSignedIn)
            });
        });
    }

     
    onAuthChange =isSignedIn=>{
         if(isSignedIn){
             this.props.signIn(this.auth.currentUser.get().getId());
         }else{
             this.props.signOut()
         }
    }

    onSignInClick=()=>{
        this.auth.signIn()
    }

    onSignOutClick=()=>{
        this.auth.signOut();
    }

    rendeAuthButton(){
        console.log(this.props.isSignedIn)
       if(this.props.isSignedIn === null){
           return null;
       }else if(this.props.isSignedIn) {
        return (
         <button 
          onClick={this.onSignOutClick}
         className="ui red google button">
             <i className="google icon" />
             Sign Out
         </button>
        );
       }else {
        return(
            <button
            onClick={this.onSignInClick}
            className="ui red google button">
            <i className="google icon"/>
                Sign In With Google
            </button>
             );
       }
    }


    render(){
        return <div>{this.rendeAuthButton()}</div>;
    }
}

const mapStateToProps=state=>{
 return {isSignedIn:state.auth.isSignedIn};
};

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);



