import './App.css'
import Nav from './components/Nav.jsx';
import { SideBar } from './components/SideBar.jsx';
import Home from './pages/Home.jsx'

function App() {


  return (
    <div className="container-fluid position-relative d-flex p-0">
      <SideBar />
      <div className="content">
        <Nav />
        <Home />
        
      </div>
    </div>
  );
}

export default App
