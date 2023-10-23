import './App.css';
import { Component , useState} from 'react';

<<<<<<< Updated upstream
class Restaurant extends Component{
  state = {popup : {name : this.props.name, switch : true}}
  render(){
    return(
      <div class="restaurant" onClick={() => this.props.popupCallback(this.state.popup)}>
        <img src={this.props.img}></img>
        <p>{this.props.name}</p>
        <p class="state">สถานะ : <span>เปิดอยู่</span></p>
      </div>
    );
=======
class Ordered extends Component {
  handleOrderReceived = () => {
    this.props.onOrderReceived(this.props.content.username);
    
>>>>>>> Stashed changes
  }
}

class Ordered extends Component{
  render(){
    return (
      <div class="ordered">
        <div class="title">
          <p>ชื่อร้าน</p>
          <p>เมนู</p>
          <p>ราคา</p>
          <p>จำนวน</p>
          <p>ระบุ</p>
        </div>
<<<<<<< Updated upstream
        <div class="detail">
          <h3 class="name">{this.props.content.username}</h3>
          <div>
          {this.props.content.list_ordered.map((ordered) =>  <div>
                                                  <p>{ordered.name}</p> 
                                                  <p>{ordered.food}</p> 
                                                  <p>{ordered.price}</p> 
                                                  <p>{ordered.amount}</p> 
                                                  <p>{ordered.textarea}</p>
                                                </div>)}
=======
        <div className="detail">
          <h3 className="name">ชื่อผู้สั่ง:{this.props.content.username} <br></br>เบอร์โทร:{this.props.content.phon}<br></br>ที่อยู่:{this.props.content.adress}</h3>
          
          <div>
            {this.props.content.list_ordered.map((ordered) => (
              <div key={ordered.name}>
                <p>{ordered.name}</p>
                <p>{ordered.food}</p>
                <p>{ordered.price}</p>
                <p>{ordered.amount}</p>
                <p>{ordered.textarea}</p>
                
              </div>
            ))}
>>>>>>> Stashed changes
          </div>
          <h3 class="total">{this.props.content.total}</h3>
          {this.props.content.state === false && <h3 class="state">รอ</h3>}
        </div>
      </div>
    );
  }
}

<<<<<<< Updated upstream
class Order extends Component{
  render(){
    return (
      <div class="order">
        <div class="list">
=======
class Ordered_Received extends Component {
  render() {
    return this.props.content.state === true ? (
      <div className="ordered">
        <div className="title">
          <p>ชื่อร้าน</p>
          <p>เมนู</p>
          <p>ราคา</p>
          <p>จำนวน</p>
          <p>ระบุ</p>
        </div>
        <div className="detail">
        <h3 className="name">ชื่อผู้สั่ง:{this.props.content.username} <br></br>เบอร์โทร:{this.props.content.phon}<br></br>ที่อยู่:{this.props.content.adress}</h3>
>>>>>>> Stashed changes
          <div>
            <p class="title">ชื่อร้าน</p>
            <p class="ret">{this.props.content.name}</p>
          </div>
          <div>
            <p class="title">เมนู</p>
            <p class="ret">{this.props.content.food}</p>
          </div>
          <div>
            <p class="title">ราคา</p>
            <p class="ret">{this.props.content.price}</p>
          </div>
          <div>
            <p class="title">จำนวน</p>
            <p class="ret">{this.props.content.amount}</p>
          </div>
          <div>
            <p class="title">ระบุ</p>
            <p class="ret">{this.props.content.textarea}</p>
          </div>
        </div>
        <div class="total">
            <p class="title">รวม</p>
            <p class="ret">{this.props.content.price * this.props.content.amount}</p>
        </div>
      </div>
    );
  }
}

class PopupOrder extends Component{
  state = {order : {name : this.props.name, food : "", price : "", amount : "", textarea : ""}};
  render(){
    return (
      <div class="background">
        <div class="popup-order">
          <h2>{this.props.name}</h2>
          <from>
            <input 
              class="name" 
              type="text" 
              value={this.state.order.food} 
              placeholder="ชื่ออาหาร"
              onChange={(event) => this.setState({ order: {...this.state.order, food: event.target.value,},})}>
            </input>
            <input 
              class="price" 
              type="number" 
              value={this.state.order.price} 
              placeholder="ราคา"
              onChange={(event) => this.setState({ order: {...this.state.order, price: event.target.value,},})}>
            </input>
            <input 
              class="amount" 
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
          <div class="close" onClick={() => this.props.popupCallback(false)}>&times;</div>
        </div>
      </div>
    );
  }
}

function App(){ 
  const [username, setUsername] = useState("");
  const [usertel, setUsertel] = useState("");
  const [userlocation, setUserlocation] = useState("");
  
  const [namerestuarant, setNamerestuarant] = useState("");

  const [switchpopup, setSwitchpopup] = useState(false);
  const [switchorder, setSwitchorder] = useState(false);
  const [switchprofile, setSwitchprofile] = useState(true);

<<<<<<< Updated upstream
  const [list_order, setListOrderrder] = useState([]);
  const [list_ordered, setListOrderrdered] = useState([]);
=======
  const [initialSampleOrders, setInitialSampleOrders] = useState([
    {
      id:'1',
      username: 'John',
      phon:'0810871167' ,
      adress:'วัดหนองสิว',
      list_ordered: [
        { name: 'ร้าน A', food: 'ก๋วยเตี๋ยว', price: 50, amount: 2, textarea: 'ไม่ใส่ผัก' },
        { name: 'ร้าน B', food: 'ผัดผัก', price: 60, amount: 1, textarea: 'ไม่ใส่รสเจียว'},
      ],
      total: 160,
      state: false,
    },
    {
      id:'2',
      username: 'Alice',
      phon:'0810871167',
      adress:'วัดเขาอีโต้',
      list_ordered: [
        { name: 'ร้าน C', food: 'ข้าวมันไก่', price: 40, amount: 1, textarea: 'เผ็ดน้อย' },
      ],
      total: 40,
      state: false,
    },
  ]);
>>>>>>> Stashed changes

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
        <div class="logo">
          <img src="https://www.gstatic.com/android/keyboard/emojikitchen/20230418/u1faa4/u1faa4_u1f35a.png"></img>
          <h3>Bitfood</h3>
        </div>
        <div>
          <img class="order-img" onClick={() => setSwitchorder(!switchorder)} src="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/53157/shopping-cart-emoji-clipart-md.png"></img>
          {switchorder && <div class="order-box">
            {list_order.map(order => (<Order content={order}/>))}
            {list_order.length > 0 && <button onClick={() => submitOrder(list_order)}>สั่งเลย</button>}
            {list_order.length === 0 && <p class="warn">ไม่มีอาหารในตระกร้า</p>}
          </div>}
          <img class="profile-img" onClick={() => setSwitchprofile(!switchprofile)} src="https://icon-library.com/images/customer-login-icon/customer-login-icon-8.jpg"></img>
          {switchprofile && <div class="profile-box">
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
      <div class="content">
        <div class="mode">
          <p class="deposit">ฝากซื้อ</p>
          <p class="derivery">รับฝาก</p>
        </div> 
        <div class="canteen">
          <h3>ร้านอาหาร</h3>
          <div class="scroll-c">
            <Restaurant popupCallback={(data) => setSwitch(data)} name="ร้านอาหาร" img="https://img.wongnai.com/p/1968x0/2019/02/11/c9eb14ff78184602be77d65eef6379b8.jpg"/>
            <Restaurant popupCallback={(data) => setSwitch(data)} name="ร้านอาหาร" img="https://img.wongnai.com/p/1920x0/2018/09/21/5a6610a0832349e69db9fa40d0793c7c.jpg"/>
            <Restaurant popupCallback={(data) => setSwitch(data)} name="ร้านอาหาร" img="https://img.wongnai.com/p/1968x0/2019/02/11/c9eb14ff78184602be77d65eef6379b8.jpg"/>
            <Restaurant popupCallback={(data) => setSwitch(data)} name="ร้านอาหาร" img="https://img.wongnai.com/p/1968x0/2019/02/11/c9eb14ff78184602be77d65eef6379b8.jpg"/>
            <Restaurant popupCallback={(data) => setSwitch(data)} name="ร้านอาหาร" img="https://img.wongnai.com/p/1968x0/2019/02/11/c9eb14ff78184602be77d65eef6379b8.jpg"/>
            <Restaurant popupCallback={(data) => setSwitch(data)} name="ร้านอาหาร" img="https://img.wongnai.com/p/1968x0/2019/02/11/c9eb14ff78184602be77d65eef6379b8.jpg"/>
        </div>
        </div>
        <div class="ordered">
          <h3>รายการสั่งซื้อ</h3>
          <div class="scroll-p">
            {list_ordered.map(ordered => (<Ordered content={ordered}/>))}
            {list_ordered.length === 0 && <p class="warn">ไม่มีรายการสั่งซื้อ</p>}
          </div>
        </div>
      </div>
      {switchpopup && <PopupOrder name={namerestuarant} orderCallback={(data) => addListOrder(data)} popupCallback={(data) => setSwitchpopup(data)}/>}
    </div>
  );
}

export default App;
