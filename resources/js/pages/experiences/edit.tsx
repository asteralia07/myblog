import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Check, ChevronsUpDown, CalendarIcon } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
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
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Experiences Edit',
        href: '/dashboard/experiences',
    },
];

export default function ExperienceEdit({ currentExperience, currentTechnology }: { currentExperience: Experience, currentTechnology: Technology[] }) {
    const { errors } = usePage().props;

    const [job_title, setJobTitle] = useState(currentExperience.job_title);
    const [company, setCompany] = useState(currentExperience.company);
    const [description, setDescription] = useState(currentExperience.description);
    const [periodFrom, setPeriodFrom] = useState<Date | undefined>(currentExperience.period_from ? new Date(currentExperience.period_from) : undefined);
    const [periodTo, setPeriodTo] = useState<Date | undefined>(currentExperience.period_to ? new Date(currentExperience.period_to) : undefined);
    const [selectedTechnologies, setSelectedTechnologies] = useState<number[]>(currentExperience.technologies?.map((t) => t.id) || []);
    const [openTechPopover, setOpenTechPopover] = useState(false);

    const toggleTechnology = (id: number) => {
        setSelectedTechnologies((prev) =>
            prev.includes(id) ? prev.filter((techId) => techId !== id) : [...prev, id]
        );
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('experiences.update', currentExperience.id), {
            _method: 'put',
            job_title,
            company,
            description,
            period_from: periodFrom ? format(periodFrom, 'yyyy-MM-dd') : '',
            period_to: periodTo ? format(periodTo, 'yyyy-MM-dd') : '',
            technologies: selectedTechnologies,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Experience Edit" />
            <section className="max-w-md mx-auto p4">
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        {/* Job Title */}
                        <div className="grid gap-2">
                            <Label htmlFor="job_title">Job Title</Label>
                            <Input
                                id="job_title"
                                value={job_title}
                                onChange={(e) => setJobTitle(e.target.value)}
                                placeholder="Job Title"
                            />
                            <InputError message={errors.job_title} />
                        </div>

                        {/* Company */}
                        <div className="grid gap-2">
                            <Label htmlFor="company">Company</Label>
                            <Input
                                id="company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                placeholder="Company"
                            />
                            <InputError message={errors.company} />
                        </div>

                        {/* Period From */}
                        <div className="grid gap-2">
                            <Label htmlFor="period_from">Period From</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {periodFrom ? format(periodFrom, "yyyy-MM-dd") : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={periodFrom}
                                        onSelect={setPeriodFrom}
                                        captionLayout="dropdown"
                                        fromYear={1990}
                                        toYear={new Date().getFullYear()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <InputError message={errors.period_from} />
                        </div>

                        {/* Period To */}
                        <div className="grid gap-2">
                            <Label htmlFor="period_to">Period To</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {periodTo ? format(periodTo, "yyyy-MM-dd") : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={periodTo}
                                        onSelect={setPeriodTo}
                                        captionLayout="dropdown"
                                        fromYear={1990}
                                        toYear={new Date().getFullYear()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <InputError message={errors.period_to} />
                        </div>

                        {/* Description */}
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <InputError message={errors.description} />
                        </div>

                        {/* Technologies */}
                        <div className="grid gap-2">
                            <Label>Technologies</Label>
                            <Popover open={openTechPopover} onOpenChange={setOpenTechPopover}>
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
                                                    onSelect={() => toggleTechnology(tech.id)}
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

                        {/* Submit */}
                        <Button type="submit" className="mt-4 w-full">
                            Update
                        </Button>
                    </div>
                </form>
            </section>
        </AppLayout>
    );
}
