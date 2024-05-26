import React, { useState } from "react";
import data_product from "./Assets/data";
import Item from "./Item";
import Shop from "../Pages/Shop";
//  SEARCH BUTTON //
const ItemList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(data_product);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const results = data_product.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <button className="search-button">Search</button>
      {searchResults.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          name={item.name}
          image={item.image}
          new_price={item.new_price}
          old_price={item.old_price}
        />
      ))}
    </div>
  );
};

export default ItemList;

/* import React, { useState } from "react";
import data_product from "./Assets/data";
import Item from "./Item";

const ItemList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(data_product);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const results = data_product.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchResults.map((item) => (
        <Item
        key={i}
        id={item.id}
        name={item.name}
        image={item.image}
        new_price={item.new_price}
        old_price={item.old_price}
      />
        {/<div key={item.id}>
          <h2>{item.name}</h2>
          <img src={item.image} alt={item.name} />
          <p>New Price: ${item.new_price}</p>
          <p>Old Price: ${item.old_price}</p>
        </div>/}
      ))}
    </div>
  );
};

export default ItemList;*/
