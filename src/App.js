import "./App.css";
import { useState, useEffect } from "react";
import Restaurant from "./Restaurant";
import Order from "./Order";
import Ordered from "./Ordered";
import DeriveryOrdered from "./DeriveryOrdered";

let pagerefresh = true;

function App() {
  const [user, setUser] = useState({ name: "", tel: "", address: "" });
  const [order, setOrder] = useState({
    name: "",
    food: "",
    price: 0,
    amount: 0,
    textarea: "",
  });

  const [Switch, setSwitch] = useState({
    mode: true,
    popup: false,
    order: false,
    profile: false,
  });

  const [list_order, setListOrder] = useState([]);
  const [list_ordered, setListOrdered] = useState([]);
  const [derivery_list_order, setDeriveryListOrder] = useState([]);
  const [derivery_list_accept, setDeriveryListAccept] = useState([]);

  const restaurantCallback = (data) => {
    setSwitch({ ...Switch, popup: !Switch.popup });
    setOrder({ ...order, name: data.name });
  };

  const idCallback = (id) => {
    console.log(id);
    putData({ id: id });
  };

  const addOrder = () => {
    setListOrder([order, ...list_order]);
    setOrder({});
    setSwitch({ ...Switch, popup: false });
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
        setListOrdered(responseData.reverse());
        const data = responseData.reverse();
        setDeriveryListOrder([]);
        setDeriveryListAccept([]);
        data.map((order) => {
          if (order.state === false) {
            setDeriveryListOrder((derivery_list_order) => [
              ...derivery_list_order,
              order,
            ]);
          }
        });
        data.map((order) => {
          if (order.state === true) {
            setDeriveryListAccept((derivery_list_accept) => [
              ...derivery_list_accept,
              order,
            ]);
          }
        });
        console.log("list_ordered", list_ordered);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setListOrder([]);
  }

  useEffect(() => {
    console.log("list_ordered", list_ordered);
  }, [list_ordered]);

  useEffect(() => {
    console.log("derivery_list_order", derivery_list_order);
  }, [derivery_list_order]);

  useEffect(() => {
    console.log("derivery_list_accept", derivery_list_accept);
  }, [derivery_list_accept]);

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
                <button onClick={() => submitOrder()}>สั่งเลย</button>
              )}
              {list_order.length === 0 && (
                <p className="warn">ไม่มีอาหารในตระกร้า</p>
              )}
            </div>
          )}
          <img
            className="profile-img"
            onClick={() => setSwitch({ ...Switch, profile: !Switch.profile })}
            src="https://icon-library.com/images/customer-login-icon/customer-login-icon-8.jpg"
          ></img>
          {Switch.profile && (
            <div className="profile-box">
              <p>ชื่อผู้ใช้</p>
              <input
                type="text"
                value={user.name}
                onChange={(event) =>
                  setUser({ ...user, name: event.target.value })
                }
              ></input>
              <p>เบอร์โทรศัพท์</p>
              <input
                type="tel"
                value={user.tel}
                onChange={(event) =>
                  setUser({ ...user, tel: event.target.value })
                }
              ></input>
              <p>สถานที่จัดส่ง</p>
              <input
                type="text"
                value={user.address}
                onChange={(event) =>
                  setUser({ ...user, address: event.target.value })
                }
              ></input>
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
                name="ร้านอาหาร"
                img="https://img.wongnai.com/p/1968x0/2019/02/11/c9eb14ff78184602be77d65eef6379b8.jpg"
              />
              <Restaurant
                popup={(data) => restaurantCallback(data)}
                name="ร้านอาหาร"
                img="https://img.wongnai.com/p/1920x0/2018/09/21/5a6610a0832349e69db9fa40d0793c7c.jpg"
              />
              <Restaurant
                popup={(data) => restaurantCallback(data)}
                name="ร้านอาหาร"
                img="https://img.wongnai.com/p/1968x0/2019/02/11/c9eb14ff78184602be77d65eef6379b8.jpg"
              />
              <Restaurant
                popup={(data) => restaurantCallback(data)}
                name="ร้านอาหาร"
                img="https://img.wongnai.com/p/1968x0/2019/02/11/c9eb14ff78184602be77d65eef6379b8.jpg"
              />
              <Restaurant
                popup={(data) => restaurantCallback(data)}
                name="ร้านอาหาร"
                img="https://img.wongnai.com/p/1968x0/2019/02/11/c9eb14ff78184602be77d65eef6379b8.jpg"
              />
              <Restaurant
                popup={(data) => restaurantCallback(data)}
                name="ร้านอาหาร"
                img="https://img.wongnai.com/p/1968x0/2019/02/11/c9eb14ff78184602be77d65eef6379b8.jpg"
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
            <h2>{order.name}</h2>
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
                onChange={(event) =>
                  setOrder({ ...order, price: event.target.value })
                }
              ></input>
              <input
                className="amount"
                type="number"
                value={order.amount}
                placeholder="จำนวน"
                onChange={(event) =>
                  setOrder({ ...order, amount: event.target.value })
                }
              ></input>
              <input
                value={order.textarea}
                type="textarea"
                placeholder="หมายเหตุ เช่น ไม่ใส่ผัก"
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
    </div>
  );
}

export default App;
