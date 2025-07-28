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
        title: 'socials',
        href: '/dashboard/socials',
    },
];

interface social {
    id: number;
    name: string;

}

interface Flash {
    success?: string;
    danger?: string;
}

export default function socialIndex({socials}: {socials: Social[]}) {

    const { flash } = usePage<{flash: Flash }>().props;

    useEffect(() => {
        if (flash.success){
            toast.success(flash.success);
        }
    }, [flash.success]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="socials" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end">
                    <Link href={route('socials.create')} className="text-indigo-500 underline">Create social</Link>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>A list of your socials.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Socials</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>URL</TableHead>
                                <TableHead>Icons</TableHead>
                                <TableHead>Handle</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {socials.map((social) => (
                                <TableRow key={social.id}>
                                    <TableCell className="font-medium">{social.id}</TableCell>
                                    <TableCell>{social.socials}</TableCell>
                                    <TableCell>{social.description}</TableCell>
                                    <TableCell>{social.url}</TableCell>
                                    <TableCell>{social.icons}</TableCell>
                                    <TableCell>{social.handle}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('socials.edit',{ social: social.id })} className="text-indigo-500 hover:text-indigo-600"> Edit</Link>
                                        <Link href={route('socials.destroy', { social: social.id })} method="delete" className="ml-2 text-indigo-500 hover:text-indigo-600">Delete</Link>
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
