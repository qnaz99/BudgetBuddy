import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login';
import Dashboard from "./Dashboard";


const App: React.FC = () => {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/dashboard/:id" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
