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
        title: 'Socials Create',
        href: '/dashboard/socials/create',
    },
];

type SocialForm = {
    name: string;
};

export default function SocialCreate() {

    const { data, setData, post, processing, errors } = useForm<SocialForm>({
        socials: '',
        description: '',
        url: '',
        icons: '',
        socials: '',
        handle: ''

    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('socials.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Socials Create" />
            <section className="max-w-md mx-auto p4">
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="socials">Socials</Label>
                            <Input
                                id="socials"
                                type="socials"
                                autoFocus
                                value={data.socials}
                                onChange={(e) => setData('socials', e.target.value)}
                                placeholder="Socials"
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                type="text"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Description"
                            />
                            <InputError message={errors.description} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="url">URL</Label>
                            <Input
                                id="url"
                                type="url"
                                value={data.url}
                                onChange={(e) => setData('url', e.target.value)}
                                placeholder="https://example.com"
                            />
                            <InputError message={errors.url} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="icons">Icons</Label>
                            <Input
                                id="icons"
                                type="text"
                                value={data.icons}
                                onChange={(e) => setData('icons', e.target.value)}
                                placeholder="e.g., fab fa-twitter"
                            />
                            <InputError message={errors.icons} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="handle">Handle</Label>
                            <Input
                                id="handle"
                                type="text"
                                value={data.handle}
                                onChange={(e) => setData('handle', e.target.value)}
                                placeholder="@yourhandle"
                            />
                            <InputError message={errors.handle} />
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
