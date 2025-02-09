import Footer from "../Components/Footer";
import Header from "../Components/Header";

function HomeLayout({ children }) {
    return (
        <div className="min-h-[90vh]">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default HomeLayout;
