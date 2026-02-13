'use client';

import { useState, useEffect } from 'react';
import {
    Plus,
    Trash2,
    GripVertical,
    Settings,
    Type,
    Mail,
    AlignLeft,
    CheckSquare
} from 'lucide-react';

export type FieldType = 'text' | 'email' | 'textarea' | 'select' | 'checkbox';

export interface FormField {
    id: string;
    type: FieldType;
    label: string;
    required: boolean;
    placeholder?: string;
    options?: string[]; // For select
}

interface FormBuilderProps {
    initialContent?: string;
    onChange: (jsonContent: string) => void;
}

const FIELD_TYPES: { type: FieldType; label: string; icon: any }[] = [
    { type: 'text', label: 'Single Line Text', icon: Type },
    { type: 'email', label: 'Email Address', icon: Mail },
    { type: 'textarea', label: 'Paragraph Text', icon: AlignLeft },
    { type: 'select', label: 'Dropdown Select', icon: ListCircle },
    { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
];

export default function FormBuilder({ initialContent, onChange }: FormBuilderProps) {
    const [fields, setFields] = useState<FormField[]>([]);

    useEffect(() => {
        if (initialContent) {
            try {
                const parsed = JSON.parse(initialContent);
                if (parsed.fields && Array.isArray(parsed.fields)) {
                    setFields(parsed.fields);
                }
            } catch (e) {
                console.error("Failed to parse initial content", e);
            }
        }
    }, [initialContent]);

    const updateFields = (newFields: FormField[]) => {
        setFields(newFields);
        onChange(JSON.stringify({ fields: newFields }, null, 2));
    };

    const addField = (type: FieldType) => {
        const newField: FormField = {
            id: `field_${Date.now()}`,
            type,
            label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
            required: false,
            placeholder: type !== 'checkbox' && type !== 'select' ? 'Enter placeholder...' : undefined,
            options: type === 'select' ? ['Option 1', 'Option 2'] : undefined
        };
        updateFields([...fields, newField]);
    };

    const removeField = (id: string) => {
        updateFields(fields.filter(f => f.id !== id));
    };

    const updateFieldProperty = (id: string, property: keyof FormField, value: any) => {
        updateFields(fields.map(f => f.id === id ? { ...f, [property]: value } : f));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Field Picker */}
            <div className="lg:col-span-1 space-y-4">
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-4">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-gray-400">
                        Add Fields
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        {FIELD_TYPES.map((ft) => (
                            <button
                                key={ft.type}
                                onClick={() => addField(ft.type)}
                                className="flex items-center gap-3 px-4 py-3 bg-[#0B0F1A] hover:bg-[#1F2937] border border-gray-800 text-gray-300 hover:text-white rounded-lg transition-all text-sm group"
                            >
                                <ft.icon className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
                                <span>{ft.label}</span>
                                <Plus className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Canvas / Editor */}
            <div className="lg:col-span-3 space-y-4">
                <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 min-h-[400px]">
                    <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                        Form Canvas
                        <span className="text-xs font-normal text-gray-500 ml-2">Drag and click to edit fields</span>
                    </h3>

                    {fields.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-800 rounded-xl text-gray-600">
                            <Plus className="w-8 h-8 mb-2 opacity-20" />
                            <p>Click a field type on the left to start building</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {fields.map((field) => (
                                <div
                                    key={field.id}
                                    className="bg-[#0B0F1A] border border-gray-800 rounded-xl overflow-hidden group hover:border-purple-500/50 transition-colors"
                                >
                                    {/* Field Header */}
                                    <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-900/30">
                                        <GripVertical className="w-4 h-4 text-gray-600 cursor-grab" />
                                        <span className="text-xs font-mono text-purple-400 uppercase">{field.type}</span>
                                        <span className="text-xs text-gray-500 ml-auto">ID: {field.id}</span>
                                        <button
                                            onClick={() => removeField(field.id)}
                                            className="p-1 hover:bg-gray-800 text-gray-500 hover:text-red-500 rounded transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Field Body */}
                                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Field Label</label>
                                                <input
                                                    type="text"
                                                    value={field.label}
                                                    onChange={(e) => updateFieldProperty(field.id, 'label', e.target.value)}
                                                    className="w-full bg-[#111827] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                                                />
                                            </div>
                                            {field.type !== 'checkbox' && (
                                                <div>
                                                    <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Placeholder</label>
                                                    <input
                                                        type="text"
                                                        value={field.placeholder || ''}
                                                        onChange={(e) => updateFieldProperty(field.id, 'placeholder', e.target.value)}
                                                        className="w-full bg-[#111827] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 py-2">
                                                <input
                                                    type="checkbox"
                                                    id={`req-${field.id}`}
                                                    checked={field.required}
                                                    onChange={(e) => updateFieldProperty(field.id, 'required', e.target.checked)}
                                                    className="rounded bg-gray-700 border-gray-600 accent-purple-600"
                                                />
                                                <label htmlFor={`req-${field.id}`} className="text-sm text-gray-300 cursor-pointer">Required Field</label>
                                            </div>

                                            {field.type === 'select' && (
                                                <div>
                                                    <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Options (comma separated)</label>
                                                    <textarea
                                                        rows={2}
                                                        value={field.options?.join(', ') || ''}
                                                        onChange={(e) => updateFieldProperty(field.id, 'options', e.target.value.split(',').map(s => s.trim()))}
                                                        className="w-full bg-[#111827] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Helper component for ListCircle icon since it's not and actually named ListCircle in newer lucide versions
function ListCircle(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
    );
}
