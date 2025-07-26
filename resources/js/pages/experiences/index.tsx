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
        title: 'Experiences',
        href: '/dashboard/experiences',
    },
];

interface Experience {
    id: number,
    name: string,
    description: string,
    icon: string,
}

interface Flash {
    success?: string;
    danger?: string;
}

export default function ExperienceIndex({experiences}: {experiences: Experience[]}) {

    const { flash } = usePage<{flash: Flash }>().props;

    useEffect(() => {
        if (flash.success){
            toast.success(flash.success);
        }
    }, [flash.success]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Experiences" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end">
                    <Link href={route('experiences.create')} className="text-indigo-500 underline">Create Experience</Link>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>A list of your experiences.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Job Title</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Period From</TableHead>
                                <TableHead>Period To</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Technologies</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {experiences.map((experience) => (
                                <TableRow key={experience.id}>
                                    <TableCell className="font-medium">{experience.id}</TableCell>
                                    <TableCell>{experience.job_title}</TableCell>
                                    <TableCell>{experience.company}</TableCell>
                                    <TableCell>{experience.period_from}</TableCell>
                                    <TableCell>{experience.period_to}</TableCell>
                                    <TableCell>{experience.description}</TableCell>
                                    <TableCell>
                                        {experience.technologies.length > 0 ? (
                                            <div className="flex flex-wrap gap-1">
                                                {experience.technologies.map((tech) => (
                                                    <span key={tech.id} className="inline-block bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded mr-1 text-xs">{tech.name}</span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-xs">No technologies</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link
                                            href={route('experiences.edit', { experience: experience.id })}
                                            className="text-indigo-500 hover:text-indigo-600"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={route('experiences.destroy', { experience: experience.id })}
                                            method="delete"
                                            className="ml-2 text-indigo-500 hover:text-indigo-600"
                                        >
                                            Delete
                                        </Link>
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
