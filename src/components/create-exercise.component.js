import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import axios from 'axios';

export default class CreateExercise extends Component {
  constructor(props){
    super(props);

    this.state = {
      fields:{
        "username":'',
        "description": '',
        "duration": 0,
        "date": new Date(),
      },
      users:[]
    }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/users/')
    .then(response =>{
      if(response.data.length > 0){
        let fields = {...this.state.fields};
        fields["username"]= response.data[0].username;
        this.setState({
          users: response.data.map(user => user.username),
          fields  
          }
        );  
      }
    })
  }

  onChange(field,e){
    let fields = {...this.state.fields};
    if(field ==='date'){
      fields[field] = e
    }
    else{
      fields[field] = e.currentTarget.value;        
    }
    this.setState({fields});
    //   this.setState({
    //     username: e.target.value
    //   })
  }

  onSubmit(e){
    e.preventDefault();

    const exercise = {
      username :this.state.fields["username"],
      description :this.state.fields["description"],
      duration :this.state.fields["duration"],
      date :this.state.fields["date"]
    }

    // console.log(exercise);
    //to be submitted to database
    axios.post('http://localhost:5000/exercises/add', exercise)
    .then(res => console.log(res.data))
    .catch(err => console.log("Error"+err));
    // window.location = '/'; //redirect to home page
  }

  render() { 
    return ( 
      <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.fields['username']}
              onChange={this.onChange.bind(this,'username')}>
              {
                this.state.users.map((user) =>{
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.fields['description']}
              onChange={this.onChange.bind(this,'description')}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="number" 
              className="form-control"
              value={this.state.fields['duration']}
              onChange={this.onChange.bind(this,'duration')}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.fields['date']}
              onChange={this.onChange.bind(this,'date')}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div> 
    );
  }
}
