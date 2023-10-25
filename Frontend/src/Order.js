import './Order.css';
import { Component } from 'react';

class Order extends Component {
    render() {
        return (
            <div className="order">
                <div className="list">
                    <div>
                        <p className="title">ชื่อร้าน</p>
                        <p className="ret">{this.props.content.name}</p>
                    </div>
                    <div>
                        <p className="title">เมนู</p>
                        <p className="ret">{this.props.content.food}</p>
                    </div>
                    <div>
                        <p className="title">ราคา</p>
                        <p className="ret">{this.props.content.price}</p>
                    </div>
                    <div>
                        <p className="title">จำนวน</p>
                        <p className="ret">{this.props.content.amount}</p>
                    </div>
                    <div>
                        <p className="title">ระบุ</p>
                        <p className="ret">{this.props.content.textarea}</p>
                    </div>
                </div>
                <div className="total">
                    <p className="title">รวม</p>
                    <p className="ret">{this.props.content.price * this.props.content.amount}</p>
                </div>
            </div>
        );
    }
}

export default Order;