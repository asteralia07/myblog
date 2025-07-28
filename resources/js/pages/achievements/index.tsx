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
        title: 'Achievements',
        href: '/dashboard/Achievements',
    },
];

interface Achievement {
    id: number;
    title: string;
    content: string;
    image: string;

}

interface Flash {
    success?: string;
    danger?: string;
}

export default function AchievementIndex({achievements}: {achievements: Achievement[]}) {

    const { flash } = usePage<{flash: Flash }>().props;

    useEffect(() => {
        if (flash.success){
            toast.success(flash.success);
        }
    }, [flash.success]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Achievements" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end">
                    <Link href={route('achievements.create')} className="text-indigo-500 underline">Create Achievement</Link>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>A list of your Achievements.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Year</TableHead>
                                <TableHead>URL</TableHead>
                                <TableHead>Icon</TableHead>
                                <TableHead>Thumbnail</TableHead>
                                <TableHead>Technologies</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {achievements.map((achievement) => (
                                <TableRow key={achievement.id}>
                                    <TableCell className="font-medium">{achievement.id}</TableCell>
                                    <TableCell>{achievement.title}</TableCell>
                                    <TableCell>{achievement.description}</TableCell>
                                    <TableCell>{achievement.year}</TableCell>
                                    <TableCell>{achievement.url}</TableCell>
                                    <TableCell>{achievement.icon}</TableCell>
                                    <TableCell>
                                        <img src={achievement.image} alt={achievement.title} className="h-10 w-10 rounded-full object-cover" />
                                    </TableCell>
                                    <TableCell>
                                        {achievement.technologies.length > 0 ? (
                                            <div className="flex flex-wrap gap-1">
                                                {achievement.technologies.map((tech) => (
                                                    <span key={tech.id} className="inline-block bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded mr-1 text-xs">{tech.name}</span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-xs">No technologies</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('achievements.edit', achievement.id)} className="text-indigo-500 hover:text-indigo-600"> Edit</Link>
                                        <Link href={route('achievements.destroy', achievement.id)} method="delete" className="ml-2 text-indigo-500 hover:text-indigo-600">Delete</Link>
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
