import React, { useState } from "react";
import "./ProductCart.scss";
import { totalPrice } from "../Cart/actionsCart";
import accounting from "accounting";

export const ProductCart = ({
  name,
  stock,
  price,
  id,
  image,
  deleteDatatoStorage,
  viewProduct,
  pos,
  setPriceTotal,
  // totalPrice
}) => {
  let user = JSON.parse(localStorage.getItem("myUser"));
  let yourStorage = JSON.parse(localStorage.getItem(user));
  const [storageCart, setStorageCart] = useState(yourStorage);
  const [permitLess, setPermitLess] = useState(false);
  const [permitMore, setPermitMore] = useState(true);
  const [count, setCount] = useState(storageCart[pos].quantity);

  const oneMore = (stock, name, price) => {
    setCount(count + 1);
    if (count + 1 > 1) setPermitLess(true);
    if (count + 1 === stock) setPermitMore(false);
    changeAmount(count, name, 1, price);
  };

  //Funcion para restar producto al carro
  const oneLess = (stock, name, price) => {
    setCount(count - 1);
    if (count - 1 < 2) setPermitLess(false);
    if (count - 1 < stock) setPermitMore(true);
    changeAmount(count, name, -1, price);
  };

  let changeAmount = (num, name, SoR, price) => {
    let articleStogare = yourStorage.find((e) => e.name === name);
    articleStogare.quantity = num + SoR;
    articleStogare.totalPrice = Math.round(price * (count + SoR));
    setStorageCart(yourStorage);
    localStorage.setItem(user, JSON.stringify(yourStorage));
    setPriceTotal(totalPrice());
  };

  return (
    <div className="card-body-cart">
      <img src={image} alt={name} className="card-image-cart" />
      <p>{name}</p>
      <p>{accounting.formatMoney(price, "U$D ", 0)}</p>
      <p>TOTAL: {accounting.formatMoney(price * count, "U$D ", 0)}</p>
      {count !== 1 ? (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => oneLess(stock, name, price)}
        >
          -
        </button>
      ) : null}
      <span>{storageCart[pos].quantity}</span>
      {count !== stock ? (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => oneMore(stock, name, price)}
        >
          +
        </button>
      ) : null}
      <button
        className="del-view-product-cart"
        onClick={() => deleteDatatoStorage(name)}
      >
        Eliminar
      </button>
      <button onClick={() => viewProduct(id)}>Ver</button>
    </div>
  );
};
