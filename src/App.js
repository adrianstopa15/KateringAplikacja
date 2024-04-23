import "./App.css";
import MainPage from "./mainPage";
import "./mainPageStyle.css";
import "./profilePages.css";
import ProfilePage from "./profilePages";
import { useAuth } from "./AuthContext";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const { isLoggedIn } = useAuth();
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsProfileCompleted(false);
    }
  }, [isLoggedIn]);

  const handleProfileCompletion = () => {
    console.log("Profile completed");
    setIsProfileCompleted(true);
  };
  
  return (
    <div>
      {isLoggedIn && !isProfileCompleted ? (
        <ProfilePage onCompleted={handleProfileCompletion} />
      ) : (
        <MainPage />
      )}
    </div>
  );
}

export default App;