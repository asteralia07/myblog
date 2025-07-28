import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Post {
    id: number;
    title: string;
    content: string;
    image: string;
}

export interface Technology {
    id: number;
    name: string;
}

export interface Category {
    id: number,
    name: string,
    description: string,
    icon: string,
}

export interface Achievement {
    id: number,
    title: string,
    icon: string,
    description: string,
    year: string,
    image: string,
}

export interface Project {
    id: number,
    title: string,
    description: string,
    github: string,
    live: string,
    featured: boolean,
    stats_users:string,
    stats_ratings: number,
    image: string,
}

export interface Social {
    id: number,
    socials: string,
    description: string,
    url: string,
    icons: string,
    socials: string,
    handle: string
}


