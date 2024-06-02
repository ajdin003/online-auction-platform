/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Item from "./Item";
import "../css/itemList.css"; // Import the CSS file for styling

const ItemList = ({ searchTerm }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3001/articles");
      return response.data;
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  if (!data || !data.data || !data.data.articles) {
    return <span>No articles found</span>;
  }

  const filteredArticles = data.data.articles.filter((article) =>
    article.articleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="item-list-container">
      <div className="item-list">
        {filteredArticles.map((article) => (
          <Item
            key={article._id}
            name={article.articleName}
            id={article._id}
            newPrice={article.price}
            startDate={article.startDate}
            endDate={article.endDate}
            image={article.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
