import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AddEmployee from './pages/employee';
import Layout from './layouts/adminLayout';
import AddDepartment from './pages/department';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                <Route path="addemployee" element={<AddEmployee/>}/>
                <Route path="addDepartment" element={<AddDepartment/>}/>
                </Route>
            </Routes>
        </Router>
    )


}

export default App;
