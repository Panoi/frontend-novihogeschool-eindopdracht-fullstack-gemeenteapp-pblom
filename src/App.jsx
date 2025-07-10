import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from "./pages/homepage/Home.jsx";
import Login from "./pages/loginpage/Login.jsx";
import Register from "./pages/registerpage/Register.jsx";
import Profile from "./pages/profilepage/Profile.jsx";
import Proposal from "./pages/proposalpage/Proposal.jsx";
import ProposalOverview from "./pages/proposaloverviewpage/ProposalOverview.jsx";
import NavBar from "./components/navbar/NavBar.jsx";
import ProposalDetail from "./pages/proposaldetailpage/ProposalDetail.jsx";
import Municipality from "./pages/municipality/Municipality.jsx";
import Footer from "./components/footer/Footer.jsx";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";

function App() {

    const { isAuth, user } = useContext(AuthContext);

  return (

      <>
          <NavBar/>
          <main className="main-container">
                  <Routes>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/inloggen" element={<Login/>}/>
                      <Route path="/registreren" element={<Register/>}/>
                      <Route path="/profiel" element={isAuth ? <Profile/> : <Navigate to="/"/>}/>
                      <Route path="/voorstel-aanmaken" element={user?.authorities?.includes("ROLE_RESIDENT") ? <Proposal/> : <Navigate to="/"/>}/>
                      <Route path="/voorstellen" element={(user?.authorities?.includes("ROLE_RESIDENT") || user?.authorities?.includes("ROLE_MUNICIPALITY")) ? <ProposalOverview/> : <Navigate to="/"/>}/>
                      <Route path="/voorstel/:id" element={(user?.authorities?.includes("ROLE_RESIDENT") || user?.authorities?.includes("ROLE_MUNICIPALITY")) ? <ProposalDetail/> : <Navigate to="/"/>}/>
                      <Route path="/gemeente" element={user?.authorities?.includes("ROLE_ADMIN") ? <Municipality/> : <Navigate to="/"/>}/>
                  </Routes>
          </main>
          <Footer/>
          </>
          )
          }

          export default App
