import React from "react";
import { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import { products } from "../../constants";

const Product = () => {

  const images = [
    "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600"
  ]

  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const prod = products.find((item) => item.id === Number(id));

  const dispatch = useDispatch();

  return (
    <div className="product">

          <div className="left">
            <div className="images">
              <img src={
                  images[0]
                }
                 alt="" 
                 onClick={(e) => setSelectedImg("img")}
              />
             <img src={
                  images[1]
                } 
                alt="" 
                onClick={(e) => setSelectedImg("img2")}
              />
            </div>
            <div className="mainImg">
              <img
                src={images[selectedImg]}
                alt=""
              />
            </div>
          </div>
          <div className="right">
            <h1>{prod.title}</h1>
            <span className="price">UAH{prod.price}</span>
            <p>{prod.desc}</p>
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
            <button
              className="add"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: prod.id,
                    title: prod.title,
                    desc: prod.desc,
                    price: prod.price,
                    img: prod.img,
                    quantity,
                  })
                )
              }
            >
              <AddShoppingCartIcon /> Додати в кошик
            </button>
            <div className="links">
              <div className="item">
                <FavoriteBorderIcon /> Додати в список бажаних
              </div>
              <div className="item">
                <BalanceIcon /> Додати до порівняння
              </div>
            </div>
            <div className="info">
              <span>Vendor: XXX</span>
              <span>Product Type: XXX</span>
              <span>Tag: XXX</span>
            </div>
            <hr />
            <div className="info">
              <span>Опис</span>
              <hr />
              <span>Додаткова інформація</span>
              <hr />
              <span>FAQ</span>
            </div>
          </div>
    </div>
  );
};

export default Product;
