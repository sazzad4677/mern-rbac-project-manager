import React from 'react';

interface PageHeaderProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
}

export default function PageHeader({ title, description, children }: PageHeaderProps) {
    return (
        <div className="mb-8 flex items-end justify-between gap-4">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {title}
                </h2>
                {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
            {children && (
                <div className="flex items-center gap-2">
                    {children}
                </div>
            )}
        </div>
    );
}
