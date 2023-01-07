import { useEffect } from 'react';
import './App.css';
import { useTelegram } from "./hooks/useTelegram";

// const tg=window.Telegram.WebApp;
function App() {
  const {onToggleButton} = useTelegram();

  useEffect( ()=>{
    tg.ready();
  })

  // const onClose =()=> {
  //   tg.close();
  // }
  return (
    <div className="App">
      <button onClick={onToggleButton}>toggle</button>
     {/* <button onClick={onClose}>click it</button> */}
    </div>
  );
}

export default App;
