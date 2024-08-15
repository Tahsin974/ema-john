import { useEffect, useState } from "react"

const useProducts = () =>{
    const [products,setProducts] = useState([]);
    const baseURL = 'https://ema-john-server-ashen.vercel.app';
    useEffect(()=>{
        fetch(`${baseURL}/products`)
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])

    return[products];
}

export default useProducts;