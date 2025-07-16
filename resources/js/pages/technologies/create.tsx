import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {Head, Link, useForm} from '@inertiajs/react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {LoaderCircle} from "lucide-react";
import AuthLayout from "@/layouts/auth-layout";
import {FormEventHandler, useState} from "react";
import { Textarea } from "@/components/ui/textarea"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Technologies Create',
        href: '/dashboard/technologies/create',
    },
];

type TechnologyForm = {
    name: string;
};

export default function TechnologyCreate() {

    const { data, setData, post, processing, errors } = useForm<TechnologyForm>({
        name: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('technologies.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Technologies Create" />
            <section className="max-w-md mx-auto p4">
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="name"
                                autoFocus
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Name"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Store
                        </Button>
                    </div>

                </form>
            </section>
        </AppLayout>
    );
}
