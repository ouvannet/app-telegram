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
    {id: '1', title: "product1", price: 5000, description: "product1 for sell",image:"https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg?20201002142956"},
    {id: '2', title: "product2", price: 6000, description: "product2 for sell",image:"https://www.azamara.com/sites/default/files/heros/gettyimages-1066110176.jpg"},
    {id: '3', title: "product3", price: 7000, description: "product3 for sell",image:"https://i.ndtvimg.com/i/2016-04/japanese-food-625_625x406_81461928658.jpg"},
    {id: '4', title: "product4", price: 8000, description: "product4 for sell",image:"https://www.kobeteppanyaki.com.au/wp-content/uploads/2020/03/shutterstock_304585997.jpg"},
    {id: '5', title: "product5", price: 9000, description: "product5 for sell",image:"https://www.westernunion.com/blog/wp-content/uploads/2016/09/GettyImages-184847747.jpg"},
    {id: '6', title: "product6", price: 1000, description: "product6 for sell",image:"https://www.wapititravel.com/blog/wp-content/uploads/2020/01/sukiyaka_healthy_japan_food.jpg"},
    {id: '7', title: "product7", price: 2000, description: "product7 for sell",image:"https://img.delicious.com.au/gBdW4Yag/del/2020/06/spanner-crab-rice-with-edamame-and-tobiko-135052-2.jpg"},
    {id: '7', title: "product7", price: 2000, description: "product7 for sell",image:"https://cms-b-assets.familysearch.org/dims4/default/e71869b/2147483647/strip/true/crop/800x500+0+0/resize/800x500!/format/jpg/quality/90/?url=https%3A%2F%2Ffamilysearch-brightspot.s3.amazonaws.com%2Fdd%2F33%2F8f60513f0809a221a6daeb4ea797%2Fjapanese-ramen-lunch.jpg"},
    {id: '7', title: "product7", price: 2000, description: "product7 for sell",image:"https://www.swedishnomad.com/wp-content/images/2018/09/yakitori-Classic-food-Japan.jpg"},
    {id: '7', title: "product7", price: 2000, description: "product7 for sell",image:"https://www.maruha-nichiro.com/who_we_are/img/Japanese-food-culture_02.png"},
    {id: '7', title: "product7", price: 2000, description: "product7 for sell",image:"https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2018/02/Tai-Seabream.jpg"},
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