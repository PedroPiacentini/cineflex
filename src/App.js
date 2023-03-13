import styled from "styled-components"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"

export default function App() {

    const [idFilme, setIdFilme] = useState(null);
    const [idSessao, setIdSessao] = useState(null);

    return (
        <BrowserRouter>
            <NavContainer>CINEFLEX</NavContainer>
            <Link to="/" />
            <Routes>
                <Route path="/" element={<HomePage setIdFilme={setIdFilme} />} />
                <Route path={`/sessoes/:${idFilme}`} element={<SessionsPage idFilme={idFilme} setIdSessao={setIdSessao} />} />
                <Route path={`/assentos/:${idSessao}`} element={<SeatsPage idSessao={idSessao} />} />
                <Route path="/sucesso" element={<SuccessPage />} />
            </Routes>
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
