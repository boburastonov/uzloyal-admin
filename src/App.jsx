import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Categories from "./pages/categories/categories";
import Faqs from "./pages/faqs/faqs";
import News from "./pages/news/news";
import Blogs from "./pages/blogs/blogs";
import Services from "./pages/services/services";
import Sources from "./pages/sources/sources";
import Layout from "./layout/layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/news" element={<News />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/sources" element={<Sources />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
