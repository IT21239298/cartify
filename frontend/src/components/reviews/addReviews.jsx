import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AddReview = () => {
  const { filterby } = useParams();
  const dispatch = useDispatch();
  const userInfoString = useSelector((state) => state.auth.userInfo);
  const productData = useSelector((state) => state.product.productList);

  const productDisplay = productData.filter((el) => el._id === filterby)[0];

  const userInfo =
    typeof userInfoString === "string"
      ? JSON.parse(userInfoString)
      : userInfoString || {};

  const [data, setData] = useState({ positive: 0, negative: 0, review: null });
  const [inputText, setInputText] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/analysis");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("text", inputText);

      const response = await axios.post("http://127.0.0.1:5000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(response.data);
      console.log("first", response.data);
      setInputText("");

      const secondFormData = {
        decition: response.data.decision,
        comment: response.data.review ? response.data.review.text : "",
        product_id: productDisplay._id,
        cus_id: userInfo._id,
        cus_name: userInfo.firstName,
        cus_image: userInfo.image,
      };

      const secondResponse = await axios.post(
        "http://localhost:8082/api/review",
        secondFormData
      );
      console.log("Second", secondResponse.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <div></div>
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            name="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <h2>Reviews</h2>
        <h2>{productDisplay._id}</h2>
        <p>Sentiment: {data.review && data.review.text}</p>
      </div>
      {userInfo.firstName}
    </div>
  );
};
export default AddReview;
