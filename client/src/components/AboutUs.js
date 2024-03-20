import React, { Fragment } from "react";
import '../styles/AboutUs.css'

const AboutUs = () => {
    return (
        <Fragment>
            <div className="mainBlock">
                <div id="Title">
                    <h1 id="TitleText">About Us</h1>
                </div>

                <div id="aboutText">
                    <div className="subBlock">
                        <img className="image-right" src="./assets/industrial-worker-checking-pressure-natural-gas-pipeline-inside-power-plant-refinery_308072-2675.png" alt="Industrial Worker 1"/>
                        <h2 id="SubTitleText">Our Mission</h2>
                        <div>
                            <p>Inherited from the expertise of the oil industry, the CEO and founder of CoogsEnergy Enterprise, Marcus Chambers, envisioned a more efficient way of fuel consumption that would save thousands of dollars for people and companies around the world. Founded in 1990, CoogsEnergy Enterprise was guided by dedication, integrity, and determination in a relentless pursuit of excellence. Not only has CoogsEnergy Enterprise redefined the oil industry, but it has also inspired a broader movement toward a brighter and more sustainable future.</p>
                        </div>
                    </div>
                    <div className="subBlock">
                        <img className="image-left" src="./assets/full-list-of-oil-refineries-in-louisiana.jpg" alt="Oil refineries"/>
                        <h2 id="SubTitleText">Our Story</h2>
                        <div>
                            <p>At CoogsEnergy Enterprise, our mission is not only to operate within the oil industry but to fundamentally transform it to the satisfaction of our customers. Recognizing two issues that the world faces such as global warming and inflation, our revolutionary technologies and algorithms allow customers to keep more money in their pockets while being environmentally friendly. We are committed to pioneering and providing superior fuel services for all!</p>
                        </div>
                    </div>
                    <div className="subBlock">
                        <img className="image-right" src="./assets/happy_oil_worker.jpg" alt="Industrial Worker 2"/>
                        <h2 id="SubTitleText">Our Services</h2>
                        <div>
                            <p>Here at CoogsEnergy Enterprise, we offer a wide variety of services crafted to meet the demand for the much-needed oil which ranges from exploration, production, and processing. With our cutting-edge technologies, highly-experienced team, and strength; we have taken the first step in empowering our clients with trust, faith, and confidence. With the outstanding leadership at CoogsEnergy Enterprise, the future is astoundingly bright and prosperous for many generations to come!</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default AboutUs;
