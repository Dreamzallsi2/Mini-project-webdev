import './Ordered.css';
import { Component } from 'react';

class Ordered extends Component {
    render() {
        return (
            <div className="ordered">
                <div className="title">
                    <p>ชื่อร้าน</p>
                    <p>เมนู</p>
                    <p>ราคา</p>
                    <p>จำนวน</p>
                    <p>ระบุ</p>
                </div>
                <div className="detail">
                    <h3 className="name">{this.props.content.user.name}</h3>
                    <div>
                        {this.props.content.list_ordered.map((ordered) => <div>
                            <p>{ordered.name}</p>
                            <p>{ordered.food}</p>
                            <p>{ordered.price}</p>
                            <p>{ordered.amount}</p>
                            <p>{ordered.textarea}</p>
                        </div>)}
                    </div>
                    <h3 className="total">{this.props.content.total}</h3>
                    {!this.props.content.state && <h3 class="state-off">รอ</h3>}
                    {this.props.content.state && <h3 class="state-on">สำเร็จ</h3>}
                </div>
            </div>
        );
    }
}

export default Ordered;