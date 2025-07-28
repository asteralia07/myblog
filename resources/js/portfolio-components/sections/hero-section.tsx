"use client"

import {Badge} from "@/portfolio-components/ui/badge"
import {Button} from "@/portfolio-components/ui/button"
import {Card} from "@/portfolio-components/ui/card"
import {
    Send,
    Download,
    MapPin,
    Calendar,
    Sparkles,
    Zap,
    Target,
    Github,
    Linkedin,
    Mail,
    Palette,
    Server, Database, Globe, Smartphone, ClipboardList
} from "lucide-react"
import Image from '@/portfolio-components/ui/Image';
import {Link} from '@inertiajs/react';
import {useState, useEffect} from "react"
import {useInView} from "@/hooks/use-in-view"
import {Post, Social} from "@/types";

type Props = {
    profile: Post[];
    socials: Social[];
};

// map icon strings to actual components
const iconMap: Record<string, React.ElementType> = {
    Github,
    Linkedin,
    Mail,
};

export default function HeroSection({ profile, socials }: Props) {

    const [isVisible, setIsVisible] = useState(false)
    const {ref, inView} = useInView({threshold: 0.1})

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const getExperienceText = () => {
        const startDate = new Date("2022-06-01");
        const now = new Date();

        const monthsDiff =
            (now.getFullYear() - startDate.getFullYear()) * 12 +
            (now.getMonth() - startDate.getMonth());

        const years = Math.floor(monthsDiff / 12);
        return `${years}+ Years Experience`;
    };

    const badges = [
        {
            icon: (
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full mr-1 md:mr-2 animate-pulse"></div>
            ),
            text: "Available for Hire",
            gradient: "from-blue-500 to-cyan-600",
        },
        {
            icon: <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1 md:mr-2"/>,
            text: "Bay, Laguna, Philippines",
            gradient: "from-indigo-500 to-blue-600",
        },
        {
            icon: <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1 md:mr-2"/>,
            text: getExperienceText(),
            gradient: "from-cyan-500 to-blue-600",
        },
    ];

    return (
        <section id="profile" className="pt-20 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 relative" ref={ref}>
            <div className="container mx-auto max-w-7xl">
                {/* Hero Content - Mobile-First Responsive Layout */}
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-16 items-center mb-12 md:mb-20">
                    {/* Profile Picture - Mobile Centered, Desktop Left */}
                    <div
                        className={`order-1 lg:order-1 flex justify-center lg:justify-start transition-all duration-1000 ${
                            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                            }`}
                    >
                        <div className="relative inline-block group">
                            {/* Animated Glow Ring - Smaller on mobile */}
                            <div
                                className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500 animate-pulse"></div>

                            {/* Rotating Border - Smaller on mobile */}
                            <div
                                className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 rounded-full animate-spin-slow opacity-75"></div>

                            {/* Inner Border */}
                            <div
                                className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-r from-white to-blue-50 dark:from-slate-800 dark:to-blue-900 rounded-full"></div>

                            {/* Profile Image Container - Responsive sizing */}
                            <div
                                className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 md:border-4 border-white dark:border-slate-800 shadow-2xl group-hover:scale-105 transition-all duration-500">
                                <Image
                                    src={profile.image}
                                    alt={profile.title}
                                    width={320}
                                    height={320}
                                    className="w-full h-full object-cover object-top animate-fade-in"
                                />

                                {/* Hover Overlay */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                            </div>

                            {/* Animated Status Indicators - Responsive sizing */}
                            <div
                                className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 flex space-x-1 md:space-x-2">
                                <div
                                    className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full border-2 md:border-4 border-white dark:border-slate-800 flex items-center justify-center shadow-lg animate-bounce-slow">
                                    <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full animate-pulse"></div>
                                </div>
                                <div
                                    className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full border-2 md:border-4 border-white dark:border-slate-800 flex items-center justify-center shadow-lg animate-bounce-slow delay-200">
                                    <Zap className="w-3 h-3 md:w-4 md:h-4 text-white"/>
                                </div>
                            </div>

                            {/* Floating Icons - Responsive sizing and positioning */}
                            <div
                                className="absolute -top-3 -left-3 md:-top-6 md:-left-6 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg animate-float">
                                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white"/>
                            </div>
                            <div
                                className="absolute -top-2 -right-4 md:-top-4 md:-right-8 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-float delay-1000">
                                <Target className="w-3 h-3 md:w-4 md:h-4 text-white"/>
                            </div>
                        </div>
                    </div>

                    {/* Content - Mobile Centered, Desktop Left Aligned */}
                    <div
                        className={`order-2 lg:order-2 text-center lg:text-left transition-all duration-1000 delay-300 ${
                            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                            }`}
                    >
                        <div>
                            {/* Responsive Typography */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 bg-gradient-to-r from-blue-900 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight tracking-tight animate-text-shimmer">
                                {profile.title}
                            </h1>
                            <div
                                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-4 mb-4 md:mb-6">
                                <div
                                    className="h-px bg-gradient-to-r from-blue-500 to-transparent w-16 md:w-20 animate-expand hidden sm:block"></div>
                                <p className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in-up delay-500">
                                    Full-Stack Developer
                                </p>
                            </div>

                            {/* Animated Status Tags - Mobile Responsive */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-4 mb-6 md:mb-8">
                                {badges.map((badge, index) => (
                                    <Badge
                                        key={index}
                                        className={`bg-gradient-to-r ${badge.gradient} text-white px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium shadow-lg animate-fade-in-up hover:scale-105 transition-transform duration-300`}
                                        style={{animationDelay: `${600 + index * 100}ms`}}
                                    >
                                        {badge.icon}
                                        <span className="hidden sm:inline">{badge.text}</span>
                                        <span className="sm:hidden">{badge.text.split(" ")[0]}</span>
                                    </Badge>
                                ))}
                            </div>

                            {/* Description - Mobile Responsive */}
                            {/*<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6 md:mb-10 font-light animate-fade-in-up delay-700 px-4 lg:px-0">*/}
                                {/*Crafting digital experiences that blend{" "}*/}
                                {/*<span*/}
                                    {/*className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">*/}
                                  {/*innovation*/}
                                {/*</span>{" "}*/}
                                {/*with{" "}*/}
                                {/*<span*/}
                                    {/*className="font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">*/}
                                  {/*functionality*/}
                                {/*</span>*/}
                                {/*. Specialized in building scalable web applications.*/}
                            {/*</p>*/}
                            <p
                                className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6 md:mb-10 font-light animate-fade-in-up delay-700 px-4 lg:px-0"
                                dangerouslySetInnerHTML={{ __html: profile.content }}
                            />


                            {/* CTA Buttons - Mobile Responsive */}
                            <div
                                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 md:gap-6 animate-fade-in-up delay-900 px-4 lg:px-0">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold rounded-2xl animate-pulse-glow w-full sm:w-auto"
                                    asChild
                                >
                                    <Link href="#contact">
                                        <Send className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5"/>
                                        Let's Collaborate
                                        <Sparkles className="ml-2 md:ml-3 h-4 w-4 md:h-5 md:w-5"/>
                                    </Link>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-blue-200 dark:border-blue-700 hover:border-blue-500 dark:hover:border-blue-400 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-500 hover:scale-105 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl w-full sm:w-auto"
                                    asChild
                                >
                                    <Link href="#projects">
                                        <Download className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5"/>
                                        View Portfolio
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Links Section - Mobile Responsive */}
                <div
                    className={`mb-8 md:mb-16 transition-all duration-1000 delay-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent">
                        Connect With Me
                    </h3>
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto px-4">
                        {socials.map((social, index) => {
                            const Icon = iconMap[social.icons] || Palette;

                            return (
                                <Card
                                    key={index}
                                    className="p-4 md:p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-xl rounded-2xl md:rounded-3xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-blue-100 dark:border-blue-800 animate-fade-in-up"
                                    style={{ animationDelay: `${1200 + index * 200}ms` }}
                                >
                                    <Link href={social.url} className="block text-center group">
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg animate-bounce-gentle">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h4 className="font-bold text-lg md:text-xl text-slate-900 dark:text-slate-100 mb-1 md:mb-2">
                                            {social.socials}
                                        </h4>
                                        <p className="text-slate-600 dark:text-slate-400 mb-2 text-sm md:text-base truncate">
                                            {social.handle}
                                        </p>
                                        <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white animate-pulse-subtle text-xs md:text-sm">
                                            {social.description}
                                        </Badge>
                                    </Link>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
