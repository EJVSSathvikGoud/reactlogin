import logo from './logo.svg';
import './App.css';
import GoogleLogin from 'react-google-login';
// import { response } from 'express';

function App() {
  const responseGoogle = (response) =>{
    console.log(response)
    return console.log("somring ")
  }
  return (
    <div className="App">
      hello eor
      <GoogleLogin
    clientId="801125525880-ol7ifi38t43diqavdcmatvu3n0cfjfua.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
    </div>
  );
}

export default App;
