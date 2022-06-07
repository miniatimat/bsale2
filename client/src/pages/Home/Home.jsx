import axios from "axios";
import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useStore } from "../../context/store.js";
import {
  fetchProducts,
  fetchCategories,
  getFavorites,
} from "../../redux/actions/actions.js";
import "./Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation()
  const [user, setUser] = useState([]);
  const [state, dispatch] = useStore();
  // const [error, setError] = useState();
  const [cart, setCart] = useState([]);
  const [inCart, setInCart] = useState(false);
  let person = JSON.parse(localStorage.getItem("myUser"));
  const alertSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark"
    });
  };
  const alertInfo = (msg) => {
    toast.info(msg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark"
    });
  };

 
  const handleSaveCart = (name, price, image, id, stock) => {
    let quantity = 1;
    let totalPrice = price;
    let products = { name, price, image, id, stock, quantity, totalPrice };
    let value = cart.find((e) => e.name === name);
    if (value) {
      setInCart(false);
      alertInfo(t("home.altAlreadyInCart"));
      return;
    } else {
      setInCart(true);
      setCart((cart) => [...cart, products]);
      alertSuccess(t("home.altAddToCart"));
    }
  };
 
  const handleSaveFavorite = async (id) => {
    if (!person) alert(t("home.mustBeLoggedIn"))
    try {
      await axios.post(`${process.env.REACT_APP_DOMAIN}/user/addFavorite`, {
        idUser: person,
        idProduct: id,
      });
      alertSuccess(t("home.altAddToFavs"))
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteFavorite = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_DOMAIN}/user/removeFavorite`,
        {
          data: {
            idUser: person,
            idProduct: id,
          },
        }
      );
      alertInfo(t("home.altRemoveFromFavorites"))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    let myCart = JSON.parse(localStorage.getItem(myUser));
    fetchCategories(dispatch);
    getFavorites(dispatch, person);
    fetchProducts(dispatch);
    setUser(myUser);
    if (myCart) {
      setCart(myCart);
    } else {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(user, JSON.stringify(cart));
  }, [cart]);

  const mostra = () => {
    let miStorage = JSON.parse(localStorage.getItem("myUser"));
    console.log(miStorage);
  };

  return (
    <section className="section-products">
      {/* <button onClick={() => mostra()}>mostra storage</button> */}
      {state.products && state.favorites
        ? React.Children.toArray(
            state.products.map((product) => {
              if (product.status === "active") {
                return (
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    stock={product.stock}
                    price={product.price}
                    image={product.image}
                    handleSaveCart={handleSaveCart}
                    handleSaveFavorite={handleSaveFavorite}
                    handleDeleteFavorite={handleDeleteFavorite}
                    isAdd={state.favorites.find((e) => e.id === product.id)}
                  />
                );
              }
              return null;
            })
          )
        : console.log("Aca vendría el loader")}{" "}
      <ToastContainer />
      <p>{t(i18n.languages[0]) }</p>
    </section>
  );
}
