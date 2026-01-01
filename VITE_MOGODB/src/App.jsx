import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import UserInfo from "./components/UserInfo";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("login");

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleRegisterSuccess = (user) => {
    setCurrentUser(user);
    setActiveTab("login");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    alert("로그아웃되었습니다.");
  };
  return (
    <div className="app-container">
      <h1>MongoDb 회원 인증 시스템</h1>

      {currentUser ? (
        <UserInfo userid={currentUser.id} onLogout={handleLogout} />
      ) : (
        <>
          <div className="tab-container">
            <button
              className={`tab-button ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              로그인
            </button>
            <button
              className={`tab-button ${
                activeTab === "register" ? "active" : ""
              }`}
              onClick={() => setActiveTab("register")}
            >
              회원가입
            </button>
          </div>

          {activeTab === "login" ? (
            <Login onLoginSuccess={handleLoginSuccess} />
          ) : (
            <Register onRegisterSuccess={handleRegisterSuccess} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
