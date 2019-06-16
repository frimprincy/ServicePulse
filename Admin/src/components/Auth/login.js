import React,{Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBInput } from 'mdbreact';
import firebase from 'firebase'

class SignIn extends Component {
    state={
        email:'',
        password:''
    }

    handleChange=(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    })
    }

    submitHandler=(e)=>{
       e.preventDefault();

       firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(()=>{
           alert("Login Success")
       })
       .catch((error)=>{
           console.log(error)
       })
    }

    render(){
  return (
    <div style={{flex:1, }} >
    <div className='container' style={{marginLeft:450,marginTop:120}}>
    <form>
    <MDBContainer >
      <MDBRow>
        <MDBCol md="6">
          <MDBCard
            className="card-image"
            style={{
              backgroundImage:
                "url(https://mdbootstrap.com/img/Photos/Others/pricing-table7.jpg)",
              width:390,
              
            }}
          >
            <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
              <div className="text-center">
                <h3 className="white-text mb-5 mt-4 font-weight-bold">
                  <strong>LOG</strong>
                  <a href="#!" className="green-text font-weight-bold">
                    <strong> IN</strong>
                  </a>
                </h3>
              </div>
              <MDBInput value={this.state.email} label="Your email" group type="text" onChange={this.handleChange} name='email' required />
              <MDBInput value={this.state.password} label="Your password" group type="password" onChange={this.handleChange} name='password' required />
              <div className="md-form pb-3">
               
              </div>
              <MDBRow className="d-flex align-items-center mb-4">
                <div className="text-center mb-3 col-md-12">
                  <MDBBtn
                    color="success"
                    rounded
                    type="submit"
                    className="btn-block z-depth-1"

                    onClick={this.submitHandler}
                  >
                    Sign in
                  </MDBBtn>
                </div>
              </MDBRow>
              <MDBCol md="12">
              </MDBCol>
            </div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </form>
    </div>
    </div>
  );
}
};

export default SignIn;