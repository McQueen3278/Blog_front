import { useState, useEffect } from "react";
import { getPostWithComments, addComment as apiAddComment } from "../services/Api";

const usePostComments = (postId, courseId) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPostComments = () => {
    if (!postId) return;
    setLoading(true);
    getPostWithComments(postId)
      .then(data => {
        if (!data.success) throw new Error(data.message || "Error");
        setPost(data.post);
        setComments(data.post.comments || []);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPostComments();
  }, [postId]);

  const addComment = async (comment) => {
    if (!courseId || !postId) return;
    setLoading(true);
    try {
      const result = await apiAddComment(courseId, { ...comment, postId });
      if (!result.success) throw new Error(result.message || "Error agregando comentario");
      await loadPostComments();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { post, comments, loading, error, addComment };
};

export default usePostComments;
