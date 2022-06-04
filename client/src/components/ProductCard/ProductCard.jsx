import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Link, useHistory } from "react-router-dom";
import shoppingCart from "../../media/shoppingCart.png";
import imgAddFavorite from "../../media/heart-add-cart.png";
import imgDeleteFavorite from "../../media/heart-delete-cart.png";
import accounting from "accounting";

export default function ProductCard({
  name,
  price,
  image,
  rating,
  id,
  stock,
  handleSaveCart,
  handleSaveFavorite,
  handleDeleteFavorite,
  isAdd
}) {
  const [changeButton, setChangeButton] = useState(isAdd);
  const history = useHistory()
  let myUser = JSON.parse(localStorage.getItem("myUser"));

  useEffect(()=>{
    setChangeButton(isAdd)
    // console.log(isAdd)
  },[isAdd])

  const postFavorite = () => {
    let person = JSON.parse(localStorage.getItem("myUser"))
    if(!person){
      history.push("/logIn")
      return
    }
    setChangeButton(true)
    handleSaveFavorite(id);
  };


  const deleteFavorite = () => {
    setChangeButton(false)
    handleDeleteFavorite(id);
  };

  const clickSaveCart = ()=>{
    if(!myUser){
      history.push("/logIn")
      return
    }
    handleSaveCart(name, price, image, id, stock)
  }
  return (
    <div>
      <button
        className="shoppingCart-btn"
        onClick={() => clickSaveCart()}
      >
        <img src={shoppingCart} alt="add-cart" />
      </button>
      {changeButton ? (
        <button className="shoppingCart-btn" onClick={() => deleteFavorite()}>
        <img src={imgDeleteFavorite} alt="delete-favorite" />
      </button>
      ) : (
        <button className="shoppingCart-btn" onClick={() => postFavorite()}>
        <img src={imgAddFavorite} alt="add-favorite" />
      </button>
      )}
      <Link to={`/home/${id}`}>
        <article className="card card-style">
          <div className="img-container">
            <img src={`${image}`} alt={`${name}`} />
            <span className="price">{`${accounting.formatMoney(
              price,
              "U$D ",
              0
            )}`}</span>
          </div>

          <div className="productCard-info">
            <span>{name}</span>
            <span>{rating}</span>
          </div>
        </article>
      </Link>
    </div>
  );
}