/* import { useEffect, useState } from "react"; */
import { data, useLocation, useNavigate } from "react-router";

import { usePostListContext } from "../context/PostContext";

export default function postList() {
  const backendPath = import.meta.env.VITE_BACKEND_URL;
  const backendpostListPath =
    backendPath + import.meta.env.VITE_BACKEND_URL_POST;

  const { postList, deletePost } = usePostListContext();

  const goToPage = useNavigate();

  return postList && postList.length > 0 ? (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Preview</th>
          <th scope="col">Titolo</th>
          <th scope="col">Autore</th>
          <th scope="col">Categoria</th>
          <th scope="col">Pubblicato</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {postList.map((post) => (
          <tr key={post.id}>
            <td>
              <img
                src={backendPath + post.image}
                className="rounded"
                width="80"
              />
            </td>
            <td>{post.title}</td>
            <td>{post.author}</td>
            <td>{post.category}</td>
            <td>
              {post.isPublished ? (
                <span className="badge text-bg-success">Pubblicato</span>
              ) : (
                <span className="badge text-bg-warning">Non pubblicato</span>
              )}
            </td>
            <td>
              {/* show post button */}
              <button
                type="button"
                onClick={() => goToPage(`/postList/${post.id}`)}
                className="btn btn-outline-secondary me-1"
              >
                <i className="fa-regular fa-eye fa-sm"></i>
              </button>

              {/* modify post button */}
              <button
                onClick={() => {}}
                type="button"
                className="btn btn-success me-1"
              >
                <i className="fa-solid fa-pen fa-sm"></i>
              </button>

              {/* delete post button */}
              <button
                type="button"
                className="btn btn-danger me-1"
                data-bs-toggle="modal"
                data-bs-target={`#deleteModal${post.id}`}
              >
                <i className="fa-solid fa-trash fa-sm"></i>
              </button>

              {/* modal for delete post */}
              <div
                className="modal fade"
                id={`deleteModal${post.id}`}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1
                        className="modal-title fs-5"
                        id={`deleteModal${post.id}`}
                      >
                        Eliminazione Post: {post.title}
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Stai per eliminare il post "{post.title}". Vuoi
                      proseguire?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Annulla
                      </button>
                      <button
                        type="button"
                        onClick={() => deletePost(post.id)}
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                      >
                        Elimina
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="alert alert-danger" role="alert">
      Non ci sono post disponibili
    </div>
  );
}
