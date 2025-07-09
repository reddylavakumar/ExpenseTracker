import { Link } from "@tanstack/react-router";

const Sidebar = () => {
    return (

        <div className="w-50 bg-white-900 text-black p-4 space-y-4">
            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/"
                            className="block px-4 py-2 rounded-md
                            bg-purple-50
                            hover:bg-purple-100
                            transition-all ease-in-out duration-300
                            "
                            activeProps={{
                                className: "bg-purple-700 text-white hover:bg-purple-700",
                            }}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/income"
                            className="block px-4 py-2 rounded-md
                            bg-purple-50
                            hover:bg-purple-100
                            transition-all ease-in-out duration-300
                            "
                            activeProps={{
                                className: "bg-purple-700 text-white hover:bg-purple-700",
                            }}
                        >
                            Income
                        </Link>
                    </li>

                </ul>
            </nav>
        </div>

    );
};

export default Sidebar;
