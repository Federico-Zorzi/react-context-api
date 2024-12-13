import { useEffect, useState } from "react";
import { data, useLocation, useNavigate } from "react-router";

import PostList from "../../components/PostList";

export default function PostListPage() {
  const backendPath = import.meta.env.VITE_BACKEND_URL;
  const backendPostListPath =
    backendPath + import.meta.env.VITE_BACKEND_URL_POST;

  const goToPage = useNavigate();

  return (
    <main>
      <div className="container pt-3">
        <div className="d-flex justify-content-between">
          {/* page title */}
          <div>
            <h2>Post List</h2>
          </div>

          {/* add post btn */}
          <div>
            <button
              onClick={() => goToPage(`/postList/addPost`)}
              type="button"
              className="btn btn-primary me-1"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <PostList />
      </div>
    </main>
  );
}
