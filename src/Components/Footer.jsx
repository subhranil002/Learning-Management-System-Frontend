import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

function Footer() {
    return (
        <>
            <footer className="footer md:footer-horizontal bg-base-100 border-t border-base-300 items-center p-4 text-base">
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
                    <BsFacebook />
                    <BsInstagram />
                    <BsLinkedin />
                    <BsTwitter />
                </nav>
            </footer>
        </>
    );
}

export default Footer;
