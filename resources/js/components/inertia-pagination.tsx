import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import React from 'react'; 

interface LinksType {
    url: string;
    label: string;
    active: boolean;
}

interface PostType {
    data: any[];
    links: LinksType[];
    to: number | null;
    from: number | null;
    total: number;
}

export default function InertiaPagination({ posts }: { posts?: PostType }) {
    if (!posts || !posts.links || posts.links.length === 0) {
        return null; // Or return a placeholder, or an empty div
    }
    const { from, to, total, links } = posts;
    return (
        <div className="flex items-center justify-between px-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
                {/* Safely display pagination info */}
                Showing {from} to {to} of {total} results
            </div>
            <div className="space-x-2">
                {links.map((link, index) => { // Added index for the key, safer if labels aren't unique
                    // --- Start: Modify the label here ---
                    let displayLabel = link.label;

                    // Simple replacement for standard Laravel pagination labels
                    if (displayLabel.includes('&laquo;')) {
                         displayLabel = displayLabel.replace('&laquo;', '').trim();
                    }
                    if (displayLabel.includes('&raquo;')) {
                         displayLabel = displayLabel.replace('&raquo;', '').trim();
                    }

                    // More robust regex replacement if needed, but includes() is often clearer
                    // let cleanedLabel = link.label.replace(/&laquo;\s*/, '').replace(/\s*&raquo;/, '');
                    // --- End: Modify the label here ---

                    return (
                        <Button
                            key={link.url || index} // Use URL as key if available, fallback to index
                            asChild
                            size="sm"
                            variant={link.active ? 'default' : 'outline'}
                            disabled={!link.url} // Disable if there's no URL
                        >
                             {/* Use the modified displayLabel */}
                            <Link href={link.url || '#'}>{displayLabel}</Link>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}