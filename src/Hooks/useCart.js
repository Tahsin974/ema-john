import { useEffect, useState } from "react";
import { getStoredCart } from "../utilities/fakedb"

const useCart = () => {
    const [cart,setCart] = useState([]);
    const savedCart = getStoredCart();
    const keys = Object.keys(savedCart);
    const baseURL = 'https://ema-john-server-ashen.vercel.app';
    useEffect(()=>{
        fetch(`${baseURL}/products/byKeys`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(keys)
        })
        .then(res => res.json())
        .then(products => {
            if(products.length){
            const storedCart = [];
            for(const key in savedCart){
                const addedProduct = products.find(product=> product.key === key);
                if(addedProduct){
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);
                }
            }
            setCart(storedCart)
        }
        })
        
    },[])

    return[cart,setCart];
}
export default useCart;