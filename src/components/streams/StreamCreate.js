import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createStream} from '../../actions';
class StreamCreate extends Component{
    

    renderError=({error,touched})=>{
       if(error && touched){
        return (
            <div className="ui error massage">
           <div className="header">{error}</div>
            </div>
        );
       }
    }


    renderInput=({input,label, meta})=>{ 
        //console.log(formProps)
        //console.log("metaa",meta.touched)
        const className=`field ${meta.error && meta.touched ? 'error' : ''}`;
     console.log(className)
        console.log(meta)
      return (
          <div className={className}>
              <label>{label}</label>
        <input {...input} autoComplete='off'/>
      {this.renderError(meta)}
      </div>
      );
    }

     onSubmit = formValues => {
         this.props.createStream(formValues)
      //console.log(formValues)
        //   event.preventDefault();
     };

    render(){
      
    return (
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <form>
           <Field name="title" label="Enter Title" component={this.renderInput}/>
           <Field name="description" label="Enter Description" component={this.renderInput}/>
          </form>
          <button className="ui button primary">Submit</button>
          </form>
        
    )
 }
}
const validate=(formValues)=>{
    const errors={};
    if(!formValues.title){
       errors.title="you must enter title";
    }

    if(!formValues.description){
        errors.description="you must enter description";
     }
     return errors;
}
const formWrapped = connect()(reduxForm({
    form:'streamCreate',
    validate
})(StreamCreate));

export default connect(null,{createStream})(formWrapped);