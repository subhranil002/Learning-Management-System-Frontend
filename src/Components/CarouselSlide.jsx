import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

function CarouselSlide({
    image,
    title,
    description,
    slideNumber,
    totalSlides,
}) {
    return (
        <div
            id={`slide${slideNumber}`}
            className="carousel-item relative w-full md:min-h-auto"
        >
            <div className="flex flex-col items-center justify-center gap-4 px-4 md:px-[15%] py-8 md:py-12">
                <img
                    src={image}
                    className="w-32 md:w-40 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 border-4 border-gray-300"
                />
                <div className="space-y-4 text-center">
                    <p className="text-lg md:text-xl leading-relaxed max-w-2xl">
                        {description}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-error">
                        {title}
                    </h3>
                </div>
                <div className="hidden md:flex absolute justify-between transform -translate-y-1/2 left-2 right-2 md:left-5 md:right-5 top-1/2">
                    <a
                        href={`#slide${
                            slideNumber == 1 ? totalSlides : slideNumber - 1
                        }`}
                        className="btn btn-circle btn-sm md:btn-md bg-gray-100 hover:bg-gray-200 border-2 border-gray-300"
                    >
                        <FaArrowAltCircleLeft className="text-xl md:text-2xl text-gray-700" />
                    </a>
                    <a
                        href={`#slide${(slideNumber % totalSlides) + 1}`}
                        className="btn btn-circle btn-sm md:btn-md bg-gray-100 hover:bg-gray-200 border-2 border-gray-300"
                    >
                        <FaArrowAltCircleRight className="text-xl md:text-2xl text-gray-700" />
                    </a>
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    {[...Array(totalSlides)].map((_, index) => (
                        <a
                            key={index}
                            href={`#slide${index + 1}`}
                            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                                slideNumber === index + 1
                                    ? "bg-error"
                                    : "bg-warning/80"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CarouselSlide;