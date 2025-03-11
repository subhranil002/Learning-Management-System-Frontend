import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

function Denied() {
    const navigate = useNavigate();
    const { state } = useLocation();

    toast.error(state?.message || "Access denied!");

    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">
                403
            </h1>
            <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
                Access denied
            </div>
            <button onClick={() => navigate("/")} className="mt-5">
                <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                    Go Home
                </span>
            </button>
        </main>
    );
}
export default Denied;
