import "./App.css";
import { useState, useEffect } from "react";
import Restaurant from "./Restaurant";
import Order from "./Order";
import Ordered from "./Ordered";
import DeriveryOrdered from "./DeriveryOrdered";

function App() {
  const [user, setUser] = useState({ name: "", tel: "", address: "" });
  const [order, setOrder] = useState({
    name: "",
    food: "",
    price: "",
    amount: "",
    textarea: "",
  });

  const [Switch, setSwitch] = useState({
    login: false,
    mode: true,
    popup: false,
    order: false,
    profile: false,
    disable: true,
  });

  const [list_order, setListOrder] = useState([]);
  const [list_ordered, setListOrdered] = useState([]);

  const restaurantCallback = (data) => {
    setSwitch({ ...Switch, popup: !Switch.popup });
    setOrder({ ...order, name: data.name });
  };

  const idCallback = (id) => {
    console.log(id);
    putData({ id: id });
  };

  const addOrder = () => {
    if (!order.food || !order.price || !order.amount || !order.textarea) {
      alert("กรุณากรอกข้อมูลให้ครบ");
    } else if (order.food === "" || order.price <= 0|| order.amount <= 0 || order.textarea === "") {
      alert("กรุณากรอกข้อมูลให้ถูกต้อง");
    } else{
      setListOrder([order, ...list_order]);
      setOrder({});
      setSwitch({ ...Switch, popup: false });
    }
  };

  const clearOrder = () => {
    setListOrder([]);
  };

  const submitOrder = async () => {
    let sum = 0;
    list_order.forEach((order) => {
      sum += order.price * order.amount;
    });
    let ordered = {
      id: 0,
      user: user,
      list_ordered: list_order,
      total: sum,
      state: false,
    };

    try {
      const response = await fetch("https://localhost:7031/api/Management", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ordered),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("POST_Response:", responseData);

      const successMessage = responseData.message;
      if (successMessage) {
        alert(successMessage);
      }

      setSwitch({ ...Switch, order: false });

      await getOrdered();
      setListOrder([]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function getOrdered() {
    fetch("https://localhost:7031/api/Management", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("GET_Response:", responseData.reverse());
        const compareFunction = (a, b) => {
          return a.state - b.state;
        };
        const sortedData = responseData.sort(compareFunction);
        console.log("GET_Response (sorted):", sortedData);
        setListOrdered(sortedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setListOrder([]);
  }

  async function putData(dataToPut) {
    console.log("dataToPut", dataToPut);

    try {
      const response = await fetch(
        `https://localhost:7031/api/Management/${dataToPut.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToPut),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("PUT_Response:", responseData);
      await getOrdered();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getOrdered();
  }, []);

  useEffect(() => {
    console.log("UF ---- list_ordered", list_ordered);
  }, [list_ordered]);

  function setDatauser(mode) {
    if (user.name === "" || user.tel === "" || user.address === "") {
      alert("กรุณากรอกข้อมูลให้ครบ");
    } else {
      if (!isNaN(user.tel) && user.tel.length === 10) {
        if ('login' === mode) {
          setSwitch({ ...Switch, login: true });
        }
        if ('profile' === mode) {
          setSwitch({ ...Switch, profile: false ,disable: true}); 
        }
      }
      else{
        alert("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง");
      }
    }
  }

  return (
    <div>
      <nav>
        <div className="logo">
          <img src="https://www.gstatic.com/android/keyboard/emojikitchen/20230418/u1faa4/u1faa4_u1f35a.png"></img>
          <h3>Bitfood</h3>
        </div>
        <div>
          <img
            className="order-img"
            onClick={() => setSwitch({ ...Switch, order: !Switch.order })}
            src="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/53157/shopping-cart-emoji-clipart-md.png"
          ></img>
          {Switch.order && (
            <div className="order-box">
              {list_order.map((order) => (
                <Order content={order} />
              ))}
              {list_order.length > 0 && (
                <button className="submit" onClick={() => submitOrder()}>สั่งเลย</button>
              )}
              {list_order.length > 0 && (
                <button className="clear" onClick={() => clearOrder()}>ลบเลย</button>
              )}
              {list_order.length === 0 && (
                <p className="warn">ไม่มีอาหารในตระกร้า</p>
              )}
            </div>
          )}
          <img
            className="profile-img"
            onClick={() => setSwitch({ ...Switch, profile: !Switch.profile ,disable: true})}
            src="https://icon-library.com/images/customer-login-icon/customer-login-icon-8.jpg"
          ></img>
          {Switch.profile && (
            <div className="profile-box">
              <p>ชื่อผู้ใช้</p>
              <input
                type="text"
                value={user.name}
                maxLength="50"
                disabled={Switch.disable}
                onChange={(event) =>
                  setUser({ ...user, name: event.target.value })
                }
              ></input>
              <p>เบอร์โทรศัพท์</p>
              <input
                type="text"
                value={user.tel}
                maxLength="10"
                pattern="[0-9]*"
                disabled={Switch.disable}
                onChange={(event) => setUser({ ...user, tel: event.target.value })}
                placeholder="เบอร์โทรศัพท์"
              >
              </input>
              <p>สถานที่จัดส่ง</p>
              <input
                type="text"
                value={user.address}
                maxLength="100"
                disabled={Switch.disable}
                onChange={(event) =>
                  setUser({ ...user, address: event.target.value })
                }
              ></input>
              {Switch.disable && <button onClick={() => setSwitch({...Switch, disable : false})}>แก้ไข</button>}
              {!Switch.disable && <button onClick={() => { setDatauser('profile'); }}>ยืนยัน</button>}
            </div>
          )}
        </div>
      </nav>

      {Switch.mode && (
        <div className="content">
          <div className="mode">
            <p
              className="deposit-dep"
              onClick={() => setSwitch({ ...Switch, mode: true })}
            >
              ฝากซื้อ
            </p>
            <p
              className="derivery-dep"
              onClick={() => setSwitch({ ...Switch, mode: false })}
            >
              รับฝาก
            </p>
          </div>
          <div className="canteen">
            <h3>ร้านอาหาร</h3>
            <div className="scroll-c">
              <Restaurant
                popup={(data) => restaurantCallback(data)}
                name="เทคโนอินเตอร์"
                img="https://scontent.fbkk5-1.fna.fbcdn.net/v/t1.15752-9/395365327_861929221913396_7727230728942930506_n.png?_nc_cat=109&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeE4ptvEQjsDla3WutiLu8rzWhlFRevGQtFaGUVF68ZC0fsMrq8gQ0JDkZhDLbDC3Epo64TJP0pc0zGKSQVWcFU1&_nc_ohc=-iNc-QXLuVQAX8d3BYP&_nc_ht=scontent.fbkk5-1.fna&oh=03_AdQVLW1KBEPZ0fokgihOwPI_twvrjVY4W17MhgI1_zm-uQ&oe=6561E2C5"
              />
              <Restaurant
                popup={(data) => restaurantCallback(data)}
                name="ป้าศรีส้มตำ"
                img="https://scontent.fbkk5-7.fna.fbcdn.net/v/t1.15752-9/394754407_1065108754666301_1417025034369168130_n.png?_nc_cat=108&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGftm_zCjsiWIZ6cMU4jRfpbM84oKQZ7Z5szzigpBntnpFQcjYpJ-Tp__5QkGWlj1jGSq4xk-Su2DoFe3AlGlq0&_nc_ohc=JcrxoHY77K8AX-fVMeO&_nc_ht=scontent.fbkk5-7.fna&oh=03_AdQtPe65DE9IY1UuqU27cvx9GqlVsvwR5qeMKEGyl9xEZw&oe=6562065A"
              />
              <Restaurant
                popup={(data) => restaurantCallback(data)}
                name="มิลเลียน"
                img="https://scontent.fbkk5-4.fna.fbcdn.net/v/t1.15752-9/395419828_1725305167962193_1508481534290307203_n.png?_nc_cat=110&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFru26FH8FdagLEqWiYMTofrD5GA6ZlxY-sPkYDpmXFj0zqn1mhI8yQi59QhSqe1ROkJdWCkgWOIspkq1yIVbs_&_nc_ohc=aQrF-U41RAgAX8jbpDW&_nc_ht=scontent.fbkk5-4.fna&oh=03_AdTwo_MEDO5mS2V6IxytwtXoCnn6dYu1W0RPZPEz_XLVrw&oe=6561EF99"
              />
              <Restaurant
                popup={(data) => restaurantCallback(data)}
                name="มามา ก๋วยเตี๋ยวเรือ"
                img="https://scontent.fbkk5-4.fna.fbcdn.net/v/t1.15752-9/368009785_1046591240026899_1335720757019985755_n.png?_nc_cat=103&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGcHrIt5v77VfHCtrY52r7fUrjLQ1j8qK1SuMtDWPyorSgGOShRFYQOhqZO_-CjnAPPKWz80boFDsmXNJezs5II&_nc_ohc=Sw34MyIDRcUAX-OWHC4&_nc_ht=scontent.fbkk5-4.fna&oh=03_AdRtLR1nveqYCBMonaKgWrggciJGJB-Wf6q6vAfdQoOmAA&oe=6561E5AB"
              />
              <Restaurant
                popup={(data) => restaurantCallback(data)}
                name="ไอเย็น"
                img="https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.15752-9/395253976_313907771388175_1578966722489484995_n.png?_nc_cat=105&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeE_EJb7XegW6vwV9tcXsfMq840uGxt6fp_zjS4bG3p-n1POXRoavZRulcQMQwG-QkT2bKGeoTDrXlqgKpYC8sDy&_nc_ohc=oWGwbbXfb30AX-eG5Qa&_nc_ht=scontent.fbkk5-3.fna&oh=03_AdRuRhAR6_Fs9tlegg5qLoN96o7FFuSB_M3Su0CDoWxYgg&oe=656206F7"
              />
              <Restaurant
                popup={(data) => restaurantCallback(data)}
                name="กาแฟสด&น้ำปั่น"
                img="https://scontent.fbkk5-5.fna.fbcdn.net/v/t1.15752-9/395725462_347454514482399_2797602311165418096_n.png?_nc_cat=104&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGdbUq8LA0eAdm-0nwtCYbdJMEJ76Z-g58kwQnvpn6Dn9RTYWApqf_DE-FOuDHEdmPiydRDbrt1IdB2RVAiAT1S&_nc_ohc=XTdpGx7l1PkAX90v0AA&_nc_ht=scontent.fbkk5-5.fna&oh=03_AdTWU19csz-DJN9KaHqHGzQZG2J8f9h5Yd-MR60vEgNR5g&oe=6561FF6C"
              />
            </div>
          </div>
          <div className="ordered">
            <h3>รายการสั่งซื้อ</h3>
            <div className="scroll-p">
              {list_ordered.map((ordered) => (
                <Ordered content={ordered} />
              ))}
              {list_ordered.length === 0 && (
                <p className="warn">ไม่มีรายการสั่งซื้อ</p>
              )}
            </div>
          </div>
        </div>
      )}

      {!Switch.mode && (
        <div className="content">
          <div className="mode">
            <p
              className="deposit-der"
              onClick={() => setSwitch({ ...Switch, mode: true })}
            >
              ฝากซื้อ
            </p>
            <p
              className="derivery-der"
              onClick={() => setSwitch({ ...Switch, mode: false })}
            >
              รับฝาก
            </p>
          </div>
          <div className="derivery-ordered">
            <h3>รายการสั่งซื้อ</h3>
            <div className="scroll-p">
              {list_ordered.map((ordered) => (
                <DeriveryOrdered
                  content={ordered}
                  id={(id) => idCallback(id)}
                />
              ))}
              {list_ordered.length === 0 && (
                <p className="warn">ไม่มีรายการสั่งซื้อ</p>
              )}
            </div>
          </div>
        </div>
      )}

      {Switch.popup && (
        <div className="background">
          <div className="popup-order">
            <h2>ร้าน{order.name}</h2>
            <from>
              <input
                className="name"
                type="text"
                value={order.food}
                placeholder="ชื่ออาหาร"
                onChange={(event) =>
                  setOrder({ ...order, food: event.target.value })
                }
              ></input>
              <input
                className="price"
                type="number"
                value={order.price}
                placeholder="ราคา"
                onChange={(event) => {
                  const inputValue = event.target.value;
                  if (inputValue.length <= 4) {
                    setOrder({ ...order, price: inputValue });
                  }
                }}
              ></input>
              <input
                className="amount"
                type="number"
                value={order.amount}
                placeholder="จำนวน"
                onChange={(event) => {
                  const inputValue = event.target.value;
                  if (inputValue.length <= 2) {
                    setOrder({ ...order, amount: inputValue });
                  }
                }}
              ></input>
              <input
                value={order.textarea}
                type="textarea"
                placeholder="หมายเหตุ เช่น ไม่ใส่ผัก (ไม่มีให้ใส่ว่า ไม่มี)"
                onChange={(event) =>
                  setOrder({ ...order, textarea: event.target.value })
                }
              ></input>
              <button onClick={() => addOrder()}>ใส่ตระกร้า</button>
            </from>
            <div
              className="close"
              onClick={() => setSwitch({ ...Switch, popup: false })}
            >
              &times;
            </div>
          </div>
        </div>
      )}
      {!Switch.login && <div className="background-login">
        <div className="popup-login">
          <div className="logo">
            <img src="https://www.gstatic.com/android/keyboard/emojikitchen/20230418/u1faa4/u1faa4_u1f35a.png"></img>
            <h1>Bitfood</h1>
          </div>
          <input value={user.name}
            type="text" 
            placeholder="ชื่อผู้ใช้" 
            maxLength="50"
            onChange={(event) => setUser({ ...user, name: event.target.value })}
            ></input>
          <input value={user.tel}
            type="text" 
            placeholder="เบอร์โทรศัพท์" 
            maxLength="10" 
            pattern="[0-9]*"
            onChange={(event) => setUser({ ...user, tel: event.target.value })}
          ></input>
          <input value={user.address}
            type="text" 
            placeholder="สถานที่จัดส่ง" 
            maxLength="100"
            onChange={(event) => setUser({ ...user, address: event.target.value })}
            ></input>
          <button onClick={() => setDatauser('login')}>ยืนยัน</button>
        </div>
      </div>}
    </div>
  );
}

export default App;
