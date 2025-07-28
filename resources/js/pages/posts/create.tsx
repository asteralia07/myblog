
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
        title: 'Posts Create',
        href: '/dashboard/posts/create',
    },
];

type PostForm = {
    title: string;
    content: string;
    image: File | null;
};

export default function PostCreate() {

    const [imagePreview, SetImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm<PostForm>({
        title: '',
        content: '',
        image: null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setData('image', file);
            SetImagePreview(URL.createObjectURL(file));
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('posts.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts Create" />
            <section className="max-w-md mx-auto p4">
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="title"
                                autoFocus
                                value={data.email}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Title"
                            />
                            <InputError message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                            />
                            <InputError message={errors.content} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="section">Section</Label>
                            <select
                                id="section"
                                value={data.section}
                                onChange={(e) => setData('section', e.target.value)}
                                className="border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Section</option>
                                <option value="hero">Hero</option>
                                <option value="others">Others</option>
                            </select>
                            <InputError message={errors.section} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Image</Label>
                            <Input
                                id="image"
                                type="file"
                                onChange={handleFileChange}
                            />
                            { imagePreview && <img src={imagePreview} alt="Preview" className="h-10 w-10 rounded-full object-cover"/>}
                            <InputError message={errors.image} />
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
