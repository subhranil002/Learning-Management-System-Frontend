import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

function Footer() {
    return (
        <>
            <footer className="footer md:footer-horizontal bg-base-100 border-t border-base-300 items-center p-4 text-base md:px-8">
                <aside className="grid-flow-col items-center">
                    <p>
                        Copyright © {new Date().getFullYear()} - All rights
                        reserved
                    </p>
                </aside>
                <nav className="navbar-center lg:mx-auto">
                    Made with ❤️ by{" "}
                    <a
                        className="link link-accent link-hover"
                        href="https://github.com/subhranil002"
                        target="_blank"
                    >
                        Subhranil Chakraborty
                    </a>
                </nav>
                <nav className="grid-flow-col gap-6 md:place-self-center md:justify-self-end text-xl">
                    <BsFacebook className="text-[#1877F2]" />
                    <BsInstagram className="text-[#F56040]" />
                    <BsTwitter className="text-[#1DA1F2]" />
                </nav>
            </footer>
        </>
    );
}

export default Footer;
