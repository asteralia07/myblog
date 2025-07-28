import AppLayout from '@/layouts/app-layout';
import { type, BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { toast} from "sonner";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useEffect} from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '/dashboard/Projects',
    },
];

interface Project {
    id: number;
    title: string;
    content: string;
    image: string;

}

interface Flash {
    success?: string;
    danger?: string;
}

export default function ProjectIndex({projects}: {projects: Project[]}) {

    const { flash } = usePage<{flash: Flash }>().props;

    useEffect(() => {
        if (flash.success){
            toast.success(flash.success);
        }
    }, [flash.success]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end">
                    <Link href={route('projects.create')} className="text-indigo-500 underline">Create Project</Link>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>A list of your Projects.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>GitHub</TableHead>
                                <TableHead>Live</TableHead>
                                <TableHead>Users</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Thumbnail</TableHead>
                                <TableHead>Technology</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">{project.id}</TableCell>
                                    <TableCell>{project.title}</TableCell>
                                    <TableCell>{project.description}</TableCell>
                                    <TableCell>
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            GitHub
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            Live
                                        </a>
                                    </TableCell>
                                    <TableCell>{project.stats_users || '—'}</TableCell>
                                    <TableCell>{project.stats_rating?.toFixed(1) || '0.0'}</TableCell>
                                    <TableCell>
                                        <img src={project.image} alt={project.title} className="h-10 w-10 rounded-full object-cover" />
                                    </TableCell>
                                    <TableCell>
                                        {project.technologies.length > 0 ? (
                                            <div className="flex flex-wrap gap-1">
                                                {project.technologies.map((tech) => (
                                                    <span key={tech.id} className="inline-block bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded mr-1 text-xs">{tech.name}</span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-xs">No technologies</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('projects.edit', project.id)} className="text-indigo-500 hover:text-indigo-600"> Edit</Link>
                                        <Link href={route('projects.destroy', project.id)} method="delete" className="ml-2 text-indigo-500 hover:text-indigo-600">Delete</Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
