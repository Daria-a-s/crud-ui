import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import List from './components/List';
import ListHeader from './components/ListHeader';
import AddBtn from './components/AddBtn';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      curName: '',
      name: '',
      phone: '',
      email: '',
      flag: false,
      people: []
    }
  };

  componentDidMount() {
    axios.get('http://178.128.196.163:3000/api/records')
      .then(res => {
        const people = res.data;
        this.setState({people});
      })
  }

  handleChangeName = event => {
    this.setState({ name: event.target.value });
  }

  handleChangePhone = event => {
    this.setState({ phone: event.target.value });
  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  }

  handleSubmit = event => {
      event.preventDefault();

      const data = {
          name: this.state.name,
          phone: this.state.phone,
          email: this.state.email
      }

      const form = event.target;
      form.reset()

      axios.put('http://178.128.196.163:3000/api/records', {data})
        .then(
          res => {
          this.state.people.push(res.data);
          const people = this.state.people;
          this.setState({people});
        }
        )
  }

  removeRow = id => {
    axios.delete(`http://178.128.196.163:3000/api/records/${id}`)
      .then(() => {
        const people = this.state.people.filter(i => i._id !== id)
        this.setState({people});
      })
  }

  displayIcon = (id) => {
    
    if (this.state.flag) {
      this.state.flag = !this.state.flag
      ReactDOM.render(<EditOutlinedIcon/>, document.getElementById(`icon${id}`))
    }
      else {
        this.state.flag = !this.state.flag
        ReactDOM.render(<SaveOutlinedIcon/>, document.getElementById(`icon${id}`))
      } 
  }

  editRow = (id) => {
    this.displayIcon(id);
    const nameField = document.getElementById(`name${id}`)
    const phoneField = document.getElementById(`phone${id}`)
    const emailField = document.getElementById(`email${id}`)
    nameField.readOnly = !nameField.readOnly
    phoneField.readOnly = !phoneField.readOnly
    emailField.readOnly = !emailField.readOnly

    const index = this.state.people.findIndex(e=>e._id===id)
    this.state.people[index].data.name = document.getElementById(`name${id}`).value
    this.state.people[index].data.phone = document.getElementById(`phone${id}`).value
    this.state.people[index].data.email = document.getElementById(`email${id}`).value
    axios.post(`http://178.128.196.163:3000/api/records/${id}`, this.state.people[index])
    .then((res) => {
      const peoples = this.state.people;
      this.setState({peoples})
    })
  }

  render() {
    return (
      <div className="App">
        <table>
        <caption>CRUD Application</caption>
        <ListHeader />
        <List people={ this.state.people }
              removeRow={this.removeRow}
              editRow={this.editRow}
              flag={this.state.flag}
              curName={this.state.curName}
              displayIcon={this.displayIcon}/>
        </table>
        <AddBtn handleSubmit={ this.handleSubmit }
                handleChangeName={this.handleChangeName}
                handleChangePhone={this.handleChangePhone}
                handleChangeEmail={this.handleChangeEmail}/>
      </div>
    );
  }
}

export default App;
