import React, { useState } from "react";
import useCourseDetails from "../hooks/useCourseDetails";
import usePostComments from "../hooks/useComments";

const CourseDetail = () => {
  const { course, loading, error } = useCourseDetails();
  const [selectedDoc, setSelectedDoc] = useState(null);

  const {
    comments,
    loading: loadingComments,
    error: errorComments,
    addComment,
  } = usePostComments(selectedDoc?._id, course?._id);

  const handleAddComment = async ({ username, content }) => {
    if (!selectedDoc?._id) return;

    await addComment({
      username,
      content,
      postId: selectedDoc._id,
    });
  };

  if (loading) return <p className="course-loading">Cargando curso...</p>;
  if (error) return <p className="course-error">{error}</p>;

  return (
    <div className="course-detail-container">
      <div className="course-detail-card">
        <img
          src={`http://localhost:3000/uploads/course-images/${course.courseImage}`}
          alt={course.name}
          className="course-detail-image"
          style={{
            maxWidth: "300px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        />
        <h1 className="course-detail-title">{course.name}</h1>
        <p className="course-detail-professor">Profesor: {course.professor}</p>

        <h2 className="course-detail-documents-title">Documentos</h2>
        {course.documents && course.documents.length > 0 ? (
          <ul
            className="course-document-list"
            style={{ listStyle: "none", padding: 0 }}
          >
            {course.documents.map((doc) => (
              <li
                key={doc._id}
                className="course-document-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  cursor: "pointer",
                  border:
                    selectedDoc?._id === doc._id
                      ? "2px solid #005f99"
                      : "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "6px",
                  backgroundColor:
                    selectedDoc?._id === doc._id ? "#e0f0ff" : "white",
                }}
                onClick={() => setSelectedDoc(doc)}
              >
                <img
                  src={
                    doc.thumbnail
                      ? `http://localhost:3000/uploads/course-documents/thumbnails/${doc.thumbnail}`
                      : "http://localhost:3000/uploads/images.png"
                  }
                  alt={doc.title || "Documento"}
                  className="doc-image"
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "12px",
                    objectFit: "contain",
                  }}
                />
                <span className="document-title">{doc.title || "Sin título"}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="course-no-documents">Este curso no tiene documentos aún.</p>
        )}

        {selectedDoc && (
          <div
            className="doc-comments-container"
            style={{ display: "flex", gap: "20px", marginTop: "20px" }}
          >
            <iframe
              src={
                selectedDoc.documentFilename
                  ? `http://localhost:3000/public/uploads/course-documents/${selectedDoc.documentFilename}`
                  : undefined
              }
              title={selectedDoc.title}
              className="doc-iframe"
              style={{
                flex: 1,
                height: "600px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <div
              className="comments-section"
              style={{ flex: 1, display: "flex", flexDirection: "column" }}
            >
              <h3>Comentarios</h3>
              {loadingComments && <p>Cargando comentarios...</p>}
              {errorComments && <p className="course-error">{errorComments}</p>}

              <ul
                className="comments-list"
                style={{
                  overflowY: "auto",
                  maxHeight: "400px",
                  marginBottom: "20px",
                  paddingLeft: 0,
                  listStyle: "none",
                }}
              >
                {comments.map((c) => (
                  <li
                    key={c._id}
                    className="comment-item"
                    style={{
                      marginBottom: "10px",
                      borderBottom: "1px solid #eee",
                      paddingBottom: "6px",
                    }}
                  >
                    <b>{c.username}</b>: {c.content}
                  </li>
                ))}
              </ul>

              <CommentForm onAddComment={handleAddComment} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CommentForm = ({ onAddComment }) => {
  const [username, setUsername] = React.useState("");
  const [content, setContent] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!username.trim() || !content.trim()) {
      setError("Por favor llena todos los campos");
      return;
    }

    onAddComment({ username, content });
    setUsername("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="comment-form"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <input
        type="text"
        placeholder="Nombre"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="comment-input"
        style={{
          marginBottom: "12px",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <textarea
        placeholder="Comentario"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="comment-textarea"
        style={{
          marginBottom: "12px",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      {error && (
        <p className="comment-error" style={{ color: "red", marginBottom: "10px" }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        className="comment-submit-btn"
        style={{
          padding: "10px",
          backgroundColor: "#005f99",
          color: "white",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Enviar comentario
      </button>
    </form>
  );
};

export default CourseDetail;
