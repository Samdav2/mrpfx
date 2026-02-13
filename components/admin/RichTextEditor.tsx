import { useState, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { MediaPickerModal } from './MediaPickerModal';
import { getMediaUrl } from '@/lib/utils';

// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(
    async () => {
        const { default: RQ, Quill } = await import('react-quill-new');
        const { default: ImageResize } = await import('quill-image-resize-module-react');

        if (Quill) {
            (window as any).Quill = Quill;
            Quill.register('modules/imageResize', ImageResize);
        }

        const { forwardRef } = await import('react');
        return forwardRef(function QuillEditor({ forwardedRef, ...props }: any, ref: any) {
            return <RQ ref={forwardedRef || ref} {...props} />;
        });
    },
    { ssr: false }
);

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
}

export default function RichTextEditor({ value, onChange, placeholder, label }: RichTextEditorProps) {
    const quillRef = useRef<any>(null);
    const [showMediaModal, setShowMediaModal] = useState(false);

    const imageHandler = () => {
        setShowMediaModal(true);
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'align': [] }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        },
        imageResize: {
            parchment: {
                tagName: 'img'
            },
            modules: ['DisplaySize', 'Resize', 'Toolbar']
        }
    }), []);

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'indent',
        'align',
        'link', 'image'
    ];

    const handleMediaSelect = (media: any) => {
        const url = getMediaUrl(media.url || media.source_url);
        if (url && quillRef.current) {
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            if (range) {
                quill.insertEmbed(range.index, 'image', url);
                quill.setSelection(range.index + 1);
            } else {
                quill.insertEmbed(quill.getLength(), 'image', url);
            }
        }
        setShowMediaModal(false);
    };

    return (
        <div className="space-y-2 rich-text-editor-wrapper">
            {label && <label className="text-sm font-medium text-gray-400">{label}</label>}
            <div className="text-gray-900 bg-white rounded-lg overflow-hidden border border-gray-700">
                <ReactQuill
                    forwardedRef={quillRef}
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    modules={modules}
                    formats={formats}
                    placeholder={placeholder}
                    className="h-64 mb-12"
                />
            </div>

            <MediaPickerModal
                isOpen={showMediaModal}
                onClose={() => setShowMediaModal(false)}
                onSelect={handleMediaSelect}
                title="Insert Image from Media Library"
            />

            <style jsx global>{`
                .rich-text-editor-wrapper .ql-toolbar {
                    background-color: #f3f4f6;
                    border-bottom: 1px solid #e5e7eb;
                }
                .rich-text-editor-wrapper .ql-container {
                    font-size: 16px;
                }
            `}</style>
        </div>
    );
}
