import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import Layout from "../Layout/Layout";
import { auth } from "../firebase/auth";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {

        e.preventDefault();

        setLoading(true);

        try {

            await signInWithEmailAndPassword(

                auth,

                email,

                password

            );

            navigate("/admin");

        }

        catch {

            alert("Correo o contraseña incorrectos.");

        }

        setLoading(false);

    }

    return (

        <Layout>

            <div className="max-w-md mx-auto">

                <h1 className="text-3xl font-bold mb-8">

                    Iniciar sesión

                </h1>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-xl p-4"
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-xl p-4"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full py-4 bg-[#D08A9B] text-white font-bold"
                    >

                        {

                            loading

                                ? "Ingresando..."

                                : "Ingresar"

                        }

                    </button>

                </form>

            </div>

        </Layout>

    );

}

export default Login;