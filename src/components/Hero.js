import '../styles/Hero.css';

const Hero = () => {
    return (
        <header>
            <div id="hero" class="text-center position-fixed">
                <img src="./assets/background-cover.png" class="hero-img d-block img-fluid w-100" loading="lazy" alt="background-cover"/>
            </div>
        </header>
 );
}


export default Hero;