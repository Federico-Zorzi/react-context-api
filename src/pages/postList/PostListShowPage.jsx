import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../../components/PostCard";

export default function PostListShowPage() {
  const { id } = useParams();

  const backendPath = import.meta.env.VITE_BACKEND_URL;
  const backendPostListPath =
    backendPath + import.meta.env.VITE_BACKEND_URL_POST;

  const goToPage = useNavigate();

  const [postSelected, setPostSelected] = useState({});

  const fetchShowPost = () => {
    fetch(`${backendPostListPath}/${id}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            goToPage("/notFound");
          }
          throw new Error("Qualcosa è andato storto");
        }
        return res.json();
      })
      .then((data) => {
        setPostSelected(data);
      });
  };

  useEffect(fetchShowPost, []);

  return (
    <main>
      <div className="container">
        <div className="d-flex justify-content-between pt-3">
          {/* page title */}
          <h3>{postSelected.title}</h3>

          {/* back to previous page btn */}
          <button
            onClick={() => goToPage(-1)}
            type="button"
            className="btn btn-outline-secondary me-1"
          >
            Indietro
          </button>
        </div>

        {/* card visualization post */}
        <PostCard
          title={postSelected.title}
          author={postSelected.author}
          content={postSelected.content}
          tags={postSelected.tags}
          category={postSelected.category}
          image={backendPath + postSelected.image}
          isPublished={postSelected.isPublished}
        ></PostCard>
      </div>
    </main>
  );
}
