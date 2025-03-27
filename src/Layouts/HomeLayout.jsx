import { useEffect } from "react";
import { useLocation } from "react-router";

import Footer from "../Components/Footer";
import Header from "../Components/Header";

function HomeLayout({ children }) {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="min-h-[90vh]">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default HomeLayout;
