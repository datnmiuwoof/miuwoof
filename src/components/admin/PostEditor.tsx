"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Button } from "@mantine/core";
import { IconBold, IconItalic, IconUnderline, IconLink, IconPhoto, IconH1, IconH2 } from "@tabler/icons-react";
import { useEffect } from "react";

interface PostEditorProps {
    value?: string;
    onChange: (html: string) => void;
}

export default function PostEditor({ value = "", onChange }: PostEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Placeholder.configure({ placeholder: "Bắt đầu viết nội dung ở đây..." }),
            Link.configure({ openOnClick: false }),
            Image,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) return <div>Đang tải editor...</div>;

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b">
                <Button size="xs" variant={editor.isActive("bold") ? "filled" : "subtle"} onClick={() => editor.chain().focus().toggleBold().run()}>
                    <IconBold size={16} />
                </Button>
                <Button size="xs" variant={editor.isActive("italic") ? "filled" : "subtle"} onClick={() => editor.chain().focus().toggleItalic().run()}>
                    <IconItalic size={16} />
                </Button>
                <Button size="xs" variant={editor.isActive("underline") ? "filled" : "subtle"} onClick={() => editor.chain().focus().toggleUnderline().run()}>
                    <IconUnderline size={16} />
                </Button>
                <Button size="xs" variant={editor.isActive("heading", { level: 1 }) ? "filled" : "subtle"} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                    <IconH1 size={16} />
                </Button>
                <Button size="xs" variant={editor.isActive("heading", { level: 2 }) ? "filled" : "subtle"} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                    <IconH2 size={16} />
                </Button>
                <Button size="xs" variant="subtle" onClick={() => {
                    const url = window.prompt("Nhập URL link:");
                    if (url) editor.chain().focus().setLink({ href: url }).run();
                }}>
                    <IconLink size={16} />
                </Button>
                <Button size="xs" variant="subtle" onClick={() => {
                    const url = window.prompt("Nhập URL ảnh:");
                    if (url) editor.chain().focus().setImage({ src: url }).run();
                }}>
                    <IconPhoto size={16} />
                </Button>
            </div>
            <EditorContent editor={editor} className="p-4 min-h-96 bg-white prose max-w-none" />
        </div>
    );
}