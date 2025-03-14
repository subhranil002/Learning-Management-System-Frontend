import {
    FaChartLine,
    FaGraduationCap,
    FaHandshake,
    FaUsers,
} from "react-icons/fa";

import aboutMainImage from "../Assets/Images/aboutMainImage.jpeg";
import CarouselSlide from "../Components/CarouselSlide";
import FeatureItem from "../Components/FeatureItem";
import { celebrities } from "../Constants/CelebrityData";
import HomeLayout from "../Layouts/HomeLayout";

function AboutUs() {
    return (
        <HomeLayout>
            <section className="min-h-[90vh] flex items-center bg-gradient-to-r from-base-100 via-base-200 to-base-100 py-12 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative group order-1 lg:order-2">
                            <div className="animate-float mx-auto max-w-lg lg:max-w-full">
                                <img
                                    alt="Modern learning environment"
                                    src={aboutMainImage}
                                    className="rounded-2xl shadow-2xl transform transition-all duration-500 
                                        group-hover:scale-102 border-4 border-white/20"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-warning/10 to-success/10 rounded-2xl blur-2xl -z-10 animate-pulse hidden lg:block"></div>
                        </div>
                        <div className="order-2 lg:order-1 space-y-8">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                                <span className="bg-gradient-to-r from-warning to-success bg-clip-text text-transparent block text-center md:text-left">
                                    Affordable Quality Education
                                </span>
                            </h1>
                            <div className="space-y-6">
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FeatureItem
                                        icon={<FaGraduationCap />}
                                        text="Affordable Pricing Models"
                                    />
                                    <FeatureItem
                                        icon={<FaUsers />}
                                        text="Quality Certified Educators"
                                    />
                                    <FeatureItem
                                        icon={<FaChartLine />}
                                        text="Interactive Learning Tools"
                                    />
                                    <FeatureItem
                                        icon={<FaHandshake />}
                                        text="Community Collaboration"
                                    />
                                </ul>
                                <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-2xl">
                                    Join our growing community of 500k+ learners
                                    and 1k+ expert instructors shaping the
                                    future of tech education.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col items-center w-full">
                        <h3 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-warning to-success bg-clip-text text-transparent">
                            Voices of Great Minds
                        </h3>
                        <div className="carousel w-[90vw] md:w-[70vw] lg:w-[50vw] my-5">
                            {celebrities &&
                                celebrities.map((celebrity) => (
                                    <CarouselSlide
                                        {...celebrity}
                                        key={celebrity.slideNumber}
                                        totalSlides={celebrities.length}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}

export default AboutUs;
