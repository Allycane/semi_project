import { axiosPost } from "./dataAxios.js";

export const addItem=async ({pid,size,qty,userId})=>{

    const item = {
        pid:pid,
        size:size,
        qty:qty,
        userId:userId
    };
    const cartItems= await axiosPost("/carts/add",item);
    console.log(cartItems);
    return cartItems;

}
