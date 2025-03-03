import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Admin = () => {
    // Dados dos posts
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // URL da API
    const API_URL = "http://localhost:5000/api";

    // Resgatar os dados do banco de dados
    const getPosts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/posts`);
            setPosts(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar posts:", error);
            setError("Não foi possível carregar os posts. Tente novamente mais tarde.");
            setLoading(false);
        }
    };

    // Função para deletar um post
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${API_URL}/posts/${postId}`);
            setPosts(posts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error("Erro ao deletar post:", error);
            setError("Não foi possível deletar o post. Tente novamente mais tarde.");
        }
    };

    // Executar a função apenas uma vez, no carregamento da página
    useEffect(() => {
        getPosts();
    }, []);

    if (error) {
        return <div className="error-message">{error}</div>;
    }
    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Gerenciar Posts</h1>
            {posts.length === 0 ? (
                <p>Carregando...</p>
            ) : (
                posts.map((post) => (
                    <div className="post p-6 border-b border-neutral-600" key={post.id}>
                        <h2 className="text-white text-xl font-semibold mb-3">{post.title}</h2>
                        <div className="actions flex gap-4">
                            <Link className="font-bold border border-white py-2 px-4 bg-blue-500 rounded-xl opacity-100 transition duration-300 delay-75 hover:bg-blue-400">
                                Editar
                            </Link>
                            <button
                                onClick={() => deletePost(post.id)}
                                className="font-bold border border-white py-2 px-4 bg-red-500 rounded-xl opacity-100 transition duration-300 delay-75 hover:bg-red-400 cursor-pointer"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Admin;
