import React, { Component } from 'react';
import axios from 'axios';

class CreateUsers extends Component {
  constructor(props){
    super(props);

    this.state = {
      fields:{
        "username":'',
      },
    }
  }
  onChange(field,e){
    let fields = {...this.state.fields};
    fields[field] = e.currentTarget.value;        
    this.setState({fields});
    //   this.setState({
    //     username: e.target.value
    //   })
  }
  onSubmit(e){
    e.preventDefault();

    const user = {
      username :this.state.fields["username"]
    }

    axios.post('http://localhost:5000/users/add', user)
    .then(res => console.log(res.data))
    .catch(err => console.log("Error"+err));
    //to be submitted to database
    window.location = '/'; //redirect to home page
  }
  render() { 
    return ( <div>
               <h3>Create New User</h3>
               <form onSubmit={this.onSubmit.bind(this)}>
                 <div className="form-group"> 
                   <label>Username: </label>
                   <input  type="text"
                       required
                       className="form-control"
                       value={this.state.fields['username']}
                       onChange={this.onChange.bind(this,'username')}
                       />
                 </div>
             
                 <div className="form-group">
                   <input type="submit" value="Create User" className="btn btn-primary" />
                 </div>
               </form>
             </div> );
  }
}
 
export default CreateUsers;
