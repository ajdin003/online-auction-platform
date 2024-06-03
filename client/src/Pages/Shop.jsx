import { useState } from "react";
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
    <div className="sv3">
    <div className="shop-main-container">
      <div className="shop-search-container">
        <input
          type="text"
          className="shop-search-input"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="shop-create-button" onClick={toggleModal}>
          Create Article
        </button>
      </div>
      <ItemList searchTerm={searchTerm} />
      {isModalOpen && (
        <div className="shop-modal">
          <div className="shop-modal-content">
            <span className="shop-close-button" onClick={toggleModal}>
              &times;
            </span>
            <CreateArticleForm />
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Shop;
