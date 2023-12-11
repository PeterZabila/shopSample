import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import useFetch from "../../hooks/useFetch";
import "./Products.scss";
import { products } from "../../constants";

const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);

  // const { data, loading, error } = useFetch(
  //   `/sub-categories?[filters][categories][id][$eq]=${catId}`
  // );
  const cats = products.map(item => item.category);
  const uniqueCats = cats.filter((value, index, array) => array.indexOf(value) === index)

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Категорії</h2>

          {uniqueCats?.map((item) => (
            <div className="inputItem" key={item}>
              <input
                type="checkbox"
                id={item}
                value={item}
                onChange={handleChange}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
        </div>

        <div className="filterItem">
          <h2>Ціна</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={10000}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Сортувати</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSort("asc")}
            />
            <label htmlFor="asc">Ціна (найнижча ціна)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSort("desc")}
            />
            <label htmlFor="desc">Ціна (найвища ціна)</label>
          </div>
        </div>

      </div>
      <div className="right">
        <img
          className="catImg"
          src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
        />
        <List catId={catId} maxPrice={maxPrice} sort={sort} subCats={selectedSubCats}/>
      </div>
    </div>
  );
};

export default Products;
