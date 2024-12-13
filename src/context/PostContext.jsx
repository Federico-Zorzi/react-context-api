import { createContext, useContext } from "react";
import { useEffect, useState } from "react";

const PostListContext = createContext();

// * export for consumers
export const usePostListContext = () => useContext(PostListContext);

// * export for provider
export const PostListContextProvider = ({ children }) => {
  const backendPath = import.meta.env.VITE_BACKEND_URL;
  const backendPostListPath =
    backendPath + import.meta.env.VITE_BACKEND_URL_POST;

  const [postList, setPostList] = useState(null);

  // fetch catch post list from backend
  const fetchPostList = () => {
    fetch(backendPostListPath)
      .then((res) => res.json())
      .then((data) => {
        const { newPostList } = data;

        setPostList(newPostList);
      });
  };
  useEffect(fetchPostList, []);

  // fetch for delete a post
  const fetchDeletePost = (id) => {
    console.log(`${backendPostListPath}/${id}`);
    console.log(id);

    fetch(`${backendPostListPath}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        const { posts } = data;
        setPostList(posts);
      });
  };

  const postData = {
    postList,
    deletePost: fetchDeletePost,
  };

  return (
    <PostListContext.Provider value={postData}>
      {children}
    </PostListContext.Provider>
  );
};
