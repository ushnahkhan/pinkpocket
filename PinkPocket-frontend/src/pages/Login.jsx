import { Link } from "react-router-dom";
import logo from "../assets/icons/pinkpicon.png";

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="bg-white rounded-full p-6 shadow-md mb-4">
            <span className="text-4xl text-pink-400">🛒</span>
            </div>

            <h2 className="text-2xl font-semibold mb-1 text-center">
                Welcome Back!
            </h2>

            <p className="text-sm text-gray-500 mb-6">
                Login to your PinkPocket Account
            </p>
            <div className="card w-[320px] md:w-[380px]">
                <label className="text-sm mb-1 block">Email Address</label>
                <input
                    type="email"
                    placeholder=""
                    className="input-field mb-4"
                />
                <label className="text-sm mb-1 block">Password</label>
                    <input
                        type="password"
                        placeholder=""
                        className="input-field mb-6"
                    />
                <button className="btn-primary w-full mb-4">
                    Login
                </button>
                <p className="text-xs text-center text-gray-500">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-pink-400 font-medium">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;