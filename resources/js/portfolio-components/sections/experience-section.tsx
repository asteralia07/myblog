"use client";

import { Card } from "@/portfolio-components/ui/card";
import { Badge } from "@/portfolio-components/ui/badge";
import { Briefcase } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { useState } from 'react';

type Props = {
    experiences: Experience[];
};

export default function ExperienceSection({ experiences }: Props) {
    const { ref, inView } = useInView({ threshold: 0.1 });

    const formatDate = (date: string | Date) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
        });
    };

    // One expanded flag per experience (all false initially)
    const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});

    const toggleExpanded = (index: number) => {
        setExpandedCards(prev => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <section
            id="experience"
            className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-slate-900/50 dark:to-blue-900/30"
            ref={ref}
        >
            <div className="container mx-auto max-w-7xl">
                <h2
                    className={`text-3xl sm:text-4xl md:text-5xl font-black text-center mb-8 md:mb-16 bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent transition-all duration-1000 ${
                        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    Professional Experience
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {experiences.map((exp, index) => {
                        const isExpanded = !!expandedCards[index];
                        const maxLength = 150;
                        const shouldTruncate = exp.description.length > maxLength;
                        const visibleText = isExpanded
                            ? exp.description
                            : exp.description.slice(0, maxLength) + (shouldTruncate ? '...' : '');

                        return (
                            <Card
                                key={index}
                                className={`p-4 md:p-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl md:rounded-3xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-blue-100 dark:border-blue-800 animate-fade-in-up ${
                                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div className="relative">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6 shadow-lg animate-bounce-gentle">
                                        <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-lg md:text-xl text-slate-900 dark:text-slate-100 mb-1 md:mb-2 animate-text-focus-in">
                                        {exp.job_title}
                                    </h3>
                                    <p className="text-blue-600 font-semibold mb-1 md:mb-2 animate-fade-in delay-200 text-sm md:text-base">
                                        {exp.company}
                                    </p>
                                    <p className="text-xs md:text-sm text-slate-500 mb-3 md:mb-4 font-medium animate-fade-in delay-300">
                                        <span>
                                            {exp.period_from === exp.period_to
                                                ? `${formatDate(exp.period_from)} - Present`
                                                : `${formatDate(exp.period_from)} - ${formatDate(exp.period_to)}`}
                                        </span>
                                    </p>
                                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-4 leading-relaxed animate-fade-in delay-400 text-justify indent-8">
                                        {visibleText}
                                    </p>
                                    {shouldTruncate && (
                                        <button
                                            onClick={() => toggleExpanded(index)}
                                            className="text-blue-600 hover:underline text-sm font-medium transition mb-4"
                                        >
                                            {isExpanded ? 'Show less' : 'Read more'}
                                        </button>
                                    )}
                                    <div className="flex flex-wrap gap-1 md:gap-2">
                                        {exp.technologies.map((tech, techIndex) => (
                                            <Badge
                                                key={tech.id}
                                                variant="secondary"
                                                className="text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-300 hover:scale-105 animate-fade-in px-2 py-1"
                                                style={{ animationDelay: `${500 + techIndex * 100}ms` }}
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
            </div>
        </section>
    );
}
