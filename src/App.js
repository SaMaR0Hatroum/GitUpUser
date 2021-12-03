import React, { Component } from 'react'
import axios from 'axios';
import './App.css';


export default class App extends Component {

  constructor(props){
    super(props)
    this.state={
      data:[],
      username:"",
      name:[],
      avatar_url:'',
      email:'',
      login:'',
      location:'',
      notFound:'',
      repos:[]
    };

  }

  // componentDidMount=()=>this.fetchingData()

  fetchingData=()=>{
      
    axios.get(`http://api.github.com/users/${this.state.username}?client_id=&client_secret=&sort=created`)
        .then(res=>{

          console.log('sss',res.data)
          this.setState({avatar_url:res.data.avatar_url})
          this.setState({email:res.data.email})
          this.setState({login:res.data.login})
          this.setState({name:res.data.name})
          this.setState({location:res.data.location})
        })
        .catch(err=>console.log(err))

        axios.get(`http://api.github.com/users/${this.state.username}/repos?client_id=&client_secret=&sort=created`)
        .then(res=>{
          

          console.log('sss',res.data)
          this.setState({repos:res.data})
        })
        .catch(err=>console.log(err))


  }



 

 
  
onChange=e =>
this.setState({[e.target.name]:e.target.value})

onClick=e=>{
  e.preventDefault()
  console.log(this.state.username)
  this.fetchingData()

}


  
  render() {
    console.log(this.state.data,this.state.name)
    return (
      

      <div style={{margin:100}}>
        <input name='username' onChange={this.onChange}
                value={this.username} placeholder='GitHub user'/>
          <button onClick={this.onClick}>Show the user Details</button> 
          <img src={this.state.avatar_url}/> 
          <ul>
            <li>
              fullname:{this.state.name} 
              </li>
            <li>
              UserName:{this.state.login}
              </li>
              <li>
              Loction:{this.state.location}
              </li>
              <li>
              Email:{this.state.email}
              

            </li>
            
            </ul>    
        <ul>
        {this.state.repos.map(value=>
          
            <li key={value.id}><a href={value.html_url}>{value.name}</a><span>{value.description}</span></li>
          
       )}

      </ul>
     
        
        
        
       
        
        
      </div>
    )
  }
}
