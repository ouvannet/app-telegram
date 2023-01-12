import React from "react";
import { useTelegram } from "../../hooks/useTelegram";
import Button from "../Button/Button";
import './Header.css';


const Header=()=>{
    const { user, onClose} = useTelegram();
      
    return(
        <div className={'header'}>
            <a href="https://thriving-florentine-2ed8c9.netlify.app/form"><Button onClick={onClose}>Click button</Button></a>
            <span className={'username'}>
                {user?.username}
            </span>
        </div>
    );
};

export default Header;