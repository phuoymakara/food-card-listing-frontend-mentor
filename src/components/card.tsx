'use client'

import { ICart, IProductCart, IProducts } from "@/app/page";
import Image from "next/image";

interface Props{
  data : IProducts;
  carts: Array<{id:number;qty:number;}> | Array<any>;
  setCart: (cart: any) => void;
  indexCarts: Array<number>;
}

export function Card({ data, carts, indexCarts, setCart}: Props){
  const handleAddCart = ( product: IProducts) =>{
    const qty =1;

    setCart((cat:ICart)=>{
      let updateData = [...cat.products]

      let finalData : IProductCart[]
      if(updateData.length<=0){
        updateData.push({
          id: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
          price_perUnit: product.price * 1,
          image: product.image.thumbnail
        })
      }else{
        const existingProductIndex = updateData.findIndex(p => p.id === product.id);
        console.log('IND',existingProductIndex)
        if(existingProductIndex>=0){
          updateData = updateData.map((p) =>{
            if(p.id === product.id){
              return {
                id: p.id,
                name: p.name,
                price: p.price,
                qty: p.qty+1,
                price_perUnit: p.price * (p.qty+1),
                image: p.image
              }
            }else{
              return p
            }
          })
        }else{
          const sample = {
            id: product.id,
            name: product.name,
            price: product.price,
            qty: 1,
            price_perUnit: product.price * 1,
            image: product.image.thumbnail
          }
          updateData.push(sample);
        }
      }
      const updatedTotal = updateData.reduce((sum, prod) => sum + prod.price_perUnit, 0) ;
      return {
        products: updateData,
        total: updatedTotal,
      }
    })
  }
  const handleReduceCart = (id:number)=>{
    setCart((cat:ICart)=>{
      let updateData = [...cat.products]
      const existingProductIndex = updateData.findIndex(p => p.id === id);
      if(existingProductIndex>=0){
        updateData = updateData.map((p) =>{
          if(p.id === id && p.qty > 1){
            return {
              id: p.id,
              name: p.name,
              price: p.price,
              qty: p.qty-1,
              price_perUnit: p.price * (p.qty-1) 
            }
          }else{
            return p;
          }
        })
      }
      const updatedTotal = updateData.reduce((sum, prod) => sum + prod.price_perUnit, 0) ;
      
      return {
        products: updateData,
        total: updatedTotal,
      }
    })
  }
  console.log('carts',carts)
  return(
    <>
      <div className="text-left rounded-lg">
        <div className="relative mb-4">
          <Image 
          width={150}
          height={60} 
          className="object-fill w-full rounded-lg h-60" 
          src={data.image.desktop} 
          alt="test"/>
          {
            carts.length >  0 && indexCarts.includes(data.id) ? 
            <>
              <button 
                className="absolute text-white text-[14px] md:left-[25%] lg:left-[25%] left-[28%] top-[92%] px-2 py-1  border-green-400 rounded-2xl bg-green-600 border flex items-center gap-x-8">
                <span onClick={()=> handleReduceCart(data.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><g fill="none" stroke="#FFFF" stroke-linejoin="round" stroke-width="4"><path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"/><path stroke-linecap="round" d="M16 24h16"/></g></svg>
                </span>
                {carts.filter((f) => f.id === data.id)[0].qty}
                <span onClick={()=> handleAddCart(data)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#FFFF" d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm1 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                </span>
              </button>
            </>
            : 
            <>
              <button 
                onClick={()=> handleAddCart(data)}
                className="absolute text-[14px] flex gap-x-3 md:left-[25%] lg:left-[25%] left-[28%] top-[92%] px-6 py-1  border-green-400 rounded-2xl bg-white border ">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#888888" d="M12 9c.55 0 1-.45 1-1V6h2c.55 0 1-.45 1-1s-.45-1-1-1h-2V2c0-.55-.45-1-1-1s-1 .45-1 1v2H9c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1m-5 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2m10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2m-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.24-6.14a1 1 0 0 0-.4-1.34a.996.996 0 0 0-1.36.41L15.55 11H8.53L4.27 2H2c-.55 0-1 .45-1 1s.45 1 1 1h1l3.6 7.59l-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1s-.45-1-1-1H7z"/></svg>
                Add Cart
              </button>
            </>
          }
        </div>
        <label htmlFor="name_1" className=" text-rose-300 text-[14px]">{data.category}</label>
        <h3 className=" font-bold">{data.name}</h3>
        <h3 className="text-red-500 font-medium">${data.price.toFixed(2)}</h3>
      </div>
    </>
  );
}