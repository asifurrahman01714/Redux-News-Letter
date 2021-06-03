import React from "react";
import { useSelector } from "react-redux";
import Home from './Components/Home';
import News from './Components/News';
import Navbar from './Components/Navebar';
import { selectSignedIn } from "./features/userSlice";
import "./styling/app.css";
function App() {
  const isSignedIn = useSelector(selectSignedIn);
  return (
    <div className="app">
      <Navbar/>
      <Home/>
      {isSignedIn && <News/>}
    </div>
  );
}

export default App;
