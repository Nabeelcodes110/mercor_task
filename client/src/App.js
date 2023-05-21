import "./App.css";
import Chats from "./pages/Chats/Chats";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import GroupChat from "./pages/Chats/GroupChat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Groups from "./pages/Groups/Groups";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/chats" Component={Chats}></Route>
          <Route path="/groupchats" Component={GroupChat}></Route>
          <Route path="/groups" Component={Groups}></Route>
          <Route path="/users" Component={Users}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
