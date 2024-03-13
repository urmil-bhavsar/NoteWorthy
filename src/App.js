import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import NoteState from "./context/noteContext/NoteState";
import { Alert } from "./components/Alert";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { useState } from "react";
import { AlertitState } from "./context/alertContext/AlertitState";
import { Alert2 } from "./components/Alert2";


function App() {

  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    console.log(alert)
    setTimeout(() => {
      setAlert(null)
    }, 1500);


  }

  return (

    <>
      {/* the state variables in the noteState will be available to all the components and their components */}
      {/* concurrently is an npm package using which you can run multiple servers parallely
      // "both": "concurrently \"npm run start\" \"nodemon backend/index.js\""
      set it in the scripts object of package.json file */}

      <NoteState>

        <AlertitState>
          <BrowserRouter>

            <NavBar />
            <Alert2 />

            {/* <Alert alert={alert} /> */}
            <div className="container">

              <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
                <Route exact path="/about" element={<About />}></Route>
                <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
                <Route exact path="/signup" element={<Signup showAlert={showAlert} />}></Route>
              </Routes>
            </div>
          </BrowserRouter>
        </AlertitState>
      </NoteState >
    </>
  );
}

// add a welcome msg on home screen

export default App;

