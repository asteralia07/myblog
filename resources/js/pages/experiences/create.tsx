import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
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
import { Check, ChevronsUpDown, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

type Technology = {
    id: number;
    name: string;
};

type ExperienceForm = {
    job_title: string;
    company: string;
    period_from: string;  // YYYY-MM-DD
    period_to: string;
    description: string;
    technologies: number[];
};

type Props = {
    technologies: Technology[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Experience Create',
        href: '/dashboard/experience/create',
    },
];

export default function ExperienceCreate({ technologies }: Props) {
    const { data, setData, post, processing, errors } = useForm<ExperienceForm>({
        job_title: '',
        company: '',
        period_from: '',
        period_to: '',
        description: '',
        technologies: [],
    });

    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);
    const dateFrom = data.period_from ? new Date(data.period_from) : undefined;
    const dateTo = data.period_to ? new Date(data.period_to) : undefined;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('experiences.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Experience Create" />
            <section className="max-w-md mx-auto p4">
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        {/* Job Title */}
                        <div className="grid gap-2">
                            <Label htmlFor="job_title">Job Title</Label>
                            <Input
                                id="job_title"
                                value={data.job_title}
                                onChange={(e) => setData('job_title', e.target.value)}
                                placeholder="Job Title"
                            />
                            <InputError message={errors.job_title} />
                        </div>

                        {/* Company */}
                        <div className="grid gap-2">
                            <Label htmlFor="company">Company</Label>
                            <Input
                                id="company"
                                value={data.company}
                                onChange={(e) => setData('company', e.target.value)}
                                placeholder="Company"
                            />
                            <InputError message={errors.company} />
                        </div>

                        {/* Period From */}
                        <div className="grid gap-2">
                            <Label htmlFor="period_from">Period From</Label>
                            <Popover open={openFrom} onOpenChange={setOpenFrom}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {data.period_from
                                            ? format(new Date(data.period_from), "yyyy-MM-dd")
                                            : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={dateFrom}
                                        onSelect={(date) => {
                                            if (date) {
                                                setData('period_from', format(date, 'yyyy-MM-dd'));
                                                setOpenFrom(false);
                                            }
                                        }}
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
                            <Popover open={openTo} onOpenChange={setOpenTo}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {data.period_to
                                            ? format(new Date(data.period_to), "yyyy-MM-dd")
                                            : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={dateTo}
                                        onSelect={(date) => {
                                            if (date) {
                                                setData('period_to', format(date, 'yyyy-MM-dd'));
                                                setOpenTo(false);
                                            }
                                        }}
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
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} />
                        </div>

                        {/* Technologies */}
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

                        {/* Submit */}
                        <Button type="submit" className="mt-4 w-full" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            Store
                        </Button>
                    </div>
                </form>
            </section>
        </AppLayout>
    );
}
