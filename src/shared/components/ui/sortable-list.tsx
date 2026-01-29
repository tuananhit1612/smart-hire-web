"use client";

import * as React from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortableListProps<T extends { id: string }> {
    items: T[];
    onReorder: (items: T[]) => void;
    renderItem: (item: T, index: number, dragHandle: React.ReactNode) => React.ReactNode;
    className?: string;
}

export function SortableList<T extends { id: string }>({
    items,
    onReorder,
    renderItem,
    className,
}: SortableListProps<T>) {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            onReorder(arrayMove(items, oldIndex, newIndex));
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className={cn("space-y-4", className)}>
                    {items.map((item, index) => (
                        <SortableItem key={item.id} item={item}>
                            {(dragHandle) => renderItem(item, index, dragHandle)}
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}

interface SortableItemProps<T extends { id: string }> {
    item: T;
    children: (dragHandle: React.ReactNode) => React.ReactNode;
}

function SortableItem<T extends { id: string }>({
    item,
    children,
}: SortableItemProps<T>) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : undefined,
    };

    const dragHandle = (
        <button
            type="button"
            className={cn(
                "touch-none cursor-grab active:cursor-grabbing p-2 rounded-lg",
                "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
                "hover:bg-gray-100 dark:hover:bg-white/10 transition-colors",
                isDragging && "cursor-grabbing"
            )}
            {...attributes}
            {...listeners}
        >
            <GripVertical className="w-4 h-4" />
        </button>
    );

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "relative transition-shadow",
                isDragging && "shadow-2xl opacity-90"
            )}
        >
            {children(dragHandle)}
        </div>
    );
}
