import './DeriveryOrdered.css';
import { Component } from 'react';

class DeriveryOrdered extends Component {
    render() {
        return (
            <div className="derivery-ordered">
                <div className="title">
                    <p>ชื่อร้าน</p>
                    <p>เมนู</p>
                    <p>ราคา</p>
                    <p>จำนวน</p>
                    <p>ระบุ</p>
                </div>
                <div className="detail">
                    <section>
                        <h4 className="name">{this.props.content.user.name}</h4>
                        <p className="tel">เบอร์: {this.props.content.user.tel}</p>
                        <p className="addr">ที่อยู่: {this.props.content.user.address}</p>
                    </section>
                    <div>
                        {this.props.content.list_ordered.map((ordered) => <div className="detail-order">
                            <p>{ordered.name}</p>
                            <p>{ordered.food}</p>
                            <p>{ordered.price}</p>
                            <p>{ordered.amount}</p>
                            <p>{ordered.textarea}</p>
                        </div>)}
                    </div>
                    <h3 className="total">{this.props.content.total}</h3>
                    <h3 className="state" onClick={() => this.props.id(this.props.content.id)}>รับ</h3>
                </div>
            </div>
        );
    }
}

export default DeriveryOrdered;