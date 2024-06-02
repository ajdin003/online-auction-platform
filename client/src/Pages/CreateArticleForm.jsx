import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "../css/CreateArticleForm.css";

const CreateArticleForm = () => {
  const [articleName, setArticleName] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [image, setImage] = useState(null);
  const [cookie] = useCookies();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("articleName", articleName);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("image", image);

      await axios.post(
        "http://localhost:3001/articles/create-article",
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Optionally, you can redirect the user to a different page or display a success message
      console.log("Article created successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Article Name"
        value={articleName}
        onChange={(e) => setArticleName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Condition"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Create Article</button>
    </form>
  );
};

export default CreateArticleForm;
