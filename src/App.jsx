// * import react hook
import { BrowserRouter, Routes, Route } from "react-router-dom";
/* import { useState } from "react"; */

// * import contexts
import { PostListContextProvider } from "./context/PostContext";

// * import default layout
import DefaultLayout from "./layouts/DefaultLayout";

// * import pages
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import PostListPage from "./pages/postList/PostListPage";
import PostListShowPage from "./pages/postList/PostListShowPage";
import PostListPostPage from "./pages/postList/PostListPostPage";
import NotFound from "./pages/notFound";

function App() {
  return (
    <>
      <PostListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route index Component={HomePage} />
              <Route path="/aboutUs" Component={AboutUsPage} />
              <Route path="/notFound" Component={NotFound}></Route>

              <Route path="/postList">
                <Route index Component={PostListPage} />
                <Route path=":id" Component={PostListShowPage} />
                <Route path="addPost" Component={PostListPostPage} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </PostListContextProvider>
    </>
  );
}

export default App;
