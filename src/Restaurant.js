import './Restaurant.css';
import { Component } from 'react';

class Restaurant extends Component{
  state = {popup : {name : this.props.name, switch : true}}
  render(){
    return(
      <div className="restaurant" onClick={() => this.props.popup(this.state.popup)}>
        <img src={this.props.img}></img>
        <p>{this.props.name}</p>
        <p className="state">สถานะ : <span>เปิดอยู่</span></p>
      </div>
    );
  }
}

export default Restaurant;