import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import './Form.css';

const Form = () =>{
    const[country, setCountry]= useState('');
    const[street, setStreet]= useState('');
    const[subject, setSubject]= useState('physical');
    const{tg} = useTelegram();

    useEffect( () =>{
        tg.MainButton.setParams({
            text: 'Click main'
        })
    }, [])

    useEffect(() =>{
        if(street || country){
            tg.MainButton.show();
        }else{
            tg.MainButton.hide();
        }
    }, [country, street]);

    const onChangeCountry = (e) =>{
        setCountry(e.target.value)
    }
    const onChangeStreet= (e) =>{
        setStreet(e.target.value)
    }
    const onChangeSubject = (e) =>{
        setSubject(e.target.value)
    }
    return (
        <div className={"form"}>
            <h3>Use form in react</h3>
            <input className={'input'} value={country} onChange={onChangeCountry} type="text" placeholder={'Name'}  />
            <input className={'input'} value={street} onChange={onChangeStreet} type="text" placeholder={'password'}  />

            <select className={'select'} value={subject} onChange={onChangeSubject}>
                <option value={'physical'}>Male</option>
                <option value={'legal'}>Female</option>
            </select>
        </div>
    );
};

export default Form;