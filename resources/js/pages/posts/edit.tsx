
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
        title: 'Posts Edit',
        href: '/dashboard/posts',
    },
];

export default function PostEdit({currentPost}: {currentPost: Post}) {

    const [title, SetTitle] = useState<string>(currentPost.title || null);
    const [content, SetContent] = useState<string>(currentPost.content || null);
    const [image, SetImage] = useState<File | null>(null);
    const [imagePreview, SetImagePreview] = useState<string | null>(null);
    const { errors } = usePage().props;

    // const { data, setData, post, processing, errors } = useForm<PostForm>({
    //     title: '',
    //     content: '',
    //     image: null,
    // });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            SetImage(file);
            SetImagePreview(URL.createObjectURL(file));
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('posts.update', currentPost.id), {
            _method:'put',
            title,
            content,
            image,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts Edit" />
            <section className="max-w-md mx-auto p4">
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="title"
                                autoFocus
                                value={title}
                                onChange={(e) => SetTitle(e.target.value)}
                                placeholder="Title"
                            />
                            <InputError message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                value={content}
                                onChange={(e) => SetContent(e.target.value)}
                            />
                            <InputError message={errors.content} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Image</Label>
                            <Input
                                id="image"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <div className="flex gap-2">
                                <img src={currentPost.image} alt={currentPost.title} className={"h-10 w-10 rounded-full object-cover" + (imagePreview ? ' opacity-30' : '')} />
                                { imagePreview && <img src={imagePreview} alt="Preview" className="h-10 w-10 rounded-full object-cover"/>}
                            </div>
                            <InputError message={errors.image} />
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
