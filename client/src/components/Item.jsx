import "../css/Item.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Item = ({ id, name, newPrice }) => {
  return (
    <Link to={`/item/${id}`}>
      <div className="item">
        <p>{name}</p>
        <div className="item-prices">
          <div className="item-price-new">${newPrice}</div>
          <div className="item-price-old">${newPrice}</div>
        </div>
      </div>
    </Link>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  newPrice: PropTypes.number.isRequired,
};

export default Item;
