"use client"

import { Card } from "@/portfolio-components/ui/card"
import { Badge } from "@/portfolio-components/ui/badge"
import { Button } from "@/portfolio-components/ui/button"
import { Github, ExternalLink, Star, Users } from "lucide-react"
import Image from '@/portfolio-components/ui/Image';
import { Link } from '@inertiajs/react';
import { useInView } from "@/hooks/use-in-view"
import { useState } from "react";

export default function ProjectsSection({ projects = [] }) {
    const { ref, inView } = useInView({ threshold: 0.1 })
    const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);

    return (
        <section id="projects" className="py-12 md:py-20 px-4 md:px-6" ref={ref}>
            <div className="container mx-auto max-w-7xl">
                <h2
                    className={`text-3xl sm:text-4xl md:text-5xl font-black text-center mb-8 md:mb-16 bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    Featured Projects
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {projects.map((project, index) => {
                        const isExpanded = expandedProjectIndex === index;
                        const shouldTruncate = project.description.length > 100;
                        const displayedText = isExpanded || !shouldTruncate
                            ? project.description
                            : project.description.slice(0, 100) + '...';

                        return (
                            <Card
                                key={index}
                                className={`overflow-hidden bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl md:rounded-3xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-blue-100 dark:border-blue-800 group animate-fade-in-up ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div className="relative overflow-hidden">
                                    <Image
                                        src={project.image || "/placeholder.svg"}
                                        alt={project.title}
                                        width={400}
                                        height={300}
                                        className="w-full h-40 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    {project.featured === 1 && (
                                        <div className="absolute top-2 right-2 md:top-4 md:right-4">
                                            <Badge className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold shadow-lg animate-pulse-subtle text-xs md:text-sm">
                                                <Star className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                                                Featured
                                            </Badge>
                                        </div>
                                    )}
                                    <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4">
                                        <div className="flex items-center justify-between text-white text-xs md:text-sm">
                                            <span className="flex items-center bg-black/20 backdrop-blur-sm rounded-full px-2 py-1 md:px-3 md:py-1 animate-fade-in">
                                                <Users className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                                                {project.stats_users}
                                            </span>
                                            <span className="flex items-center bg-black/20 backdrop-blur-sm rounded-full px-2 py-1 md:px-3 md:py-1 animate-fade-in delay-200">
                                                <Star className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                                                {project.stats_rating}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 md:p-6">
                                    <h3 className="font-bold text-base md:text-xl text-slate-900 dark:text-slate-100 mb-1 md:mb-2 group-hover:text-blue-600 transition-colors duration-300 animate-text-focus-in">
                                        {project.title}
                                    </h3>
                                    <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-3 md:mb-4 leading-relaxed animate-fade-in text-justify indent-8 delay-200">
                                        {displayedText}
                                        {shouldTruncate && (
                                            <button
                                                onClick={() => setExpandedProjectIndex(isExpanded ? null : index)}
                                                className="ml-1 text-blue-500 hover:underline focus:outline-none"
                                            >
                                                {isExpanded ? 'Read less' : 'Read more'}
                                            </button>
                                        )}
                                    </p>
                                    <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                            <Badge
                                                key={tech.id}
                                                variant="secondary"
                                                className="text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 animate-fade-in px-2 py-1"
                                                style={{ animationDelay: `${300 + techIndex * 100}ms` }}
                                            >
                                                {tech.name}
                                            </Badge>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <Badge
                                                variant="secondary"
                                                className="text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 animate-fade-in delay-600 px-2 py-1"
                                            >
                                                +{project.technologies.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex space-x-2 md:space-x-3">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1 text-xs md:text-sm bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-200 dark:border-blue-700 rounded-lg md:rounded-xl transition-all duration-300 hover:scale-105 animate-fade-in delay-700 py-2"
                                            asChild
                                        >
                                            {project.github ? (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-blue-600 hover:underline"
                                                >
                                                    <Github className="h-3 w-3 mr-1 md:mr-2" />
                                                    Code
                                                </a>
                                            ) : (
                                                <span className="inline-flex items-center text-gray-400 cursor-not-allowed">
                                                    <Github className="h-3 w-3 mr-1 md:mr-2" />
                                                    Not Available
                                                </span>
                                            )}
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="flex-1 text-xs md:text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transition-all duration-300 rounded-lg md:rounded-xl hover:scale-105 animate-fade-in delay-800 py-2"
                                            asChild
                                        >
                                            {project.live ? (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-green-600 hover:underline"
                                                >
                                                    <ExternalLink className="h-3 w-3 mr-1 md:mr-2" />
                                                    Live
                                                </a>
                                            ) : (
                                                <span className="inline-flex items-center text-gray-400 cursor-not-allowed">
                                                    <ExternalLink className="h-3 w-3 mr-1 md:mr-2" />
                                                    Not Available
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
