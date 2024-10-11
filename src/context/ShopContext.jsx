import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { toBeInTheDOM } from "@testing-library/jest-dom/dist/matchers";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});


    const addToCart = async (itemId,size) => {
        // Checks if the item size has been selected
        if (!size) {
            toast.error('Select product size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        toast.success('Item added to cart');
    }

    const getCartCount = () => {
        let totalCount = 0;

        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                   if(cartItems[items][item] > 0){
                    totalCount += cartItems[items][item];
                   } 
                }catch(error){

                }
            }
        }
        return totalCount;
    }

    useEffect(()=>{
        console.log(cartItems);
    },[cartItems])


    


    const value = {
        products, currency, delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,getCartCount
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;