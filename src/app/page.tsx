/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Image from "next/image";
import data from '@/data.json';
import { useEffect, useState } from "react";
import { Card } from "@/components/card";
import { ConfirmPayment } from "@/components/order";
export interface IProducts{
  id: number;
  name: string;
  category: string;
  price: number;
  image:{
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

export interface IProductCart{
  id: number;
  name: string;
  price: number;
  qty: number;
  price_perUnit: number;
  image?: string;
}
export interface ICart{
  products: IProductCart[] | [];
  total: number;
}
//const [cart,setCart] = useState<ICart>()


export default function Home() {
  const [products,setProducts] = useState<Array<IProducts>>([])
  const [cart,setCart] = useState<ICart>({
    products: [],
    total: 0,
  })
  const[isOrder,setIsOrder] = useState<boolean>(false)

  useEffect(() =>{
    if(products.length<=0){
      setProducts(data)
    }
  },[])

  const handleCancelProduct = (id:number) =>{
    setCart((pre: ICart) =>{
      let newProduct = [...pre.products]
      if(id){
        newProduct = newProduct.filter((ft) => ft.id !== id)
      }
      const updatedTotal = newProduct.reduce((sum, prod) => sum + prod.price_perUnit, 0) ;
      return{
        products: newProduct,
        total: updatedTotal
      }
    })
  }
  //let cartss= 
  return (
    <>
    <main className="relative w-[80%] mx-auto py-6 grid md:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-x-6">
      <div className="md:col-span-2 lg:col-span-2 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8">
        {
          products.map((p,i)=>{
            return <Card indexCarts={cart.products.map((ct)=> ct.id)} carts={cart.products} setCart={setCart} data={p} key={i}/>
          })
        }
      </div>
      <div className="md:m-0 lg:m-0 my-4">
        <div className="bg-white rounded-lg min-h-64 p-6">
          <h2 className="font-bold text-red-600">Your Cart ({cart.products.length})</h2>
          {
            cart.products.length>0?
            <div className="w-full grid grid-cols-1">
            {
              cart.products.map((ct,ix) =>{
                return (
                  <>
                    <div key={ix} className="p-3 flex justify-between border-b">
                      <div className="block text-left">
                        <h3>{ct.name}</h3>
                        <div className="flex gap-x-4">
                          <span className="text-red-500">{ct.qty} x</span>
                          <span className="text-rose-300 flex gap-x-3">
                            @ ${ct.price.toFixed(2)}  
                             <strong className="text-red-300">${ct.price_perUnit.toFixed(2)}</strong>
                            </span>
                        </div>
                      </div>
                      <span className="cursor-pointer p-2" onClick={()=>handleCancelProduct(ct.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#888888" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m3.59-13L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41z"/></svg>
                      </span>
                    </div>
                  
                  </>
                )
              })
            }
              <div className="flex justify-between py-2">
                <label htmlFor="ad">Order Total</label>
                <h3 className="font-bold">{cart.total.toFixed(2)}</h3>
              </div>
              <div className="w-full flex justify-center items-center py-2">
                <button className="bg-rose-50 px-6 rounded-md text-[14px] py-3 border-none flex gap-x-0 text-left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="22" viewBox="0 0 64 64"><g fill="#83bf4f"><ellipse cx="17.8" cy="38.3" rx="15.8" ry="15.2"/><ellipse cx="17.8" cy="21.4" rx="15" ry="14.4"/><ellipse cx="34.2" cy="16.9" rx="15.5" ry="14.9"/><ellipse cx="49" cy="28.5" rx="13" ry="12.5"/><ellipse cx="39.5" cy="40.2" rx="13" ry="12.5"/></g><g fill="#947151"><path d="M28.9 64c.3-4-.3-8.2-.9-12.6s-1.4-8.9-1.4-13.5c-.1-4.6.5-9.3 2.1-13.6c1.5-4.3 3.8-8.2 6.5-11.7c-2.3 3.8-4 7.9-4.9 12.2c-.9 4.2-.9 8.6-.3 12.8s1.8 8.4 3.1 12.7c1.2 4.3 2.5 8.8 2.8 13.7z"/><path d="M28.4 36.2c2 .2 4.2.1 6.3-.1s4.2-.7 6.2-1.4s3.9-1.7 5.6-3s3.2-2.9 4.3-4.8c-1 1.9-2.3 3.7-4 5.2c-1.6 1.5-3.5 2.6-5.6 3.5c-2 .9-4.2 1.5-6.3 2c-2.2.4-4.4.7-6.7.6zm-.6-1.4c-1.5-.9-2.8-1.9-4-2.9c-1.2-1.1-2.4-2.3-3.4-3.5c-2-2.6-3.5-5.7-3.7-8.9c.5 3.2 2.3 6 4.5 8.2q1.65 1.65 3.6 3c1.3.9 2.7 1.7 4 2.3zm1.6 11.4c-1.7-.1-3.3-.4-4.9-.8s-3.1-1-4.6-1.8C17 42 14.5 39.7 13 36.8c1.8 2.7 4.4 4.7 7.3 5.8c1.4.6 3 1 4.5 1.3s3.1.4 4.6.3z"/></g><path fill="#75a843" d="M9.8 41.9c0 2.2-1.8 4-1.8 4s-1.8-1.8-1.8-4s1.8-4 1.8-4s1.8 1.8 1.8 4m46.3-8.6c0 2.2-1.8 4-1.8 4s-1.8-1.8-1.8-4s1.8-4 1.8-4s1.8 1.8 1.8 4M14.8 47c0 2.2-1.8 4-1.8 4s-1.8-1.8-1.8-4s1.8-4 1.8-4s1.8 1.8 1.8 4m-5-26.1c0 2.2-1.8 4-1.8 4s-1.8-1.8-1.8-4s1.8-4 1.8-4s1.8 1.8 1.8 4m5-5.8c0 2.2-1.8 4-1.8 4s-1.8-1.8-1.8-4s1.8-4 1.8-4s1.8 1.8 1.8 4M40.5 18c0 2.2-1.8 4-1.8 4S37 20.2 37 18s1.8-4 1.8-4s1.7 1.8 1.7 4m5-5.4c0 2.2-1.8 4-1.8 4s-1.8-1.8-1.8-4s1.8-4 1.8-4s1.8 1.8 1.8 4M22.2 35.8c0 2.2-1.8 4-1.8 4s-1.8-1.8-1.8-4s1.8-4 1.8-4s1.8 1.8 1.8 4m-5.6-5.1c0 2.2-1.8 4-1.8 4s-1.8-1.8-1.8-4s1.8-4 1.8-4s1.8 1.8 1.8 4m9.5-9.8c0 2.2-1.8 4-1.8 4s-1.8-1.8-1.8-4s1.8-4 1.8-4s1.8 1.8 1.8 4M30 14c0 2.2-1.8 4-1.8 4s-1.8-1.8-1.8-4s1.8-4 1.8-4s1.8 1.8 1.8 4m5.4 16.7c0 2.2-1.8 4-1.8 4s-1.8-1.8-1.8-4s1.8-4 1.8-4s1.8 1.8 1.8 4M49 39.8c0 2.2-1.8 4-1.8 4s-1.8-1.8-1.8-4s1.8-4 1.8-4s1.8 1.8 1.8 4m-3.5-16.7c0 2.2-1.8 4-1.8 4s-1.8-1.8-1.8-4s1.8-4 1.8-4s1.8 1.8 1.8 4m-6 19.9c0 2.2-1.8 4-1.8 4s-1.8-1.8-1.8-4s1.8-4 1.8-4s1.8 1.8 1.8 4m4.7 4.5c0 2.2-1.8 4-1.8 4s-1.8-1.8-1.8-4s1.8-4 1.8-4s1.8 1.8 1.8 4"/></svg>
                  This is a <strong>carbon-neutral</strong> delivery</button>
              </div>
              <div className="w-full flex justify-center items-center mt-4">
                <button onClick={()=> setIsOrder(true)} className="bg-green-700 text-white md:px-28 lg:px-28 px-12 rounded-3xl text-[14px] py-2 border-none">Confirm Order</button>
              </div>
          </div>
          :
            <div className=" p-1">
              <div className="w-full flex justify-center"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="none" viewBox="0 0 128 128"><path fill="#260F08" d="M8.436 110.406c0 1.061 4.636 2.079 12.887 2.829 8.252.75 19.444 1.171 31.113 1.171 11.67 0 22.861-.421 31.113-1.171 8.251-.75 12.887-1.768 12.887-2.829 0-1.061-4.636-2.078-12.887-2.828-8.252-.75-19.443-1.172-31.113-1.172-11.67 0-22.861.422-31.113 1.172-8.251.75-12.887 1.767-12.887 2.828Z" opacity=".15"/><path fill="#87635A" d="m119.983 24.22-47.147 5.76 4.32 35.36 44.773-5.467a2.377 2.377 0 0 0 2.017-1.734c.083-.304.104-.62.063-.933l-4.026-32.986Z"/><path fill="#AD8A85" d="m74.561 44.142 47.147-5.754 1.435 11.778-47.142 5.758-1.44-11.782Z"/><path fill="#CAAFA7" d="M85.636 36.78a2.4 2.4 0 0 0-2.667-2.054 2.375 2.375 0 0 0-2.053 2.667l.293 2.347a3.574 3.574 0 0 1-7.066.88l-1.307-10.667 14.48-16.88c19.253-.693 34.133 3.6 35.013 10.8l1.28 10.533a1.172 1.172 0 0 1-1.333 1.307 4.696 4.696 0 0 1-3.787-4.08 2.378 2.378 0 1 0-4.72.587l.294 2.346a2.389 2.389 0 0 1-.484 1.755 2.387 2.387 0 0 1-1.583.899 2.383 2.383 0 0 1-1.755-.484 2.378 2.378 0 0 1-.898-1.583 2.371 2.371 0 0 0-1.716-2.008 2.374 2.374 0 0 0-2.511.817 2.374 2.374 0 0 0-.493 1.751l.293 2.373a4.753 4.753 0 0 1-7.652 4.317 4.755 4.755 0 0 1-1.788-3.17l-.427-3.547a2.346 2.346 0 0 0-2.666-2.053 2.4 2.4 0 0 0-2.08 2.667l.16 1.173a2.378 2.378 0 1 1-4.72.587l-.107-1.28Z"/><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".974" d="m81.076 28.966 34.187-4.16"/><path fill="#87635A" d="M7.45 51.793c-.96 8.48 16.746 17.44 39.466 19.947 22.72 2.506 42.08-2.16 43.04-10.667l-3.947 35.493c-.96 8.48-20.24 13.334-43.04 10.667S2.463 95.74 3.423 87.18l4.026-35.387Z"/><path fill="#AD8A85" d="M5.823 65.953c-.96 8.453 16.746 17.44 39.573 20.027 22.827 2.586 42.053-2.187 43.013-10.667L87.076 87.1c-.96 8.48-20.24 13.333-43.04 10.666C21.236 95.1 3.53 86.22 4.49 77.74l1.334-11.787Z"/><path fill="#CAAFA7" d="M60.836 42.78a119.963 119.963 0 0 0-10.347-1.627c-24-2.667-44.453 1.893-45.333 10.373l-2.133 18.88a3.556 3.556 0 1 0 7.066.8 3.574 3.574 0 1 1 7.094.8l-.8 7.094a5.93 5.93 0 1 0 11.786 1.333 3.556 3.556 0 0 1 7.067.8l-.267 2.347a3.573 3.573 0 0 0 7.094.826l.133-1.2a5.932 5.932 0 1 1 11.787 1.36l-.4 3.52a3.573 3.573 0 0 0 7.093.827l.933-8.267a1.174 1.174 0 0 1 1.307-.906 1.146 1.146 0 0 1 1.04 1.306 5.947 5.947 0 0 0 11.813 1.334l.534-4.72a3.556 3.556 0 0 1 7.066.8 3.573 3.573 0 0 0 7.094.826l1.786-15.546a2.373 2.373 0 0 0-2.08-2.667L44.143 55.74l16.693-12.96Z"/><path fill="#87635A" d="m59.156 57.66 1.68-14.88-16.827 13.173 15.147 1.707Z"/><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".974" d="M9.796 52.06c-.667 5.866 16.24 12.586 37.733 15.04 14.774 1.68 27.867.906 34.854-1.654"/></svg>
              </div>
              <p className="text-center text-[14px] text-rose-300">Your added items will appear here</p>
            </div>
          }

        </div>
        
      </div>

    </main>
    {
      cart.products.length >0 && isOrder &&
      <div onClick={()=>setIsOrder(!isOrder)} className="fixed left-0 flex justify-center top-0 w-full min-h-screen bg-[#1c1c1c29] md:p-0 lg:p-0 p-4">
       <ConfirmPayment 
        setCart={setCart} 
        isOrder={isOrder} 
        setIsOrder={setIsOrder} 
       cart={cart}/>
    </div>
    
    }
    </>
  );
}
