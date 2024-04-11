import '../styles/Hero.css';

const Hero = () => {
    return (
        <header>
            <div id="hero" className="text-center position-fixed">
                <img src="./assets/background-cover.png" className="hero-img d-block img-fluid w-100" loading="lazy" alt="background-cover"/>
            </div>
        </header>
 );
}


export default Hero;