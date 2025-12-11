"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

export default function AddPostPage() {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    // FIX CHÍNH: Set immediatelyRender: false để tránh SSR error
    const editor = useEditor({
        extensions: [
            StarterKit,  // Bold, italic, list, heading...
            Link.configure({ openOnClick: false }),
            Image,
        ],
        content: "<p>Viết nội dung ở đây...</p>",
        immediatelyRender: false,  // ← DÒNG NÀY FIX LỖI HYDRATION MISMATCH
        onUpdate: ({ editor }) => {
            // Lấy content HTML để submit
            const content = editor.getHTML();
            // Có thể lưu vào state nếu cần: setContent(content);
        },
    });

    // CHECK: Không render nếu editor chưa init (tránh SSR)
    if (!editor) {
        return <div>Đang tải editor...</div>;
    }

    const handleSave = async () => {
        if (!title.trim()) return alert("Nhập tiêu đề đi bro");
        const content = editor.getHTML();
        if (!content || content === "<p></p>") return alert("Viết nội dung đi chứ");

        setLoading(true);
        try {
            const res = await fetch("http://localhost:4000/api/posts", {  // Backend Node của mày
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content }),
            });

            if (res.ok) {
                alert("Tạo bài thành công!");
                setTitle("");
                editor.commands.setContent("<p>Viết nội dung ở đây...</p>");
            } else {
                alert("Lỗi server");
            }
        } catch (err) {
            alert("Không kết nối được backend");
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem 1rem" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Tạo bài viết mới</h1>

            <input
                type="text"
                placeholder="Tiêu đề bài viết..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                    width: "100%",
                    padding: "16px",
                    fontSize: "1.8rem",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    marginBottom: "24px",
                }}
            />

            <div style={{ marginBottom: "80px", border: "1px solid #ddd", borderRadius: "8px" }}>
                {/* Toolbar đơn giản */}
                <div style={{ padding: "8px", background: "#f5f5f5", borderBottom: "1px solid #ddd" }}>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        style={{ marginRight: "8px", padding: "4px 8px" }}
                    >
                        Bold
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        style={{ marginRight: "8px", padding: "4px 8px" }}
                    >
                        Italic
                    </button>
                    <button
                        onClick={() => {
                            const url = prompt("URL link:");
                            if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
                        }}
                        style={{ marginRight: "8px", padding: "4px 8px" }}
                    >
                        Link
                    </button>
                    <button
                        onClick={() => {
                            const url = prompt("URL ảnh:");
                            if (url) editor.chain().focus().setImage({ src: url }).run();
                        }}
                        style={{ padding: "4px 8px" }}
                    >
                        Image
                    </button>
                </div>

                {/* Nội dung editor */}
                <EditorContent editor={editor} style={{ minHeight: "500px", padding: "16px" }} />
            </div>

            <button
                onClick={handleSave}
                disabled={loading}
                style={{
                    padding: "14px 40px",
                    fontSize: "1.2rem",
                    backgroundColor: loading ? "#999" : "#0070f3",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: loading ? "not-allowed" : "pointer",
                }}
            >
                {loading ? "Đang lưu..." : "Tạo bài viết"}
            </button>
        </div>
    );
}