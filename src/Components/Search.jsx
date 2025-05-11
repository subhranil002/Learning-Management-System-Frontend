import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

function Search({ cb, setSearchQuery }) {
    const { register, handleSubmit, watch } = useForm();

    function search(data) {
        cb(data.searchQuery);
    }

    useEffect(() => {
        setSearchQuery(watch("searchQuery"));
    }, [watch("searchQuery")]);

    return (
        <form
            className="mb-12 max-w-3xl mx-auto"
            onSubmit={handleSubmit(search)}
        >
            <div className="join w-full">
                <div className="join-item btn btn-primary btn-outline pointer-events-none hidden md:flex items-center">
                    <FaSearch className="text-lg" />
                </div>
                <div className="join-item w-full">
                    <input
                        type="text"
                        placeholder="Find your perfect course..."
                        className="input input-bordered w-full border-primary"
                        {...register("searchQuery")}
                    />
                </div>
                <button type="submit" className="btn btn-primary join-item">
                    Search
                </button>
            </div>
        </form>
    );
}

export default Search;
