import React, {useState} from "react";
import {Avatar, Button, Container, Grid,  Paper, Typography} from "@material-ui/core";
import {GoogleLogin} from "react-google-login";
import useStyles from "./styles.js";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input.js";
import Icon from "./icon.js";
import { gapi } from "gapi-script";
import { useDispatch  } from "react-redux";
import { useHistory } from "react-router-dom";
import dotenv from "dotenv";

const Auth = () => {
  const classes = useStyles(); 
  const [isSignUp, setIsSignUp] = useState(false);
  const handleSubmit = ()=> {};
  const handleChange  = ()=> {};
  const handlePasswordShow  = ()=>  setShowPassword(! showPassword);
  const handleConfirmPasswordShow  = ()=>  setShowConfirmPassword(! showConfirmPassword);
  const switchMode = ()=> {setIsSignUp(!isSignUp)};
  const dispatch =  useDispatch();
  const history = useHistory(); 
  dotenv.config();

  const googleSuccessFunction = async(res)=> {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({type:"AUTH", data: {result, token}});
      history.push("/");


    } catch(error) {
      console.log(error);
    }
     
  };
  const googleFailureFunction = (error)=> {
    console.log(error );
    console.log("Google Sign In was unsuccessful. Try again later");
  };
  
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId: process.env.GOOGLE_CLIENT_ID,
      plugin_name: "chat",
    });
  });
  

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3} >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography variant="h5"> {isSignUp ? "Sign Up": "Sign In"} </Typography>
        <form className={classes.form} onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            {
              isSignUp && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                  <Input name="firstName" label="First Name" handleChange={handleChange} half/>

                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange}  type="email"/>
            <Input name="password" label="Password" handleChange={handleChange}  type={showPassword?"text": "password"} handlePasswordShow= {handlePasswordShow} />
            { isSignUp &&
              <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange}  type={showConfirmPassword?"text": "password"} handlePasswordShow= {handleConfirmPasswordShow} />
            }
          </Grid>
          
          <Button type="submit" fullWidth variant="contained" color="primary" className= {classes.submit}>
            {isSignUp? "Sign Up" : "Sign In" }
          </Button>
          <GoogleLogin
            clientId= {process.env.GOOGLE_CLIENT_ID}
            render={(renderProps)=> (
              <Button  className={classes.googleButton} color="primary"  fullWidth onClick={renderProps.onClick}  disabled = {renderProps.disabled}  startIcon = {<Icon/>}  variant="contained" > Google Sign In </Button>
            )}
            onSuccess={ googleSuccessFunction}
            onFailure={googleFailureFunction}
            cookiePolicy= "single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp? "Already have an account? Sign in" : "Don't have an account? Sign up"}
              </Button>
            </Grid>

          </Grid>

        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
