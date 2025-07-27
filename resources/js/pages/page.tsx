"use client"

import {useState, useEffect} from "react"
import HeroSection from "@/portfolio-components/sections/hero-section"
import ExperienceSection from "@/portfolio-components/sections/experience-section"
import AchievementsSection from "@/portfolio-components/sections/achievements-section"
import TechStackSection from "@/portfolio-components/sections/tech-stack-section"
import ProjectsSection from "@/portfolio-components/sections/projects-section"
import ContactSection from "@/portfolio-components/sections/contact-section"
import Navigation from "@/portfolio-components/navigation"
import Footer from "@/portfolio-components/footer"
import ChatWidget from "@/portfolio-components/chat-widget"
import {Head} from '@inertiajs/react'

type Props = {
    profile: {
        title: string,
        content: string,
        image: string,
        section,
        // Add other fields from your Post model if needed
    };

    categories: {
        name: string,
        description: string,
        icon: string,
        technologies: string[],
    }[];

    experiences: {
        job_title: string;
        description: string,
        company: string,
        period_from: Date,
        period_to: Date | null,
        description: string,
    }[];

    achievements: {
        title: string,
        description: string,
        year: string,
        image: string,
        url: string,
        technologies: string[],
    }[];
};

export default function Porfolio(props: Props) {
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({x: e.clientX, y: e.clientY})
        }

        // Only add mouse tracking on desktop
        if (window.innerWidth > 768) {
            window.addEventListener("mousemove", handleMouseMove)
        }

        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 relative overflow-hidden">
            <Head title="Portfolio"/>
            {/* Animated Background - Optimized for mobile */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div
                    className="absolute top-1/2 left-1/2 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-r from-indigo-400/5 to-blue-600/5 rounded-full blur-2xl animate-pulse delay-500"></div>

                {/* Interactive Grid Pattern - Desktop only */}
                <div
                    className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] transition-opacity duration-300 hidden md:block"
                    style={{
                        backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
                        backgroundSize: "50px 50px",
                    }}
                ></div>

                {/* Floating Elements - Reduced on mobile */}
                <div
                    className="absolute top-20 left-20 w-1 h-1 md:w-2 md:h-2 bg-blue-500 rounded-full animate-ping"></div>
                <div
                    className="absolute top-40 right-32 w-0.5 h-0.5 md:w-1 md:h-1 bg-indigo-500 rounded-full animate-pulse delay-500"></div>
                <div
                    className="absolute bottom-32 left-1/3 w-1 h-1 md:w-1.5 md:h-1.5 bg-cyan-500 rounded-full animate-bounce delay-1000"></div>
            </div>

            <Navigation/>
            <HeroSection profile={props.profile}/>
            <ExperienceSection experiences={props.experiences}/>
            <ProjectsSection/>
            <TechStackSection categories={props.categories}/>
            <AchievementsSection achievements={props.achievements}/>
            <ContactSection/>
            <Footer/>

            {/* Chat Widget */}
            <ChatWidget/>
        </div>
    )
}
