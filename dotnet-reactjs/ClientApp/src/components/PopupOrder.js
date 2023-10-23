import { Component , useState } from 'react';

class PopupOrder extends Component{
    state = {order : {name : this.props.name, food : "", price : "", amount : "", textarea : ""}};
    render(){
      return (
        <div className="background">
          <div className="popup-order">
            <h2>{this.props.name}</h2>
            <from>
              <input 
                className="name" 
                type="text" 
                value={this.state.order.food} 
                placeholder="ชื่ออาหาร"
                onChange={(event) => this.setState({ order: {...this.state.order, food: event.target.value,},})}>
              </input>
              <input 
                className="price" 
                type="number" 
                value={this.state.order.price} 
                placeholder="ราคา"
                onChange={(event) => this.setState({ order: {...this.state.order, price: event.target.value,},})}>
              </input>
              <input 
                className="amount" 
                type="number" 
                value={this.state.order.amount} 
                placeholder="จำนวน"
                onChange={(event) => this.setState({ order: {...this.state.order, amount: event.target.value,},})}>
                </input>
              <input 
                value={this.state.order.textarea} 
                type="textarea" 
                placeholder="หมายเหตุ เช่น ไม่ใส่ผัก"
                onChange={(event) => this.setState({ order: {...this.state.order, textarea: event.target.value,},})}>
                </input>
              <button onClick={() => this.props.orderCallback(this.state.order)}>ใส่ตระกร้า</button>
            </from>
            <div className="close" onClick={() => this.props.popupCallback(false)}>&times;</div>
          </div>
        </div>
      );
    }
  }

export default PopupOrder;