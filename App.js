import GoogleLogin from "react-google-login";

function App() {
  const responseSuccessGoogle = (response) =>{
    console.log(response)
    fetch("http://localhost:6000/api/googlelogin" , {
      mathod : "POST" , 
      headers :{
        Accept : 'application/json',
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({tokenId : response.tokenId})
    }).then(data => data.json)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  }
  const responseErrorGoogle = (response) =>{
    console.log("dsv")
    return console.log("fvf")
  }
  return (
    <div>
      <GoogleLogin
            clientId="755167565369-uipdr17ogav41u2c07aodc1t22svemb2.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
          />
    </div>
  );
}

export default App;
