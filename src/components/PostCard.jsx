export default function PostCard({
  title,
  author,
  content,
  tags,
  category,
  image,
  isPublished,
}) {
  return (
    <div className="card my-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={image} className="img-fluid rounded-start" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              {title}
              <span className="badge text-bg-primary ms-2">{category}</span>
            </h5>
            <small className="text-body-secondary">{author}</small>
            <p className="card-text">{content}</p>

            {tags && Array.isArray(tags) ? (
              tags.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-1">
                  #{tag}
                </span>
              ))
            ) : (
              <p>No tags available.</p>
            )}

            {isPublished ? (
              <span className="badge text-bg-success position-absolute top-0 start-0 py-2">
                Pubblicato
              </span>
            ) : (
              <span className="badge text-bg-warning position-absolute top-0 start-0 py-2">
                Non pubblicato
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
