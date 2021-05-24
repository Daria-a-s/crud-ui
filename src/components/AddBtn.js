import React, { Component } from 'react';
import '../App.css';

export default class AddBtn extends Component {

  render() {
      return (
        <div className="addRow">
        <form onSubmit={this.props.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="name" onChange={this.props.handleChangeName} />
          </label>
          <label>
            Phone Number:
            <input type="text" name="phone" onChange={this.props.handleChangePhone} />
          </label>
          <label>
            Email:
            <input type="text" name="email" onChange={this.props.handleChangeEmail} />
          </label>
          <button type="submit" className="addBtn">Add</button>
        </form>
      </div>
      );
 }
 
}