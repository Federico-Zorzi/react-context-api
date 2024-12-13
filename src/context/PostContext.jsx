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
    fetch(`${backendPostListPath}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        fetchPostList();
      });
  };

  /* fetch for add new post*/
  const fetchPostNewEl = (e, formData) => {
    e.preventDefault();

    fetch(backendPostListPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.title,
        author: formData.author,
        content: formData.content,
        image:
          "/images/" + (formData.image ? formData.image : "img-default.svg"),
        category: formData.category,
        isPublished: formData.isPublished,
        tags: formData.tags,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchPostList();
      });
  };

  const postData = {
    postList,
    deletePost: fetchDeletePost,
    addPost: fetchPostNewEl,
  };

  return (
    <PostListContext.Provider value={postData}>
      {children}
    </PostListContext.Provider>
  );
};
