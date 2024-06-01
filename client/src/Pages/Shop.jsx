import React, { useState } from "react";
import ItemList from "../components/item_list";
import CreateArticleForm from "../Pages/CreateArticleForm";
import "../css/shop.css";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="shop-container">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="create-button" onClick={toggleModal}>
          Create Article
        </button>
      </div>
      <ItemList searchTerm={searchTerm} />

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={toggleModal}>
              &times;
            </span>
            <CreateArticleForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
