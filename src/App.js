import './App.css';
import { useEffect } from 'react';
import { useTelegram } from "./hooks/useTelegram";
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';

// const tg=window.Telegram.WebApp;
function App() {
  const {onToggleButton,tg} = useTelegram();

  useEffect( ()=>{
    tg.ready();
  }, [])

  // const onClose =()=> {
  //   tg.close();
  // }
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />}/>
        <Route path={'Form'} element={<Form />}/>
      </Routes>
      {/* <button onClick={onToggleButton}>toggle</button> */}
     {/* <button onClick={onClose}>click it</button> */}
    </div>
  );
}

export default App;
