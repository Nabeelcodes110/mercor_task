import "./App.css";
import Chats from "./pages/Chats/Chats";
import Home from "./pages/Home/Home";
import Rooms from "./pages/Rooms/Rooms";
import Users from "./pages/Users/Users";
import GroupChat from "./pages/Chats/GroupChat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/chats" Component={Chats}></Route>
          <Route path="/groupchats" Component={GroupChat}></Route>
          <Route path="/users" Component={Users}></Route>
          <Route path="/rooms" Component={Rooms}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
