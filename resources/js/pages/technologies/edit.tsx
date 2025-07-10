
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {Head, usePage, router} from '@inertiajs/react';
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
import {Post} from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Technologies Edit',
        href: '/dashboard/posts',
    },
];

export default function TechnologyEdit({currentTechnology}: {currentTechnology: Technology}) {

    const [name, SetName] = useState<string>(currentTechnology.title || null);
    const { errors } = usePage().props;

    // const { data, setData, post, processing, errors } = useForm<PostForm>({
    //     title: '',
    //     content: '',
    //     image: null,
    // });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('technologies.update', currentTechnology.id), {
            _method:'put',
            name,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts Edit" />
            <section className="max-w-md mx-auto p4">
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="name"
                                autoFocus
                                value={name}
                                onChange={(e) => SetName(e.target.value)}
                                placeholder="Name"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <Button type="submit" className="mt-4 w-full" tabIndex={4}>
                            Update
                        </Button>
                    </div>

                </form>
            </section>
        </AppLayout>
    );
}
