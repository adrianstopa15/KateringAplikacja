import "./App.css";
import MainPage from "./mainPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./mainPageStyle.css";
import "./profilePages.css";
import UserPanel from './userPanel/userPanel'; 
import ProfilePage from "./profilePages";
import CateringForm from "./cateringForm";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<UserPanel />} />
        <Route path="/profilePages" element={<ProfilePage/>} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
