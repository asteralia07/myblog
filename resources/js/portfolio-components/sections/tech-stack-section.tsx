"use client"

import { Card } from "@/portfolio-components/ui/card"
import { Badge } from "@/portfolio-components/ui/badge"
import { Database, Server, Palette, Smartphone, Globe } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

export default function TechStackSection() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  const techStack = [
    {
      category: "Frontend",
      technologies: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "SASS"],
      icon: Palette,
      description: "Modern frontend frameworks and styling solutions",
    },
    {
      category: "Backend",
      technologies: ["Node.js", "Python", "Express.js", "FastAPI", "GraphQL"],
      icon: Server,
      description: "Robust server-side technologies and APIs",
    },
    {
      category: "Database",
      technologies: ["PostgreSQL", "MongoDB", "Redis", "Supabase"],
      icon: Database,
      description: "Scalable database solutions and data management",
    },
    {
      category: "Cloud & DevOps",
      technologies: ["AWS", "Docker", "Kubernetes", "Vercel", "GitHub Actions"],
      icon: Globe,
      description: "Cloud infrastructure and deployment automation",
    },
    {
      category: "Mobile & Tools",
      technologies: ["React Native", "Git", "VS Code", "Figma", "Jest"],
      icon: Smartphone,
      description: "Mobile development and essential development tools",
    },
  ]

  return (
    <section
      id="techstack"
      className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-slate-900/50 dark:to-blue-900/30"
      ref={ref}
    >
      <div className="container mx-auto max-w-7xl">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-black text-center mb-8 md:mb-16 bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Technology Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {techStack.map((stack, index) => (
            <Card
              key={index}
              className={`p-4 md:p-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl md:rounded-3xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-blue-100 dark:border-blue-800 group animate-fade-in-up ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-center mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 animate-bounce-gentle">
                  <stack.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="font-bold text-lg md:text-2xl text-slate-900 dark:text-slate-100 mb-1 md:mb-2 animate-text-focus-in">
                  {stack.category}
                </h3>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 leading-relaxed animate-fade-in delay-200 px-2">
                  {stack.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                {stack.technologies.map((tech, techIndex) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-xs md:text-sm font-medium border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 animate-fade-in px-2 py-1"
                    style={{ animationDelay: `${300 + techIndex * 100}ms` }}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
