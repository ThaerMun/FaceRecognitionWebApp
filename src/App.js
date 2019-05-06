import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'
import Particles from 'react-particles-js';





const particlesOptions = {
  "particles": {
      "number": {
          "value": 200,
          "density": {
              "enable": true,
          }
      },
      "size": {
          "value": 3,
          "random": true,
          "anim": {
              "speed": 1,
              "size_min": 0.3
          }
      },
      "line_linked": {
          "enable": false
      },
      "move": {
          "random": true,
          "speed": 1,
          "direction": "top",
          "out_mode": "out"
      }
  },
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route : 'signin',
  isSignedIn: false,
  user: {
    id:'',
    name: '',
    password: '',
    email: '',
    entries: 0,
    Joined : ''
  }
}
class App extends Component {
  constructor(){
    super()
    this.state = initialState;
  }

loadUser = (data) => { 
  this.setState({user: {
      id:data.id,
      name: data.name,
      password: data.password,
      email: data.email,
      entries: data.entries,
      Joined : data.Joined,
    }
    })
  }


 calculateFaceLocation = (data) => {
  const faceMeasures = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  
  return {
    leftCol: faceMeasures.left_col * width,
    topRow: faceMeasures.top_row * height,
    rightCol: width - (faceMeasures.right_col * width),
    bottomRow: height -(faceMeasures.bottom_row * height)    
  } 
  }

  displayBox = (box)=>{
    // console.log(box)
    this.setState({box: box});
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input});
    fetch('https://shrouded-ravine-14330.herokuapp.com/imageurl', {
              method: 'post',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({
              input: this.state.input
                
            })
        })
    .then(response => response.json())  
    .then(response => {
      if (response){
        fetch('https://shrouded-ravine-14330.herokuapp.com/image', {
              method: 'put',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({
              id: this.state.user.id
                
            })
        })
      .then(response => response.json())
      .then(count =>{
        this.setState(Object.assign(this.state.user, {entries:count}))
        
      })
      .catch(console.log)
    }
      this.displayBox(this.calculateFaceLocation(response))
    })
      
    .catch(err => console.log(err))  
  }

    
    onRouteChange = (route) => {
      if(route === 'signout'){
        this.setState(initialState);
        // this.setState({isSignedIn : false});
      }
      else if (route === 'home'){
        this.setState({isSignedIn : true});
      }
      this.setState({route: route})
    }
    
  

  render() {
    const { route, isSignedIn, box, imageUrl } = this.state;
    return (
      <div className="App">
        <Particles className = 'particles'
        params={particlesOptions} />
        <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>
        { route === 'home' ?
          <div>
          <Rank name = {this.state.user.name} entries= {this.state.user.entries} />
          <Logo />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
          <FaceRecognition box = {box} imageUrl = {imageUrl}/>
          </div>
          :(route === 'signin' || route === 'signout')
          ?<SignIn loadUser ={this.loadUser} onRouteChange = {this.onRouteChange}/>
          :<Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
        }
        
      </div>
    );
  }
}

export default App;



