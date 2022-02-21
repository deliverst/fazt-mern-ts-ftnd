import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import VideoList from "./componentes/Videos/VideoList";
import VideoForms from "./componentes/Videos/VideoForm";
// import 'bootswatch/dist/pulse/bootstrap.min.css'
import Navbar from "./componentes/Navbar/Navbar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Navbar/>
            <div className="container pt-5">
                <Routes>
                    <Route path="/" element={<VideoList/>}/>
                    <Route path="/new-video" element={<VideoForms/>}/>
                    <Route path="/update/:id" element={<VideoForms/>}/>
                </Routes>
                <ToastContainer/>
            </div>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);


