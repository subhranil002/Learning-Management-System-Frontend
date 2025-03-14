import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import HomePageImage from "../Assets/Images/homePageMainImage.jpeg";
import HomeLayout from "../Layouts/HomeLayout";

function HomePage() {
    return (
        <HomeLayout>
            <section className="min-h-[90vh] flex items-center bg-gradient-to-r from-base-100 via-base-200 to-base-100 py-12 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div className="order-2 lg:order-1 text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                                Discover Your Next
                                <span className="bg-gradient-to-r from-warning to-success bg-clip-text text-transparent block">
                                    Learning Adventure
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto lg:mx-0">
                                Join 500k+ developers and tech professionals
                                mastering in-demand technologies through
                                expert-led courses
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    to="/courses"
                                    className="btn btn-warning btn-lg rounded-full hover:scale-105 transition-transform w-full sm:w-auto"
                                >
                                    Explore Courses
                                    <FaArrowCircleRight className="ml-2 text-lg" />
                                </Link>
                                <Link
                                    to="/contact"
                                    className="btn btn-outline btn-lg rounded-full hover:btn-warning hover:border-transparent w-full sm:w-auto"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative group mt-8 lg:mt-0">
                            <div className="animate-float mx-auto max-w-lg lg:max-w-full">
                                <img
                                    src={HomePageImage}
                                    alt="Online Learning"
                                    className="rounded-lg shadow-2xl transform transition-all duration-500 
                                        group-hover:scale-102 border-4 border-white/20"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}

export default HomePage;
