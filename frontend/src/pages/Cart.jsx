import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "../pages/cart/cartproduct";
import emptyCartImage from "../assets/empty.gif";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel"; // Import Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchAllCartItems } from "../services/redux/productSlice";
import DefaultButton from "../components/home/DefaultButton";

export default function Cart() {
  const dispatch = useDispatch();
  const productCartItem = useSelector((state) => state.product.cartItem);

  useEffect(() => {
    dispatch(fetchAllCartItems());
  }, [dispatch]);

  console.log(" cart item rergdwdqwdwqdwdwdwdwregg", productCartItem);
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );
  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  return (
    <div className="p-8  ">
      <h2 className="text-3xl font-medium font-sans text-primary uppercase mt-2 mb-6 mx-auto px-10">
        Your Cart Items
      </h2>

      <div className=" ">
        {productCartItem.length > 0 ? (
          <div className="flex flex-col md:flex-row">
            <div
              className="mx-auto md:ml-20"
              style={{ width: 500, height: 600 }}
            >
              {productCartItem.length > 0 && (
                <Carousel
                  autoPlay={false} // Set to true if you want autoplay
                  animation="slide" // Set to "fade" for fade effect
                  indicators={true} // Show indicators
                  timeout={500} // Transition time
                  navButtonsAlwaysVisible={true} // Show navigation buttons always
                >
                  {productCartItem.map((item, index) => (
                    <div key={index} className="w-full max-w-3xl">
                      <CartProduct
                        id={item._id}
                        images={item.images}
                        categories={item.categories}
                        quantity={item.quantity}
                        price={item.price}
                        description={item.description}
                        title={item.title}
                        total={item.total}
                        qty={item.qty}
                      />
                    </div>
                  ))}
                </Carousel>
              )}
            </div>

            <div className="w-full max-w-md ml-auto mt-24">
              <h2 className=" bg-blue-300  rounded-lg text-2xl font-medium font-sans text-primary  mt-2 mb-6 mx-auto px-10 ">
                Order Summary
              </h2>
              <div className="flex w-full py-2 font-sans text-black text-lg text-justify  font-bold">
                <p>Product Name</p>
                <p className="ml-auto w-32 font-sans text-black text-lg text-justify  font-bold">
                  Quantity
                </p>
                <p className="ml-auto w-32 font-sans text-black text-lg text-justify  font-bold">
                  Total
                </p>
              </div>
              {/* Render product quantities, totals, and categories */}
              {productCartItem.map((item, index) => (
                <div key={index} className="flex w-full py-2 text-lg ">
                  <p>{item.title}</p>
                  <p className=" ml-auto w-34 font-sans text-black text-lg text-justify  ">
                    {item.qty}
                  </p>
                  <p className="ml-auto w-32 font-sans text-black text-lg text-justify ">
                    {item.total}
                  </p>
                </div>
              ))}
              <div className="border-b"></div>
              <div className="flex w-full py-2 text-lg border-b">
                <p className="font-sans text-black text-lg font-bold">
                  Total Qty :
                </p>
                <p className="ml-auto w-32 font-sans text-black text-lg font-bold">
                  {totalQty}
                </p>
              </div>
              <div className="flex w-full py-2 font-sans text-black text-lg font-bold border-b">
                <p>Total Price</p>
                <p className="ml-auto w-32 ">
                  <span className="text-red-500">Rs.</span> {totalPrice}
                </p>
              </div>
              <div className="mt-10 ml-32">
                <Link to={"/checkout"}>
                  <DefaultButton title="Checkout" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center flex-col">
              <img
                src={emptyCartImage}
                className="w-full max-w-sm"
                style={{ marginTop: "50px" }}
                alt="Empty Cart"
              />
              <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
            </div>
          </>
        )}
      </div>
      <div className="p-16">
        <p className="text-left text-2ml mt-2 my-4 ml-48 font-semibold ">
          Still want to continue shopping ? <br></br>
          <Link to={"/shop"} className=" text-blue-800 underline py-6 ml-12 ">
            Continue Shopping
          </Link>
        </p>
      </div>
    </div>
  );
}
