import Header from "./components/Header";
import {Routes,Route} from 'react-router-dom'
import Register from "./pages/Register";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path = '/' element={<Blogs />}/>
        <Route path = '/blogs' element={<Blogs />}/>
        <Route path = '/login' element={<Login/>}/>
        <Route path = '/register' element={<Register/>}/>
      </Routes>

    </>
  );
}

export default App;
