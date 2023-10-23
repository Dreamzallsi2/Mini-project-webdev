import Order from './Order';
import Ordered from './Ordered';
import Restaurant from './Restuarant';
import PopupOrder from './PopupOrder';
import { Component , useState } from 'react';

function AppDeposit(){ 
    const [username, setUsername] = useState("");
    const [usertel, setUsertel] = useState("");
    const [userlocation, setUserlocation] = useState("");
    
    const [namerestuarant, setNamerestuarant] = useState("");
  
    const [switchpopup, setSwitchpopup] = useState(false);
    const [switchorder, setSwitchorder] = useState(false);
    const [switchprofile, setSwitchprofile] = useState(true);
  
    const [list_order, setListOrderrder] = useState([]);
    const [list_ordered, setListOrderrdered] = useState([]);
  
    const setSwitch = (data) => {
      setSwitchpopup(data.switch)
      setNamerestuarant(data.name)
    }
  
    const addListOrder = (data) => {
      setListOrderrder([data, ...list_order])
    }
  
    const submitOrder = (data) => {
      let sum = 0;
      data.forEach(order => {
        sum += order.price * order.amount;
      });
      let ordered = {username : username, list_ordered : data, total : sum, state : false}
      setListOrderrdered([ordered, ...list_ordered])
      setListOrderrder([])
    }
  
    return (
      <div>
        <nav>
          <div className="logo">
            <img src="https://www.gstatic.com/android/keyboard/emojikitchen/20230418/u1faa4/u1faa4_u1f35a.png"></img>
            <h3>Bitfood</h3>
          </div>
          <div>
            <img className="order-img" onClick={() => setSwitchorder(!switchorder)} src="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/53157/shopping-cart-emoji-clipart-md.png"></img>
            {switchorder && <div className="order-box">
              {list_order.map(order => (<Order content={order}/>))}
              {list_order.length > 0 && <button onClick={() => submitOrder(list_order)}>สั่งเลย</button>}
              {list_order.length === 0 && <p className="warn">ไม่มีอาหารในตระกร้า</p>}
            </div>}
            <img className="profile-img" onClick={() => setSwitchprofile(!switchprofile)} src="https://icon-library.com/images/customer-login-icon/customer-login-icon-8.jpg"></img>
            {switchprofile && <div className="profile-box">
              <p>ชื่อผู้ใช้</p> 
              <input 
                type="text" 
                value={username} 
                onChange={(event) => setUsername(event.target.value)}>
              </input>
              <p>เบอร์โทรศัพท์</p> 
              <input 
                type="tel" 
                value={usertel} 
                onChange={(event) => setUsertel(event.target.value)}>
              </input>
              <p>สถานที่จัดส่ง</p> 
              <input 
                type="text" 
                value={userlocation} 
                onChange={(event) => setUserlocation(event.target.value)}>
              </input>
            </div>}
          </div>
        </nav>
        <div className="content">
          <div className="mode">
            <p className="deposit">ฝากซื้อ</p>
            <p className="derivery">รับฝาก</p>
          </div> 
          <div className="canteen">
            <h3>ร้านอาหาร</h3>
            <div className="scroll-c">
              <Restaurant popupCallback={(data) => setSwitch(data)} name="ร้านอาหาร" img="https://img.wongnai.com/p/1968x0/2019/02/11/c9eb14ff78184602be77d65eef6379b8.jpg"/>
              <Restaurant popupCallback={(data) => setSwitch(data)} name="ร้านอาหาร" img="https://img.wongnai.com/p/1920x0/2018/09/21/5a6610a0832349e69db9fa40d0793c7c.jpg"/>
              <Restaurant popupCallback={(data) => setSwitch(data)} name="ร้านอาหาร" img="https://img.wongnai.com/p/1968x0/2019/02/11/c9eb14ff78184602be77d65eef6379b8.jpg"/>
              <Restaurant popupCallback={(data) => setSwitch(data)} name="ร้านอาหาร" img="https://img.wongnai.com/p/1968x0/2019/02/11/c9eb14ff78184602be77d65eef6379b8.jpg"/>
              <Restaurant popupCallback={(data) => setSwitch(data)} name="ร้านอาหาร" img="https://img.wongnai.com/p/1968x0/2019/02/11/c9eb14ff78184602be77d65eef6379b8.jpg"/>
              <Restaurant popupCallback={(data) => setSwitch(data)} name="ร้านอาหาร" img="https://img.wongnai.com/p/1968x0/2019/02/11/c9eb14ff78184602be77d65eef6379b8.jpg"/>
          </div>
          </div>
          <div className="ordered">
            <h3>รายการสั่งซื้อ</h3>
            <div className="scroll-p">
              {list_ordered.map(ordered => (<Ordered content={ordered}/>))}
              {list_ordered.length === 0 && <p className="warn">ไม่มีรายการสั่งซื้อ</p>}
            </div>
          </div>
        </div>
        {switchpopup && <PopupOrder name={namerestuarant} orderCallback={(data) => addListOrder(data)} popupCallback={(data) => setSwitchpopup(data)}/>}
      </div>
    );
  }
  
  export default AppDeposit;