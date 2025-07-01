'use client'; // Directive for Next.js to treat this as a Client Component

import { allCocktails } from '../../constants/index.js'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';

const Menu = () => {
    // A ref that can be attached to a DOM element.
    const contentRef = useRef();
    // State to track the currently displayed cocktail.
    const [currentIndex, setCurrentIndex] = useState(0);

    // useGSAP hook to manage animations.
    // The dependency array [currentIndex] ensures animations re-run whenever the index changes.
    useGSAP(() => {
        // Animate the title with a simple fade-in.
        gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 });

        // Animate the cocktail image to slide in from the left.
        gsap.fromTo('.cocktail img', { opacity: 0, xPercent: -100 }, {
            xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut'
        });

        // Animate the details heading to slide up from the bottom.
        gsap.fromTo('.details h2', { yPercent: 100, opacity: 0 }, {
            yPercent: 0, opacity: 1, ease: 'power1.inOut'
        });

        // Animate the details paragraph to slide up from the bottom.
        gsap.fromTo('.details p', { yPercent: 100, opacity: 0 }, {
            yPercent: 0, opacity: 1, ease: 'power1.inOut'
        });
    }, [currentIndex]);

    // Total number of cocktails available.
    const totalCocktails = allCocktails.length;

    // Function to update the current index, with wraparound logic.
    const goToSlide = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails;
        setCurrentIndex(newIndex);
    }

    // Helper function to get cocktail data based on an offset from the current index.
    const getCocktailAt = (indexOffset) => {
        return allCocktails[(currentIndex + indexOffset + totalCocktails) % totalCocktails]
    }

    // Define the current, previous, and next cocktails for display.
    const currentCocktail = getCocktailAt(0);
    const prevCocktail = getCocktailAt(-1);
    const nextCocktail = getCocktailAt(1);

    return (
        <section id="menu" aria-labelledby="menu-heading">
            <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
            <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />

            <h2 id="menu-heading" className="sr-only">
                Cocktail Menu
            </h2>

            {/* Navigation tabs for direct selection */}
            <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
                {allCocktails.map((cocktail, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <button key={cocktail.id} className={`
                            ${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}
                        `} onClick={() => goToSlide(index)}
                        >
                            {cocktail.name}
                        </button>
                    )
                })}
            </nav>

            <div className="content">
                {/* Arrow buttons for sequential navigation */}
                <div className="arrows">
                    <button className="text-left" onClick={() => goToSlide(currentIndex - 1)}>
                        <span>{prevCocktail.name}</span>
                        <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true" />
                    </button>

                    <button className="text-right" onClick={() => goToSlide(currentIndex + 1)}>
                        <span>{nextCocktail.name}</span>
                        <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
                    </button>
                </div>

                {/* Display area for the current cocktail image */}
                <div className="cocktail">
                    <img src={currentCocktail.image} className="object-contain" alt={currentCocktail.name}/>
                </div>

                {/* Display area for the current cocktail recipe details */}
                <div className="recipe">
                    <div ref={contentRef} className="info">
                        <p>Recipe for:</p>
                        <p id="title">{currentCocktail.name}</p>
                    </div>

                    <div className="details">
                        <h2>{currentCocktail.title}</h2>
                        <p>{currentCocktail.description}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Menu