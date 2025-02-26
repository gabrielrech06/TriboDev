import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL da API
  const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar post:", error);
        setError("Não foi possível carregar o post. Tente novamente mais tarde.");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center py-8">Carregando...</p>;
  if (error) return <div className="error-message">{error}</div>;
  if (!post) return <p>Post não encontrado</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/" 
        className="inline-block mb-6 text-blue-600 hover:underline"
      >
        &larr; Voltar para a página inicial
      </Link>
      
      <article className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        {post.author && (
          <p className="text-gray-600 mb-2">Por: {post.author}</p>
        )}
        <p className="text-gray-500 mb-6">
          {new Date(post.created_at).toLocaleDateString('pt-BR')}
        </p>
        <div className="prose max-w-none">
          <p>{post.body}</p>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;