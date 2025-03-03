import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewPost = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        author: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // URL da API
    const API_URL = "http://localhost:5000/api";

    // Pegar as mudanças do input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Ação no submit do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação básica
        if (!formData.title || !formData.body) {
            setError("Por favor, preencha o título e o conteúdo do post.");
            return;
        }

        // Criação do post depois de validações
        try {
            setIsSubmitting(true);
            setError(null);

            const response = await axios.post(`${API_URL}/posts`, formData);

            // Redirecionar para a página do post criado
            navigate(`/posts/${response.data.id}`);
        } catch (error) {
            console.error("Erro ao criar post:", error);
            setError("Ocorreu um erro ao criar o post. Por favor, tente novamente.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Criar Novo Post</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-neutral-900 p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-200 font-medium mb-2">
                        Título
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Digite o título do post"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="author" className="block text-gray-200 font-medium mb-2">
                        Autor
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Digite o nome do autor"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="body" className="block text-gray-200 font-medium mb-2">
                        Conteúdo
                    </label>
                    <textarea
                        id="body"
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                        rows="8"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Escreva o conteúdo do post aqui..."
                        required
                    ></textarea>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-4 py-2 text-black bg-white font-bold border border-white opacity-100 hover:bg-neutral-200 cursor-pointer rounded-md transition-colors ${
                            isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                        }`}
                    >
                        {isSubmitting ? "Publicando..." : "Publicar Post"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewPost;
