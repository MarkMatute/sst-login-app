import "./App.css";
import Routes from "./Routes";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./lib/contextLib";
import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

function App() {
  const nav = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    console.log("On Load...");
    try {
      await Auth.currentSession();
      setIsAuthenticated(true);
      console.log("Authenticated...");
    } catch (error) {
      console.log("Not authenticated...");
      console.log(error);
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    setIsAuthenticated(false);
    nav("/login");
  }

  if (isAuthenticating) {
    return <>Loading...</>;
  }

  return (
    <>
      <div>
        {isAuthenticated ? (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to={"/"}>Home</Link> | <Link to="/login">Login</Link> |{" "}
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
      <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </>
  );
}

export default App;
