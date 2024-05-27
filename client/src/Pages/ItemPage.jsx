import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const ItemPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});

  const query = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3001/articles/${id}`);
      return response.data;
    },
  });

  useEffect(() => {
    setArticle({ ...query.data.data.article });
  }, [query.data]);

  console.log(article);

  return (
    <div>
      <h1>{article.articleName}</h1>
    </div>
  );
};

export default ItemPage;
