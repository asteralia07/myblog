
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
import {Achievement} from "@/types";

import {Post} from "@/types";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Achievements Edit',
        href: '/dashboard/achievements',
    },
];

export default function AchievementEdit({currentAchievement, currentTechnology}: {currentAchievement: achievement, currentTechnology: technology}) {

    const [title, SetTitle] = useState<string>(currentAchievement.title || null);
    const [description, SetDescription] = useState<string>(currentAchievement.description || null);
    const [year, SetYear] = useState<string>(currentAchievement.year || null);
    const [icon, SetIcon] = useState<string>(currentAchievement.icon || null);
    const [url, SetURL] = useState<string>(currentAchievement.url || null);
    const [image, SetImage] = useState<File | null>(null);
    const [imagePreview, SetImagePreview] = useState<string | null>(null);
    const { errors } = usePage().props;

    // Initialize selected technologies from currentCategory
    const [selectedTechnologies, setSelectedTechnologies] = useState<number[]>(
        currentAchievement.technologies?.map((t) => t.id) || []
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            SetImage(file);
            SetImagePreview(URL.createObjectURL(file));
        }
    };

    const [open, setOpen] = useState(false);

    // Toggle selected technology
    const toggleTechnology = (id: number) => {
        setSelectedTechnologies((prev) =>
            prev.includes(id) ? prev.filter((techId) => techId !== id) : [...prev, id]
        );
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('achievements.update', currentAchievement.id), {
            _method:'put',
            title,
            description,
            icon,
            url,
            image,
            year,
            technologies: selectedTechnologies,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Achievements Edit" />
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
                            <Label htmlFor="content">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => SetDescription(e.target.value)}
                            />
                            <InputError message={errors.description} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="year">Year</Label>
                            <Input
                                id="year"
                                type="year"
                                autoFocus
                                value={year}
                                onChange={(e) => SetYear(e.target.value)}
                                placeholder="year"
                            />
                            <InputError message={errors.year} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="icon">Icon</Label>
                            <Input
                                id="icon"
                                type="icon"
                                autoFocus
                                value={icon}
                                onChange={(e) => SetIcon(e.target.value)}
                                placeholder="icon"
                            />
                            <InputError message={errors.icon} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="icon">URL</Label>
                            <Input
                                id="url"
                                type="url"
                                autoFocus
                                value={url}
                                onChange={(e) => SetURL(e.target.value)}
                                placeholder="url"
                            />
                            <InputError message={errors.url} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Image</Label>
                            <Input
                                id="image"
                                type="file"
                                // value={image}
                                onChange={handleFileChange}
                            />
                            <div className="flex gap-2">
                                <img src={currentAchievement.image} alt={currentAchievement.title} className={"h-10 w-10 rounded-full object-cover" + (imagePreview ? ' opacity-30' : '')} />
                                { imagePreview && <img src={imagePreview} alt="Preview" className="h-10 w-10 rounded-full object-cover"/>}
                            </div>
                            <InputError message={errors.image} />
                        </div>

                        {/* Technologies multi-select */}
                        <div className="grid gap-2">
                            <Label>Technologies</Label>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className="w-full justify-between"
                                    >
                                        {selectedTechnologies.length > 0
                                            ? `${selectedTechnologies.length} selected`
                                            : "Select technologies"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search technologies..." />
                                        <CommandGroup>
                                            {currentTechnology.map((tech) => (
                                                <CommandItem
                                                    key={tech.id}
                                                    onSelect={() => {
                                                        toggleTechnology(tech.id);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            selectedTechnologies.includes(tech.id)
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

                            {/* Show selected as badges */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {currentTechnology
                                    .filter((t) => selectedTechnologies.includes(t.id))
                                    .map((t) => (
                                        <Badge key={t.id} variant="outline">
                                            {t.name}
                                        </Badge>
                                    ))}
                            </div>

                            <InputError message={errors.technologies} />
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
