/** @format */

"use client";

import { getProductinDB } from "@app/actions/product";

import { useQueries } from "@tanstack/react-query";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


import { RootState } from "@app/store";

export default function Form() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [fiscal, setFiscal] = useState("");

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phone, setphone] = useState("");

  const [password, setPassword] = useState("");
  const products = useSelector(
    (state: RootState) => state.persistedProducts.products
  );

  const [form, setForm] = useState("login");

  const productsIdList = products.map((product) => {
    if (product?.id !== undefined) {
      return product.id;
    }
  });
  const [{ data: productfromserver, refetch: refetchProduct }] = useQueries({
    queries: [
      {
        queryKey: ["product"],
        queryFn: () => getProductinDB(productsIdList),
      },
    ],
  });

  useEffect(() => {
    refetchProduct();
  }, [productsIdList]);
  const formData = new FormData();


  //===========================
  const paymentWithForm = () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/guest-user`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        fiscal: `${country} - ${city} - ${address} - ${fiscal}`,
        password,

        firstName,
        lastName,
        phone,
      }),
    })
      .then((res) => {
        if (res.status === 500) {
          toast.error("dublicate information");
        }
        return res.json();
      })
      .then((res) => {
        localStorage.setItem("SESSION_TOKEN", res.token);

        //-----
        const productlistforaddtocart = productfromserver.map(
          (product: any) => {
            if (product.isReadyForPayment) {
              return product.id;
            }
          }
        );

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/cart`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${res.token}`,
          },
          body: JSON.stringify({
            products: productlistforaddtocart,
          }),
        })
          .then((result) => {
          

            return result.json();
          })
          .then((result) => {
         

            formData.append("jwt", res.token);
            const cc = fetch(`/product/checkout/qwer/payment`, {
              method: "post",
              body: formData,
            })
              .then((ressss) => {
                return ressss.json();
              })
              .then((ress) => {
                router.push(ress);
              });
          
          });
      });
  };
  //===============================================================================



  async function registerWithErrors() {


    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/guest-user`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        fiscal: `${country} - ${city} - ${address} - ${fiscal}`,
        password,

        firstName,
        lastName,
        phone,
      }),
    })
      .then((res) => {
        if (res.status === 500) {
          toast.error("dublicate information");
        }
        return res.json();
      })
      .then((res) => {
        localStorage.setItem("SESSION_TOKEN", res.token);

        //-----
        const productlistforaddtocart = productfromserver.map(
          (product: any) => {
            if (product.isReadyForPayment) {
              return product.id;
            }
          }
        );

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/cart`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${res.token}`,
          },
          body: JSON.stringify({
            products: productlistforaddtocart,
          }),
        })
          .then((result) => {
        

            return result.json();
          })
          .then((result) => {
         

            formData.append("jwt", res.token);
            const cc = fetch(`/product/checkout/qwer/payment`, {
              method: "post",
              body: formData,
            })
              .then((ressss) => {
                return ressss.json();
              })
              .then((ress) => {
                router.push(ress);
              });
           
          });
      });







    

  }

  //==============================================================//
  const loginformdata = new FormData();

  async function loginWithErrors() {
   
    




    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/authentication/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        
        password
      }),
    })
      .then((res) => {
        if (res.status === 500) {
          toast.error("dublicate information");
        }
        return res.json();
      })
      .then((res) => {
        localStorage.setItem("SESSION_TOKEN", res.token);

        //-----
        const productlistforaddtocart = productfromserver.map(
          (product: any) => {
            if (product.isReadyForPayment) {
              return product.id;
            }
          }
        );

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/cart`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${res.token}`,
          },
          body: JSON.stringify({
            products: productlistforaddtocart,
          }),
        })
          .then((result) => {
         

            return result.json();
          })
          .then((result) => {
         

            formData.append("jwt", res.token);
            const cc = fetch(`/product/checkout/qwer/payment`, {
              method: "post",
              body: formData,
            })
              .then((ressss) => {
                return ressss.json();
              })
              .then((ress) => {
            
                
                router.push(ress);
              });
        
          });
      });






      
  }

  return (
    <>
    
      {form === "register" && (
        <div className='w-full h-full flex-auto flex items-center justify-center my-10 lg:my-20 px-6 lg:px-12'>
          <div className='w-11/12 mx-auto h-max max-w-3xl bg-black border-primary-1 border-2 py-10 px-8 rounded-xl text-white flex flex-col items-center justify-center gap-10'>
            <h2 className='font-bold text-2xl lg:text-3xl'> PYMENT FORM</h2>
            <form action='' className=' w-full'>
              <div className='w-full h-max flex flex-col gap-6 bg-primary-1 p-6 rounded-md'>
                <div className='flex flex-col  w-full items-start justify-center gap-3'>
                  <label
                    className='font-semibold text-black md:text-xl'
                    htmlFor='firstName'>
                    firstName
                  </label>
                  <input
                    className=' w-full   text-black p-3 outline-none bg-white flex items-end justify-start px-3 rounded-xl'
                    type='text'
                    name='firstName'
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </div>
                <div className='flex flex-col  w-full items-start justify-center gap-3'>
                  <label
                    className='font-semibold text-black md:text-xl'
                    htmlFor='lastName'>
                    lastName
                  </label>
                  <input
                    className=' w-full   text-black p-3 outline-none bg-white flex items-end justify-start px-3 rounded-xl'
                    type='text'
                    name='lastName'
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </div>
                <div className='flex flex-col  w-full items-start justify-center gap-3'>
                  <label
                    className='font-semibold text-black md:text-xl'
                    htmlFor='email'>
                    email
                  </label>
                  <input
                    className=' w-full   text-black p-3 outline-none bg-white flex items-end justify-start px-3 rounded-xl'
                    type='text'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='flex flex-col  w-full items-start justify-center gap-3'>
                  <label
                    className='font-semibold text-black md:text-xl'
                    htmlFor='phone'>
                    phone
                  </label>
                  <input
                    className=' w-full   text-black p-3 outline-none bg-white flex items-end justify-start px-3 rounded-xl'
                    type='text'
                    name='phone'
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                  />
                </div>
                <div className='flex flex-col  w-full items-start justify-center gap-3'>
                  <label
                    className='font-semibold text-black md:text-xl'
                    htmlFor='country'>
                    country
                  </label>
                  <input
                    className=' w-full  p-3 outline-none bg-white flex items-end justify-start px-3 rounded-xl text-black '
                    type='text'
                    name='country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className='flex flex-col  w-full items-start justify-center gap-3'>
                  <label
                    className='font-semibold text-black md:text-xl'
                    htmlFor='city'>
                    city
                  </label>
                  <input
                    className=' w-full  p-3 outline-none bg-white flex items-end justify-start px-3 rounded-xl text-black '
                    type='text'
                    name='city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className='flex flex-col  w-full items-start justify-center gap-3'>
                  <label
                    className='font-semibold text-black md:text-xl'
                    htmlFor='address'>
                    address
                  </label>
                  <input
                    className=' w-full  p-3 outline-none bg-white flex items-end justify-start px-3 rounded-xl text-black '
                    type='text'
                    name='address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className='flex flex-col  w-full items-start justify-center gap-3'>
                  <label
                    className='font-semibold text-black md:text-xl'
                    htmlFor='fiscal'>
                    fiscal
                  </label>
                  <input
                    className=' w-full  p-3 outline-none bg-white flex items-end justify-start px-3 rounded-xl text-black '
                    type='text'
                    name='fiscal'
                    value={fiscal}
                    onChange={(e) => setFiscal(e.target.value)}
                  />
                </div>
                <div className='flex flex-col  w-full items-start justify-center gap-3'>
                  <label
                    className='font-semibold text-black md:text-xl'
                    htmlFor='password'>
                    password
                  </label>
                  <input
                    className=' w-full  p-3 outline-none bg-white flex items-end justify-start px-3 rounded-xl text-black '
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>{" "}
                <p
                  onClick={registerWithErrors}
                  className='bg-black  mx-auto p-4 w-full  flex items-center justify-center rounded-xl font-semibold text-base text-white'>
                  PAYMENT{" "}
                </p>
                <div className="w-max mx-auto font-semibold underline text-black">
            <button onClick={() => setForm("login")}>have account</button>
          </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {form === "login" && (
        <div className='w-full h-full flex-auto flex items-center justify-center my-10 lg:my-20 px-6 lg:px-12'>
          <div className='w-11/12 mx-auto h-max max-w-3xl bg-black border-primary-1 border-2 py-10 px-8 rounded-xl text-white flex flex-col items-center justify-center gap-10'>
            <h2 className='font-bold text-2xl lg:text-3xl'>LOGIN</h2>
            <form action='' className=' w-full'>
              <div className='w-full h-max flex flex-col gap-6 bg-primary-1 p-6 rounded-md'>
                <div className='flex flex-col  w-full items-start justify-center gap-3'>
                  <label
                    className='font-semibold text-black md:text-xl'
                    htmlFor='email'>
                    email
                  </label>
                  <input
                    className=' w-full   text-black p-3 outline-none bg-white flex items-end justify-start px-3 rounded-xl'
                    type='text'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='flex flex-col  w-full items-start justify-center gap-3'>
                  <label
                    className='font-semibold text-black md:text-xl'
                    htmlFor='password'>
                    password
                  </label>
                  <input
                    className=' w-full  p-3 outline-none bg-white flex items-end justify-start px-3 rounded-xl text-black '
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>{" "}
                <p
                  onClick={loginWithErrors}
                  className='bg-black  mx-auto p-4 w-full  flex items-center justify-center rounded-xl font-semibold text-base text-white'>
                  PAYMENT{" "}
                </p>
                <div className="w-max mx-auto font-semibold underline text-black">
            <button onClick={() => setForm("register")}>need account</button>
          </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
