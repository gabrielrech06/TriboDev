import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
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

    // Executar a função apenas uma vez, no carregamento da página
    useEffect(() => {
        getPosts();
    }, []);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Últimos Posts</h1>
            {loading ? (
                <p className="text-center py-8">Carregando...</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <div className=" bg-neutral-700 p-6 rounded-lg" key={post.id}>
                            <h2 className="text-white text-xl font-semibold mb-3">{post.title}</h2>
                            <p className="text-gray-400 mb-4 line-clamp-3">{post.body}</p>
                            {post.author && (
                                <p className="text-sm text-gray-300 mb-3">Por: {post.author}</p>
                            )}
                            <Link
                                to={`/posts/${post.id}`}
                                className="inline-block bg-neutral-50 text-neutral-600 px-4 py-2 rounded-md hover:bg-neutral-200 transition-colors"
                            >
                                Ler mais
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
