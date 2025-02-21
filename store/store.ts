
import { create } from "zustand"
import { persist } from 'zustand/middleware'

export interface NewProps {
    productId:string
    productName:string
    description:string
    productImage:string
    price:number
    qty:number
}

type Actions = {
    Items:NewProps[],
    handleAddCart: (product:NewProps)=>void
    handleReduceCart:(id:string)=>void
    handleDelete:(id:string)=> void
}
export const useStore = create<Actions>()(
    persist(
        (set,get)=>({
            Items:[],
         
            handleAddCart:(cartProduct:NewProps)=>{
                const products = get().Items
                
                const existingOrder = products.find((product)=> product.productId === cartProduct.productId)
                
               
                if(existingOrder){
                    const updatedProducts = products.map((product) =>
                        product.productId === cartProduct.productId
                    
                            ? { ...product, qty: product.qty + 1 }
                            : product
                    );
                    
                    set({ Items: updatedProducts });
                    return;
                }
                set({Items:[...products, { ...cartProduct, qty: 1 }]})
            },
            handleReduceCart:(id:string)=>{
                const products = get().Items
                products.find((product)=> product.productId === id)

                    const updatedProducts = products.map((product) =>
                        product.productId === id
                    
                            ? { ...product, qty: product.qty - 1 }
                            : product
                    );
                    set({ Items: updatedProducts });
                    return
                },
            handleDelete:(id:string)=>{
                const filteredItems = get().Items.filter((item)=> item.productId !== id)
                set({Items:filteredItems})
            }
        }),
        {
            name: "OrderStorage"
        }
    )
)

