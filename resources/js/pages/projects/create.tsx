
import AppLayout from '@/layouts/app-layout';
import { type, BreadcrumbItem } from '@/types';
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandInput,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects Create',
        href: '/dashboard/Projects/create',
    },
];

type Props = {
    technologies: Technology[];
};

type AchievementForm = {
    title: string,
    description: string,
    github: string,
    live: string,
    featured: boolean,
    stats_users:string,
    stats_rating: number,
};

export default function AchievementCreate({ technologies }: Props) {

    const [imagePreview, SetImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm<AchievementForm>({
        title: '',
        description: '',
        github: '',
        live: '',
        featured: false,
        stats_users: '',
        stats_rating: 0,
        technologies: [] as number[],
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
        post(route('projects.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects Create" />
            <section className="max-w-md mx-auto p4">
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                autoFocus
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Title"
                            />
                            <InputError message={errors.title} />
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
                            <Label htmlFor="github">GitHub</Label>
                            <Input
                                id="github"
                                type="url"
                                value={data.github}
                                onChange={(e) => setData('github', e.target.value)}
                                placeholder="https://github.com/..."
                            />
                            <InputError message={errors.github} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="live">Live Demo</Label>
                            <Input
                                id="live"
                                type="url"
                                value={data.live}
                                onChange={(e) => setData('live', e.target.value)}
                                placeholder="https://your-live-site.com"
                            />
                            <InputError message={errors.live} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="stats_users">Users</Label>
                            <Input
                                id="stats_users"
                                type="text"
                                value={data.stats_users}
                                onChange={(e) => setData('stats_users', e.target.value)}
                                placeholder="e.g. 1000+"
                            />
                            <InputError message={errors.stats_users} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="stats_rating">Rating</Label>
                            <Input
                                id="stats_rating"
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                value={data.stats_rating ?? ''}
                                onChange={(e) =>
                                    setData(
                                        'stats_rating',
                                        e.target.value === '' ? 0 : parseFloat(e.target.value)
                                    )
                                }
                                placeholder="e.g. 4.5"
                            />
                            <InputError message={errors.stats_rating} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="featured">Featured</Label>
                            <input
                                id="featured"
                                type="checkbox"
                                checked={data.featured}
                                onChange={(e) => setData('featured', e.target.checked)}
                                className="h-4 w-4"
                            />
                            <InputError message={errors.featured} />
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
                        <div className="grid gap-2">
                            <Label className="text-sm font-medium">Technologies</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className="w-full justify-between"
                                    >
                                        {data.technologies.length > 0
                                            ? `${data.technologies.length} selected`
                                            : "Select technologies"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search technologies..." />
                                        <CommandGroup>
                                            {technologies.map((tech) => (
                                                <CommandItem
                                                    key={tech.id}
                                                    onSelect={() => {
                                                        const alreadySelected = data.technologies.includes(tech.id);
                                                        const updated = alreadySelected
                                                            ? data.technologies.filter((id) => id !== tech.id)
                                                            : [...data.technologies, tech.id];
                                                        setData('technologies', updated);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            data.technologies.includes(tech.id)
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {tech.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {technologies
                                    .filter((t) => data.technologies.includes(t.id))
                                    .map((t) => (
                                        <Badge key={t.id} variant="outline">
                                            {t.name}
                                        </Badge>
                                    ))}
                            </div>
                            <InputError message={errors.technologies} />
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
