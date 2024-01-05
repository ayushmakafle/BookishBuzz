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
import LandingPage from './pages/LandingPage';
import EditBlogDetails from './pages/EditBlogDetails';
import BlogDetail from './pages/BlogDetail';

function App() {
  return (
    <>
      <Header />
      <main>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/my-blogs" element={<UserBlog />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/blog-detail/:id" element={<BlogDetail />} />
          <Route path="/edit-blog-details/:id" element={<EditBlogDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
