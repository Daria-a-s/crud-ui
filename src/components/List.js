import React, { Component } from 'react';
import '../App.css';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

export default class List extends Component {
  state = {
    flag: true
  }
  render() {
      return (
        <tbody id="bodyOfTheTable">
        {this.props.people.map((item) => 
          <tr className = "listRow" key = {item._id} id={item._id} readOnly={true} >
              <td><input className="tableCell" id={"name"+item._id} defaultValue={item.data.name} readOnly={true}/></td>
              <td><input className="tableCell" id={"phone"+item._id} defaultValue={item.data.phone} readOnly={true}/></td>
              <td><input className="tableCell" id={"email"+item._id} defaultValue={item.data.email} readOnly={true}/></td>
              <td>
                <button className="delete" onClick={() => this.props.removeRow(item._id)}>
                  <DeleteOutlineOutlinedIcon/>
                </button>
                <button type="submit" className="edit" id={"icon"+item._id} onClick={(e) => this.props.editRow(item._id,e.target, this.state.flag)}>
                  <EditOutlinedIcon/>
                </button>
              </td>
          </tr>
        )}
        </tbody>
      );   
 }
}