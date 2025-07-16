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
        title: 'Technologies',
        href: '/dashboard/technologies',
    },
];

interface Technology {
    id: number;
    name: string;

}

interface Flash {
    success?: string;
    danger?: string;
}

export default function TechnologyIndex({technologies}: {technologies: Technology[]}) {

    const { flash } = usePage<{flash: Flash }>().props;

    useEffect(() => {
        if (flash.success){
            toast.success(flash.success);
        }
    }, [flash.success]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Technologies" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end">
                    <Link href={route('technologies.create')} className="text-indigo-500 underline">Create Technology</Link>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>A list of your technologies.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {technologies.map((technology) => (
                                <TableRow key={technology.id}>
                                    <TableCell className="font-medium">{technology.id}</TableCell>
                                    <TableCell>{technology.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('technologies.edit',{ technology: technology.id })} className="text-indigo-500 hover:text-indigo-600"> Edit</Link>
                                        <Link href={route('technologies.destroy', { technology: technology.id })} method="delete" className="ml-2 text-indigo-500 hover:text-indigo-600">Delete</Link>
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
