import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-8 bg-neutral-900">
      <h2 className="opacity-100 font-bold text-3xl">
        <Link to={"/"}>TriboDev</Link>
      </h2>
      <ul className="flex gap-4">
        <li>
          <Link
            className="opacity-80 transition duration-300 hover:opacity-100"
            to={"/home"}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="font-bold border border-white py-2 px-4 rounded-xl opacity-100 transition duration-300 delay-75 hover:bg-white hover:text-black"
            to={"/new"}
          >
            Novo Post
          </Link>
          <Link
            className="opacity-80 transition duration-300 hover:opacity-100 pl-3"
            to={"/admin"}
          >
            Gerenciar
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
