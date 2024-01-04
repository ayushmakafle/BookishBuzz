import Header from "./components/Header";
import {Routes,Route} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import UserBlog from "./components/UserBlog";

function App() {
  return (
    <>
      <Header />
      <main><ToastContainer/></main>

      <Routes>
        <Route path = '/' element={<Blogs />}/>
        <Route path = '/blogs' element={<Blogs />}/>
        <Route path = '/my-blogs' element={<UserBlog />}/>

        <Route path = '/login' element={<Login/>}/>
        <Route path = '/register' element={<Register/>}/>
      </Routes>

    </>
  );
}

export default App;
