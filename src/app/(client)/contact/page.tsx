// app/lien-he/page.tsx
"use client";

import Link from 'next/link';
import { useState } from "react";
import { IoChevronForward, IoLocationOutline, IoMailOutline, IoCallOutline, IoTimeOutline } from "react-icons/io5";

export default function Contact() {
    const BRAND_COLOR = "#4d3b32";

    // State quản lý form
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    // Cập nhật giá trị input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Hàm gửi form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (loading) return; // Tránh gửi nhiều lần

        // Validate cơ bản phía client (tùy chọn thêm chi tiết hơn nếu cần)
        if (!form.name || !form.email || !form.message) {
            alert("Vui lòng điền đầy đủ họ tên, email và nội dung!");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name.trim(),
                    email: form.email.trim(),
                    phone: form.phone.trim(),
                    message: form.message.trim(),
                }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Gửi thành công! Chúng tôi sẽ liên hệ sớm với bạn ❤️");
                // Reset form
                setForm({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                });
            } else {
                alert(data.message || "Gửi thất bại, vui lòng thử lại!");
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi kết nối, vui lòng thử lại sau ít phút.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-content !mx-auto !px-4 sm:!px-6 lg:!px-8 !py-6 !font-sans">

            {/* ===== 1. BREADCRUMB ===== */}
            <nav className="!flex !items-center !space-x-2 !text-[13px] !text-[#888] !mb-8">
                <Link href="/" className="hover:!text-[#0084ff]">Trang chủ</Link>
                <IoChevronForward size={10} />
                <span className="!text-[#333]">Liên hệ</span>
            </nav>

            {/* ===== 2. BẢN ĐỒ ===== */}
            <div className="!w-full !h-[450px] !bg-gray-200 !mb-12">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.9026352225665!2d106.62582333852089!3d10.853935324254648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b6c59ba4c97%3A0x535e784068f1558b!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1764397198474!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            {/* ===== 3. NỘI DUNG CHÍNH ===== */}
            <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-12 !mb-16">

                {/* --- CỘT TRÁI: THÔNG TIN LIÊN HỆ --- */}
                <div>
                    <h2 className="!text-[22px] !font-bold !mb-6" style={{ color: BRAND_COLOR }}>
                        Thông tin liên hệ
                    </h2>

                    <div className="!space-y-6 !text-[15px] !text-[#333]">

                        <div className="!flex !items-start !space-x-4">
                            <div className="!w-10 !h-10 !border !border-[#e5e5e5] !rounded-full !flex !items-center !justify-center !flex-shrink-0 !text-[#333]">
                                <IoLocationOutline size={20} />
                            </div>
                            <div>
                                <h3 className="!font-bold !mb-1">Địa chỉ</h3>
                                <p className="!text-[#666]">QTSC 9 Building, Đ. Tô Ký, Tân Chánh Hiệp, Quận 12, Thành phố Hồ Chí Minh, Việt Nam</p>
                            </div>
                        </div>

                        <div className="!flex !items-start !space-x-4">
                            <div className="!w-10 !h-10 !border !border-[#e5e5e5] !rounded-full !flex !items-center !justify-center !flex-shrink-0 !text-[#333]">
                                <IoMailOutline size={20} />
                            </div>
                            <div>
                                <h3 className="!font-bold !mb-1">Email</h3>
                                <p className="!text-[#666]">info@MIUWOOF.vn</p>
                            </div>
                        </div>

                        <div className="!flex !items-start !space-x-4">
                            <div className="!w-10 !h-10 !border !border-[#e5e5e5] !rounded-full !flex !items-center !justify-center !flex-shrink-0 !text-[#333]">
                                <IoCallOutline size={20} />
                            </div>
                            <div>
                                <h3 className="!font-bold !mb-1">Điện thoại</h3>
                                <p className="!text-[#666] !font-bold hover:!text-[#0084ff] !cursor-pointer">
                                    0988.004.089
                                </p>
                            </div>
                        </div>

                        <div className="!flex !items-start !space-x-4">
                            <div className="!w-10 !h-10 !border !border-[#e5e5e5] !rounded-full !flex !items-center !justify-center !flex-shrink-0 !text-[#333]">
                                <IoTimeOutline size={20} />
                            </div>
                            <div>
                                <h3 className="!font-bold !mb-1">Thời gian làm việc</h3>
                                <p className="!text-[#666]">Từ 9h-22h tất cả các ngày trong tuần</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* --- CỘT PHẢI: FORM LIÊN HỆ --- */}
                <div>
                    <h2 className="!text-[26px] !font-bold !mb-3" style={{ color: BRAND_COLOR }}>
                        Gửi thắc mắc cho chúng tôi
                    </h2>
                    <p className="!text-[15px] !text-[#666] !mb-6 !leading-relaxed">
                        Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể.
                    </p>

                    <form onSubmit={handleSubmit} className="!space-y-5">
                        {/* Tên */}
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Tên của bạn"
                                required
                                className="!w-full !h-12 !px-4 !border !border-[#e5e5e5] !text-[15px] focus:!outline-none focus:!border-[#4d3b32] placeholder:!text-[#999] !rounded"
                            />
                        </div>

                        {/* Email & SĐT */}
                        <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-4">
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Email của bạn"
                                    required
                                    className="!w-full !h-12 !px-4 !border !border-[#e5e5e5] !text-[15px] focus:!outline-none focus:!border-[#4d3b32] placeholder:!text-[#999] !rounded"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Số điện thoại của bạn"
                                    className="!w-full !h-12 !px-4 !border !border-[#e5e5e5] !text-[15px] focus:!outline-none focus:!border-[#4d3b32] placeholder:!text-[#999] !rounded"
                                />
                            </div>
                        </div>

                        {/* Nội dung */}
                        <div>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows={6}
                                placeholder="Nội dung"
                                required
                                className="!w-full !p-4 !border !border-[#e5e5e5] !text-[15px] focus:!outline-none focus:!border-[#4d3b32] placeholder:!text-[#999] !resize-none !rounded !leading-relaxed"
                            ></textarea>
                        </div>

                        {/* Nút gửi */}
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="!px-10 !py-3.5 !bg-[#4d3b32] !text-white !text-[15px] !font-bold !uppercase hover:!opacity-90 !transition-opacity !rounded disabled:!opacity-70 disabled:!cursor-not-allowed"
                            >
                                {loading ? "Đang gửi..." : "Gửi cho chúng tôi"}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}