// Import necessary components
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import Blogs from './pages/Blogs';
import UserBlog from './pages/UserBlog';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <>
      <Header />
      <main>
        <ToastContainer />
        {/* Use Routes component */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/my-blogs" element={<UserBlog />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/blog-details/:id" element={<BlogDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
