import React from 'react'
import '../css/Hero.css'
import hand_icon from './Assets/hand_icon.png' /* PROMJENIT */
import arrow_icon from './Assets/arrow.png'
import hero_image from './Assets/hero_image.png'

const Hero = () => {
    return (
        <div className='hero'>
            <div className="hero-left"> {/* PROMJENIT */}
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="hero-hand-icon">  {/* PROMJENIT */}
                        
                        <p>new</p>
                        <img src={hand_icon} alt="" />
                    
                    </div>
                    <p>collection</p>
                    <p>for everyone</p>
                    
                </div>

                <div className="hero-latest-btn"> {/* PROMJENIT */}
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="" /> {/* PROMJENIT */}
                </div>

            </div>

            <div className="hero-right"> {/* PROMJENIT */}
                <img src={hero_image} alt="sss" />


            </div>
        </div>
    )
}

/* promjenit imena divova, promjenit slike, promjenit text u nesto sto se tice nase teme 
sliku treba izbacit (hand icon), i promjenit raspored ovog texta da ne bude isto (boja etc)           */


export default Hero
