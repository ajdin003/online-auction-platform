import { useEffect, useState } from "react";
import Item from "./Item";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ItemList = () => {
  const [articles, setArticles] = useState([]);

  const query = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3001/articles");
      return response.data;
    },
  });

  useEffect(() => {
    if (query.data) {
      setArticles([...query.data.data.articles]);
    }
  }, [query.data]);

  console.log(articles);

  return (
    <div>
      aa
      {articles.map((article) => (
        <Item
          key={article.id}
          name={article.articleName}
          id={article.id}
          newPrice={article.price}
        />
      ))}
    </div>
  );
};

export default ItemList;
