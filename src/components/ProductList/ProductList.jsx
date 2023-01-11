import React from "react";
import { useState } from "react";
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
// import { useEffect } from "react";
// import { useCallback } from "react";
import { useTelegram } from "../../hooks/useTelegram";
// import {useTelegram} from "../../hooks/useTelegram";
import { useCallback, useEffect } from "react";


const products=[
    {id: '1', title: "product1", price: 5000, description: "product1 for sell"},
    {id: '2', title: "product2", price: 6000, description: "product2 for sell"},
    {id: '3', title: "product3", price: 7000, description: "product3 for sell"},
    {id: '4', title: "product4", price: 8000, description: "product4 for sell"},
    {id: '5', title: "product5", price: 9000, description: "product5 for sell"},
    {id: '6', title: "product6", price: 1000, description: "product6 for sell"},
    {id: '7', title: "product7", price: 2000, description: "product7 for sell"},
]
const getTotalPrice = (items) =>{
    return items.reduce((acc, item) =>{
        return acc +=item.price
    }, 0);
}
const ProductList = () =>{
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(()=>{
        const data = {
           products: addedItems,
           totalPrice: getTotalPrice(addedItems),
           queryId,
        }
        fetch('http://localhost:8000/web-data',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data)
        })
    },[addedItems]);

    useEffect(()=>{
        tg.onEvent('mainButtonClicked', onSendData);
        return () =>{
            tg.offEvent('mainButtonClicked', onSendData);
        }
    }, [onSendData]);

    const onAdd = (product) =>{
        const alreadyAdded=addedItems.find(item => item.id === product.id);
        let newItems=[];

        if(alreadyAdded){
            newItems = addedItems.filter(item => item.id !== product.id);
        }else{
            newItems=[...addedItems, product];
        }

        setAddedItems(newItems)
        console.log(newItems.length>0);
        if(newItems.length==0){
            tg.MainButton.show();
            // alert("hide");
        }else{
            // alert(tg.MainButton.show());
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Add product! ${getTotalPrice(newItems)}`
            })
        }
    }
    return(
        <div className={'list'}>
            {products.map(item =>(
                <ProductItem 
                    product={item}
                    className={'item'}
                    onAdd={onAdd}
                />
            ))}
        </div>
    );
};

export default ProductList;