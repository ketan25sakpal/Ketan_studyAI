import React from 'react'
import Image from 'next/image'
import { Plus } from 'lucide-react'

const Hero = () => {
    return (
        <section className="library-hero-card">
            <div className="library-hero-content">
                {/* Left Part */}
                <div className="library-hero-text">
                    <h1 className="library-hero-title">Your Library</h1>
                    <p className="library-hero-description">
                        Convert your books into interactive AI conversations. 
                        Listen, learn, and discuss your favorite reads.
                    </p>
                    <button className="library-cta-primary">
                        <Plus className="w-5 h-5 mr-1" />
                        Add new book
                    </button>
                </div>

                {/* Center Part */}
                <div className="library-hero-illustration-desktop">
                    <Image 
                        src="/assets/hero-illustration.png" 
                        alt="Vintage books and globe" 
                        width={300} 
                        height={200}
                        className="object-contain"
                    />
                </div>

                {/* Right Part */}
                <div className="library-steps-card min-w-[240px] shadow-soft hidden lg:block">
                    <ul className="space-y-4">
                        <li className="library-step-item">
                            <div className="library-step-number text-[#212a3b] font-serif">1</div>
                            <div className="flex flex-col">
                                <span className="library-step-title">Upload PDF</span>
                                <span className="library-step-description font-sans">Add your book file</span>
                            </div>
                        </li>
                        <li className="library-step-item">
                            <div className="library-step-number text-[#212a3b] font-serif">2</div>
                            <div className="flex flex-col">
                                <span className="library-step-title">AI Processing</span>
                                <span className="library-step-description font-sans">We analyze the content</span>
                            </div>
                        </li>
                        <li className="library-step-item">
                            <div className="library-step-number text-[#212a3b] font-serif">3</div>
                            <div className="flex flex-col">
                                <span className="library-step-title">Voice Chat</span>
                                <span className="library-step-description font-sans">Discuss with AI</span>
                            </div>
                        </li>
                    </ul>
                </div>
                
                {/* Mobile Illustration (as per existing CSS classes) */}
                <div className="library-hero-illustration">
                    <Image 
                        src="/assets/hero-illustration.png" 
                        alt="Vintage books and globe" 
                        width={200} 
                        height={130}
                        className="object-contain"
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero
