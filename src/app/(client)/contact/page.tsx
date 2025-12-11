// lab1/app/lien-he/page.tsx
import Link from 'next/link';
import { IoChevronForward, IoLocationOutline, IoMailOutline, IoCallOutline, IoTimeOutline } from "react-icons/io5";

export default function Contact() {
    const BRAND_COLOR = "#4d3b32";

    return (
        <div className="main-content !mx-auto !px-4 sm:!px-6 lg:!px-8 !py-6 !font-sans">

            {/* ===== 1. BREADCRUMB (Thanh điều hướng) ===== */}
            <nav className="!flex !items-center !space-x-2 !text-[13px] !text-[#888] !mb-8">
                <Link href="/" className="hover:!text-[#0084ff]">Trang chủ</Link>
                <IoChevronForward size={10} />
                <span className="!text-[#333]">Liên hệ</span>
            </nav>

            {/* ===== 2. BẢN ĐỒ (Google Map Iframe) ===== */}
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

            {/* ===== 3. NỘI DUNG CHÍNH (Chia 2 cột) ===== */}
            <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-12 !mb-16">

                {/* --- CỘT TRÁI: THÔNG TIN LIÊN HỆ --- */}
                <div>
                    <h2 className="!text-[22px] !font-bold !mb-6" style={{ color: BRAND_COLOR }}>
                        Thông tin liên hệ
                    </h2>

                    <div className="!space-y-6 !text-[15px] !text-[#333]">

                        {/* Địa chỉ */}
                        <div className="!flex !items-start !space-x-4">
                            <div className="!w-10 !h-10 !border !border-[#e5e5e5] !rounded-full !flex !items-center !justify-center !flex-shrink-0 !text-[#333]">
                                <IoLocationOutline size={20} />
                            </div>
                            <div>
                                <h3 className="!font-bold !mb-1">Địa chỉ</h3>
                                <p className="!text-[#666]">QTSC 9 Building, Đ. Tô Ký, Tân Chánh Hiệp, Quận 12, Thành phố Hồ Chí Minh, Việt Nam</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="!flex !items-start !space-x-4">
                            <div className="!w-10 !h-10 !border !border-[#e5e5e5] !rounded-full !flex !items-center !justify-center !flex-shrink-0 !text-[#333]">
                                <IoMailOutline size={20} />
                            </div>
                            <div>
                                <h3 className="!font-bold !mb-1">Email</h3>
                                <p className="!text-[#666]">info@MIUWOOF.vn</p>
                            </div>
                        </div>

                        {/* Điện thoại */}
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

                        {/* Thời gian làm việc */}
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

                    <form className="!space-y-5">
                        {/* Tên của bạn */}
                        <div>
                            <input
                                type="text"
                                placeholder="Tên của bạn"
                                className="!w-full !h-12 !px-4 !border !border-[#e5e5e5] !text-[15px] focus:!outline-none focus:!border-[#4d3b32] placeholder:!text-[#999] !rounded"
                            />
                        </div>

                        {/* Email & SĐT (2 cột) */}
                        <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-4">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email của bạn"
                                    className="!w-full !h-12 !px-4 !border !border-[#e5e5e5] !text-[15px] focus:!outline-none focus:!border-[#4d3b32] placeholder:!text-[#999] !rounded"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Số điện thoại của bạn"
                                    className="!w-full !h-12 !px-4 !border !border-[#e5e5e5] !text-[15px] focus:!outline-none focus:!border-[#4d3b32] placeholder:!text-[#999] !rounded"
                                />
                            </div>
                        </div>

                        {/* Nội dung */}
                        <div>
                            <textarea
                                rows={6}
                                placeholder="Nội dung"
                                className="!w-full !p-4 !border !border-[#e5e5e5] !text-[15px] focus:!outline-none focus:!border-[#4d3b32] placeholder:!text-[#999] !resize-none !rounded !leading-relaxed"
                            ></textarea>
                        </div>

                        {/* Nút gửi */}
                        <div>
                            <button
                                type="button"
                                className="!px-10 !py-3.5 !bg-[#4d3b32] !text-white !text-[15px] !font-bold !uppercase hover:!opacity-90 !transition-opacity !rounded"
                            >
                                Gửi cho chúng tôi
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}