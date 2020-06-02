import React, {Component} from 'react';
import {registerUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

class Register extends Component {
  state = {
    username: '',
    password: '',
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  submitFormHandler = async event => {
    event.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password, 
    }
    await this.props.registerUser(userData);
  };

  getFieldError = fieldName => {
    try {
      return this.props.error.errors[fieldName].properties.message;
    } catch (e) {
      return undefined;
    }
  };

  render() {
    return (
      <>
      <Grid container justify='center' style={{position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', padding: '0 16px'}}>
         <Grid item xs sm={6} md={4} lg={3}>
           <Paper elevation={3} style={{ border: '1px solid rgba(0, 0, 0, 0.23)'}}>
             <Box style={{position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fff'}} px={1}>
               <Typography variant="h4">Register</Typography>
             </Box>
             <Box py={5} px={2}>
               <form onSubmit={this.submitFormHandler}>
                 <Grid container direction='column' spacing={2}>
                   <Grid item xs>
                   <FormElement
                      propertyName="username"
                      title="Login"
                      type='text'
                      value={this.state.username}
                      onChange={this.inputChangeHandler}
                      error={this.getFieldError('username')}
                      autoComplete="new-username"
                    />
                   </Grid>
                   <Grid item xs>
                   <FormElement
                      propertyName="password"
                      title="Password"
                      type="password"
                      value={this.state.password}
                      onChange={this.inputChangeHandler}
                      error={this.getFieldError('password')}
                      autoComplete="new-password"
                    />
                   </Grid>
                   <Grid item xs>
                     <Button fullWidth type="submit" color="primary" variant="contained">Sign In</Button>
                   </Grid>
                 </Grid>
               </form>
             </Box>
           </Paper>
         </Grid> 
       </Grid>
     </>
    );
  }
}

const mapStateToProps = state => ({
  error: state.users.registerError,
  loading: state.users.registerLoading,
});

const mapDispatchToProps = dispatch => ({
  registerUser: userData => dispatch(registerUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);