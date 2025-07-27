"use client";

import { useState } from "react";
import { Card } from "@/portfolio-components/ui/card";
import { Badge } from "@/portfolio-components/ui/badge";
import {
    Trophy,
    Users,
    Award,
    GraduationCap,
    Star,
    Palette,
    Server,
    Database,
    Globe,
    Smartphone,
    ClipboardList,
} from "lucide-react";
import Image from "@/portfolio-components/ui/Image";
import { useInView } from "@/hooks/use-in-view";

type Achievement = {
    icon: keyof typeof iconMap;
    title: string;
    description: string;
    year: string;
    image: string;
    stats?: string;
    technologies: { id: string | number; name: string }[];
};

type Props = {
    achievements: Achievement[];
};

const iconMap: Record<string, React.ElementType> = {
    Trophy,
    Users,
    Award,
    GraduationCap,
    Star,
    Palette,
    Server,
    Database,
    Globe,
    Smartphone,
    ClipboardList,
};

export default function AchievementsSection({ achievements }: Props) {
    const { ref, inView } = useInView({ threshold: 0.1 });
    const [showAll, setShowAll] = useState(false);

    const visibleAchievements = showAll
        ? achievements
        : achievements.slice(0, 8);

    return (
        <section
            id="achievements"
            className="py-12 md:py-20 px-4 md:px-6"
            ref={ref}
        >
            <div className="container mx-auto max-w-7xl">
                <h2
                    className={`text-3xl sm:text-4xl md:text-5xl font-black text-center mb-8 md:mb-16 bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent transition-all duration-1000 ${
                        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    Achievements & Recognition
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                    {visibleAchievements.map((achievement, index) => {
                        const Icon = iconMap[achievement.icon] || Palette;

                        return (
                            <Card
                                key={index}
                                className={`overflow-hidden bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl md:rounded-3xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-blue-100 dark:border-blue-800 group animate-fade-in-up ${
                                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div className="relative overflow-hidden">
                                    <Image
                                        src={achievement.image || "/placeholder.svg"}
                                        alt={achievement.title}
                                        width={300}
                                        height={200}
                                        className="w-full h-32 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/60 to-transparent group-hover:from-blue-600/80 transition-all duration-500"></div>
                                    <div className="absolute top-2 right-2 md:top-4 md:right-4">
                                        <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg animate-bounce-gentle">
                                            <Icon className="h-4 w-4 md:h-6 md:w-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4">
                                        <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold animate-pulse-subtle text-xs md:text-sm">
                                            {achievement.year}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="p-3 md:p-6">
                                    <a href={achievement.url} target="_blank" rel="noopener noreferrer">
                                        <h3 className="font-bold text-base md:text-xl text-slate-900 dark:text-slate-100 mb-1 md:mb-2 animate-text-focus-in hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                                            {achievement.title}
                                        </h3>
                                    </a>
                                    <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-3 md:mb-4 leading-relaxed animate-fade-in delay-200">
                                        {achievement.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                                        {achievement.technologies.map((tech, techIndex) => (
                                            <Badge
                                                key={tech.id}
                                                variant="outline"
                                                className="text-xs md:text-sm font-medium border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 animate-fade-in px-2 py-1"
                                                style={{ animationDelay: `${300 + techIndex * 100}ms` }}
                                            >
                                                {tech.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {achievements.length > 8 && (
                    <div className="mt-10 text-center">
                        <button
                            onClick={() => setShowAll((prev) => !prev)}
                            className="px-6 py-2 text-sm md:text-base font-semibold rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            {showAll ? "Show Less" : "See More"}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
