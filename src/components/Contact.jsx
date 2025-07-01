import { openingHours, socials } from '../../constants/index.js'
import { useGSAP } from '@gsap/react'
import { SplitText} from 'gsap/all';
import gsap from 'gsap';

const Contact = () => {
    // GSAP hook to manage animations for the contact section.
    useGSAP(() => {
        // Use the SplitText plugin to break the h2 title into individual words.
        const titleSplit = SplitText.create('#contact h2', { type: 'words' });

        // Create a GSAP timeline that triggers on scroll.
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact', // Element that triggers the animation.
                start: 'top center', // Animation starts when the top of the trigger hits the center of the viewport.
            },
            ease: "power1.inOut" // Default ease for animations in this timeline.
        })

        // Define the sequence of animations.
        timeline
            // 1. Animate the title words, staggering their appearance.
            .from(titleSplit.words, {
                opacity: 0, yPercent: 100, stagger: 0.02
            })
            // 2. Animate the contact details (h3 and p tags) with a similar staggered effect.
            .from('#contact h3, #contact p', {
                opacity: 0, yPercent: 100, stagger: 0.02
            })
            // 3. Animate the right leaf moving up.
            .to('#f-right-leaf', {
                y: '-50', duration: 1, ease: 'power1.inOut'
            })
            // 4. Animate the left leaf moving up at the same time as the right leaf.
            // The '<' parameter starts this animation at the beginning of the previous one.
            .to('#f-left-leaf', {
                y: '-50', duration: 1, ease: 'power1.inOut'
            }, '<')
    })

    return (
        <footer id="contact">
            {/* Decorative leaf images */}
            <img src="/images/footer-right-leaf.png" alt="leaf-right" id="f-right-leaf" />
            <img src="/images/footer-left-leaf.png" alt="leaf-left" id="f-left-leaf" />

            <div className="content">
                <h2>Where to Find Us</h2>

                {/* Bar location information */}
                <div>
                    <h3>Visit Our Bar</h3>
                    <p>456, Raq Blvd. #404, Los Angeles, CA 90210</p>
                </div>

                {/* Contact details */}
                <div>
                    <h3>Contact Us</h3>
                    <p>(555) 987-6543</p>
                    <p>hello@jsmcocktail.com</p>
                </div>

                {/* Opening hours, mapped from constants */}
                <div>
                    <h3>Open Every Day</h3>
                    {openingHours.map((time) => (
                        <p key={time.day}>
                            {time.day} : {time.time}
                        </p>
                    ))}
                </div>

                {/* Social media links, mapped from constants */}
                <div>
                    <h3>Socials</h3>
                    <div className="flex-center gap-5">
                        {socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name} // Accessibility best practice
                            >
                                <img src={social.icon} alt={`${social.name} icon`}/>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Contact