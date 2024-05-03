import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DefaultButton from "../components/home/DefaultButton";
import CheckoutAddress from "./CheckoutAddres";
import { default as api } from "../services/redux/checkoutSlice";

function CheckoutForm() {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showCheckoutAddress, setShowCheckoutAddress] = useState(true);
  
  const { register, handleSubmit, reset } = useForm();
  const [addPaymentDetails] = api.useAddPaymentDetailsMutation();

  const onSubmit = async (data) => {
    if (!data) return {};
    await addPaymentDetails(data).unwrap();
    reset();
    console.log("Payment details data ", data);
  };



  useEffect(() => {
    setShowCheckoutAddress(true);
  }, []);



  const handleContinueButtonClick = () => {
    setShowCheckoutAddress(true);
    setShowAddressForm(false); // Hide address form
  };

  return (
    <div>
      <div className="px-4 pt-4">
        <p className="mt-8 text-lg font-bold">
          Which payment card would you like to use ?
        </p>
      </div>

      
    

    
 
        <form   onSubmit={handleSubmit(onSubmit)} >
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">
              Complete your order by providing your payment details.
            </p>
            <div>
              <label
                htmlFor="email"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Email
              </label>
              <div className="relative">
                <input
                  {...register("email")}
                  type="text"
                  id="email"
                  name="email"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                />
              </div>
              <label
                htmlFor="card-holder"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Card Holder
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("holder")}
                  id="card-holder"
                  name="card-holder"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full name here"
                />
              </div>
              <label
                htmlFor="card-no"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Card Details
              </label>
              <div className="flex">
                <div className="relative w-7/12 flex-shrink-0">
                  <input
                    {...register("card")}
                    type="text"
                    id="card-no"
                    name="card-no"
                    className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                  />
                </div>
                <input
                  type="text"
                  {...register("expire")}
                  name="credit-expiry"
                  className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="MM/YY"
                />
                <input
                  type="text"
                  name="credit-cvc"
                  {...register("cvc")}
                  className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="CVC"
                />
              </div>
              <label
                htmlFor="billing-address"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Address
              </label>
              <div className="flex flex-col sm:flex-row">
                <div className="relative flex-shrink-0 sm:w-7/12">
                  <input
                    type="text"
                    {...register("addres")}
                    id="billing-address"
                    name="billing-address"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Street Address"
                  />
                </div>
                <select
                  type="text"
                  {...register("state")}
                  name="billing-state"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="State">State</option>
                </select>
                <input
                  type="text"
                  {...register("zip")}
                  name="billing-zip"
                  className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="ZIP"
                />
              </div>
            </div>

            <div className="mt-4 mb-2 flex justify-center ">
              <DefaultButton
                title="Continue  py"
                type="submit"
              
                onClick={handleContinueButtonClick}
              />
            </div>
            <div className=" mb-8 flex justify-center ">
              <button
                className=" border-primary text-red-700 px-8 py-3 font-bold 
                rounded-md hover:bg-blue-950 hover:text-white cursor-grab"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      

    
    </div>
  );
}

export default CheckoutForm;