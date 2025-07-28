
import AppLayout from '@/layouts/app-layout';
import { type, BreadcrumbItem } from '@/types';
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
        title: 'Socials Edit',
        href: '/dashboard/posts',
    },
];

export default function SocialEdit({currentSocial}: {currentSocial: social}) {

    const [socials, setSocials] = useState<string>(currentSocial?.socials || '');
    const [description, setDescription] = useState<string>(currentSocial?.description || '');
    const [url, setUrl] = useState<string>(currentSocial?.url || '');
    const [icons, setIcons] = useState<string>(currentSocial?.icons || '');
    const [handle, setHandle] = useState<string>(currentSocial?.handle || '');
    const { errors } = usePage().props;
    

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('socials.update', currentSocial.id), {
            _method:'put',
            socials,
            description,
            url,
            icons,
            handle,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Socials Edit" />
            <section className="max-w-md mx-auto p4">
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="socials">Socials</Label>
                            <Input
                                id="socials"
                                type="text"
                                autoFocus
                                value={socials}
                                onChange={(e) => setSocials(e.target.value)}
                                placeholder="Social name"
                            />
                            <InputError message={errors.socials} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                            />
                            <InputError message={errors.description} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="url">URL</Label>
                            <Input
                                id="url"
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com"
                            />
                            <InputError message={errors.url} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="icons">Icons</Label>
                            <Input
                                id="icons"
                                type="text"
                                value={icons}
                                onChange={(e) => setIcons(e.target.value)}
                                placeholder="e.g., fab fa-facebook"
                            />
                            <InputError message={errors.icons} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="handle">Handle</Label>
                            <Input
                                id="handle"
                                type="text"
                                value={handle}
                                onChange={(e) => setHandle(e.target.value)}
                                placeholder="@yourhandle"
                            />
                            <InputError message={errors.handle} />
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
