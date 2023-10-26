import "./Ordered.css";
import { Component } from "react";

class Ordered extends Component {
  render() {
    return (
      <div>
        {!this.props.content.state && (
          <div className="list-ordered">
            <div className="head">
              <p>ชื่อ : {this.props.content.user.name}</p>
              <p>ที่อยู่ : {this.props.content.user.address}</p>
              <p>เบอร์โทรศัพท์ : {this.props.content.user.tel}</p>
            </div>
            <div className="data-order">
              <div className="title">
                <p>ชื่อร้าน</p>
                <p>เมนู</p>
                <p>ราคา</p>
                <p>จำนวน</p>
                <p className="title-des">ระบุ</p>
              </div>
              <div className="detail">
                {this.props.content.list_ordered.map((ordered) => (
                  <div>
                    <p>{ordered.name}</p>
                    <p>{ordered.food}</p>
                    <p>{ordered.price}</p>
                    <p>{ordered.amount}</p>
                    <p className="text-des">{ordered.textarea}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="footer">
              <h3 className="total">รวม {this.props.content.total} บาท</h3>
              <h3>( รออยู่ )</h3>
            </div>
          </div>
        )}
        {this.props.content.state && (
          <div className="complete-list-ordered">
            <div className="head">
              <p>ชื่อ : {this.props.content.user.name}</p>
              <p>ที่อยู่ : {this.props.content.user.address}</p>
              <p>เบอร์โทรศัพท์ : {this.props.content.user.tel}</p>
            </div>
            <div className="data-order">
              <div className="title">
                <p>ชื่อร้าน</p>
                <p>เมนู</p>
                <p>ราคา</p>
                <p>จำนวน</p>
                <p className="title-des">ระบุ</p>
              </div>
              <div className="detail">
                {this.props.content.list_ordered.map((ordered) => (
                  <div>
                    <p>{ordered.name}</p>
                    <p>{ordered.food}</p>
                    <p>{ordered.price}</p>
                    <p>{ordered.amount}</p>
                    <p className="text-des">{ordered.textarea}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="footer">
              <h3 className="total">รวม {this.props.content.total} บาท</h3>
              <h3>( รับแล้ว )</h3>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Ordered;
