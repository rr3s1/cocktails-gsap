import React from 'react'
import {featureLists, goodLists} from "../../constants/index.js";
import {useMediaQuery} from "react-responsive";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

const Art = () => {
    // Check if the current screen width is mobile
    const isMobile = useMediaQuery({ maxWidth: 767 });

    // GSAP hook for managing animations
    useGSAP(() => {
        // Adjust the animation start position based on device type
        const start = isMobile ? 'top 20%' : 'top top';

        // Create a GSAP timeline with a scroll trigger
        const maskTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#art', // The element that triggers the animation
                start, // The start position of the trigger
                end: 'bottom center', // The end position of the trigger
                scrub: 1.5, // Smoothly links animation progress to scroll
                pin: true // Pins the trigger element during the animation
            }
        })

        // Define the animation sequence
        maskTimeline
            // 1. Fade out the initial text and lists
            .to('.will-fade', { opacity: 0, stagger: 0.2, ease: 'power1.inOut', })
            // 2. Scale and expand the image mask to reveal the full image
            .to('.masked-img', { scale: 1.3, maskPosition: 'center', maskSize: '400%', duration: 1, ease: 'power1.inOut '})
            // 3. Fade in the final content at the end of the animation
            .to('#masked-content', { opacity: 1, duration: 1, ease: 'power1.inOut'})
    })


    return (
        <div id="art">
            <div className="container mx-auto h-full pt-20">
                <h2 className="will-fade">The ART</h2>

                <div className="content">
                    {/* First list of features */}
                    <ul className="space-y-4 will-fade">
                        {goodLists.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <img src="/images/check.png" alt="check" />
                                <p>{feature}</p>
                            </li>
                        ))}
                    </ul>

                    {/* The image that will be revealed by the mask */}
                    <div className="cocktail-img">
                        <img
                            src="/images/under-img.jpg"
                            alt="cocktail"
                            className="abs-center masked-img size-full object-contain"
                        />
                    </div>

                    {/* Second list of features */}
                    <ul className="space-y-4 will-fade">
                        {featureLists.map((feature, index) => (
                            <li key={index} className="flex items-center justify-start gap-2">
                                <img src="/images/check.png" alt="check" />
                                <p className="md:w-fit w-60">{feature}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Container for the content that appears at the end */}
                <div className="masked-container">
                    <h2 className="will-fade">Sip-Worthy Perfection</h2>
                    <div id="masked-content">
                        <h3>Made with Craft, Poured with Passion</h3>
                        <p>This isn’t just a drink. It’s a carefully crafted moment made just for you.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Art