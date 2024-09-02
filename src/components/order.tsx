'use client'

import { ICart } from "@/app/page"
import Image from "next/image";

interface IConfirm{
  cart: ICart;
  isOrder: boolean;
  setCart: (cart: any) => void;
  setIsOrder: (isOrder:boolean) => void
}

export function ConfirmPayment({ cart, isOrder,setCart ,setIsOrder }: IConfirm){
  const plceOrder = () =>{
    setIsOrder(!isOrder)
    const order = {
      products: [],
      total : 0
    }
    setCart(order);
  }
  return (
    <>
      <div className={`md:w-auto lg:w-auto w-full p-4 my-4 rounded-lg  ${cart.products.length<=2 ? 'h-[60vh]': 'h-[80vh]'} overflow-y-auto bg-white`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ff1261" fill-rule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1.177-7.86l-2.765-2.767L7 12.431l3.119 3.121a1 1 0 0 0 1.414 0l5.952-5.95l-1.062-1.062z"/></svg>
            <h3 className="text-[18px]  font-bold">Order Confirmed</h3>
            <p className="text-left text-[12px] text-red-300">We hope you enjoy your food!</p>
            <div className="rounded-md bg-rose-50 mt-3">
            {
              cart.products.map((ct,ix) =>{
                return (
                  <>
                    <div key={ix} className="px-2  py-4  flex justify-between border-b">
                      <div className="block text-left ">
                        <div className="flex gap-x-2">
                          <Image alt="test" width={60} height={20} src={`${ct.image?.toString()}`}/>
                          <div className="block">
                          <h3>{ct.name}</h3>
                          <div className="flex gap-x-4">
                            <span className="text-red-500">{ct.qty} x</span>
                            <span className="text-rose-300 flex gap-x-3">
                              @ ${ct.price.toFixed(2)}  
                              <strong className="text-red-300">${ct.price_perUnit.toFixed(2)}</strong>
                            </span>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })
            }
            </div>
              <div className="flex justify-between py-2">
                <label htmlFor="ad">Order Total</label>
                <h3 className="font-bold">$ {cart.total.toFixed(2)}</h3>
              </div>
              
              <div className="w-full flex justify-center items-center my-2">
                <button  onClick={plceOrder} className="bg-green-700 text-white md:px-28 lg:px-28 px-12 rounded-3xl text-[14px] py-2 border-none">Start New Order</button>
              </div>
          </div>
    </>
  )
}

