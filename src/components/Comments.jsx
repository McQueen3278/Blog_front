import React, {useState} from "react";
import usePostWithComments from "../hooks/useComments";

const PostWithComments = ({ postId }) => {
  const { post, comments, loading, error, addComment } = usePostWithComments(postId);

  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!username.trim() || !content.trim()) {
      setFormError("Por favor, completa todos los campos");
      return;
    }

    const result = await addComment(postId, { username, content });
    if (!result.success) {
      setFormError(result.message || "Error al agregar comentario");
      return;
    }

    setUsername("");
    setContent("");
  };

  if (loading) return <p>Cargando post y comentarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div style={{ flex: 1 }}>
        <h2>{post.title}</h2>
        {post.documentFilename ? (
          <iframe
            src={`http://localhost:3000/public/uploads/course-documents/${post.documentFilename}`}
            title={post.title}
            style={{ width: "100%", height: "500px", border: "none" }}
          />
        ) : (
          <p>No hay documento para mostrar</p>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <h3>Comentarios</h3>
        {comments.length === 0 && <p>No hay comentarios aún.</p>}
        <ul>
          {comments.map((c) => (
            <li key={c._id}>
              <strong>{c.username}</strong>: {c.content}
            </li>
          ))}
        </ul>

        <h3>Agregar Comentario</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tu nombre"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", marginBottom: "8px" }}
          />
          <textarea
            placeholder="Escribe tu comentario"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            style={{ width: "100%", marginBottom: "8px" }}
          />
          {formError && <p style={{ color: "red" }}>{formError}</p>}
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default PostWithComments;