import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { GamePage, Login } from './components'

function App() {

  return (
   <Router>
    <div>
    <nav>
          <button>
            <Link to="/gamepage">gamepage</Link>
          </button>
          <button>
            <Link to="/login">Login</Link>
          </button>
        </nav>
      <Routes>
          <Route path="/gamepage" element={<GamePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>

    </div>
   </Router>
  )
}

export default App
