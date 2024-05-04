import React, { useEffect, useState } from "react";

import SecondaryButton from "./SecondaryButton";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { setCategory } from "../../services/redux/productSlice";

function ImageScanner() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCategory(""));
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      sendImageToServer(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const sendImageToServer = (file) => {
    const formdata = new FormData();
    formdata.append("file", file);

    const requestOptions = {
      method: "POST",
      body: formdata,
      // Assuming your API endpoint is different from the example URL, modify it accordingly
      // Replace "http://127.0.0.1:8001/detect/category" with your actual API endpoint URL
      // If it's a different domain, you may encounter CORS issues
      redirect: "follow",
    };
    debugger;
    fetch("http://127.0.0.1:8002/detect/category", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // Handle the response from the server as needed
        console.log(result);
        //connect with python api
        if (result == "shoes") {
          dispatch(setCategory("Shoes"));
        } else if (result == "bags") {
          dispatch(setCategory("Luuggage & Bags"));
        } else if (result == "toy_car") {
          dispatch(setCategory("Toys"));
        } else if (result == "watch" || result == "necklase") {
          dispatch(setCategory("Jewelry & Watches"));
        } else if (result == "lipsticks") {
          dispatch(setCategory("Accessories"));
        } else if (result == "backcover") {
          dispatch(setCategory("Phone Accessories"));
        } else {
          dispatch(setCategory("other"));
        }

        //if(result.category)
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex py-1 mt-1 overflow-hidden bg-white rounded shadow group ">
      <div
        className="flex items-center justify-center h-64 p-4 mb-20 ml-20 mr-20 border-2 border-gray-400 border-dashed"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            className="object-cover h-full w-100"
          />
        ) : (
          <p className="text-center ">Drag & Drop your image</p>
        )}
      </div>
      <div className="">
        <div className="mb-10 mr-10 font-sans text-lg font-semibold text-primary">
          <h1 className="text-3xl ">Transform your shopping experience</h1>{" "}
          <br />{" "}
          <span className="font-sans">
            Simply scan and drag & drop your image to discover relevant
            categories <br /> tailored just for you!
          </span>
        </div>
        <SecondaryButton
          onClick={() => {
            navigate("/shop");
          }}
          title={"Scan Now"}
        />
      </div>
    </div>
  );
}

export default ImageScanner;
