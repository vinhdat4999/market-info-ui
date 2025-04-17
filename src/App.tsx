import React from "react";
import {ToastContainer} from "react-toastify";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HOME} from "./constants/routeConstants";
import Home from "./pages/Home/Home";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/NotFound/NotFound";

function App() {
    return (
        <div className="App">
            <ToastContainer/>
            <BrowserRouter>
                <Routes>
                    <Route
                        path={HOME}
                        element={
                            <Home/>
                        }
                    />

                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
