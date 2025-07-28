
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
        title: 'categories Edit',
        href: '/dashboard/categories',
    },
];

export default function CategoryEdit({currentCategory, currentTechnology}: {currentCategory: Category, currentTechnology: Technology}) {

    const [name, SetName] = useState<string>(currentCategory.name || null);
    const [description, SetDescription] = useState<string>(currentCategory.description || null);
    const [icon, SetIcon] = useState<string>(currentCategory.icon || null);

    // Initialize selected technologies from currentCategory
    const [selectedTechnologies, setSelectedTechnologies] = useState<number[]>(
        currentCategory.technologies?.map((t) => t.id) || []
    );

    const [open, setOpen] = useState(false);

    // Toggle selected technology
    const toggleTechnology = (id: number) => {
        setSelectedTechnologies((prev) =>
            prev.includes(id) ? prev.filter((techId) => techId !== id) : [...prev, id]
        );
    };

    const { errors } = usePage().props;


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('categories.update', currentCategory.id), {
            _method:'put',
            name,
            description,
            icon,
            technologies: selectedTechnologies,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories Edit" />
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
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                type="description"
                                autoFocus
                                value={description}
                                onChange={(e) => SetDescription( e.target.value)}
                                placeholder="Description"
                            />
                            <InputError message={errors.description} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="icon">Icon</Label>
                            <Input
                                id="icon"
                                type="icon"
                                autoFocus
                                value={icon}
                                onChange={(e) => SetIcon( e.target.value)}
                                placeholder="Icon"
                            />
                            <InputError message={errors.name} />
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
