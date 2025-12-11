// lab1/app/dich-vu-spa/page.tsx
import Link from 'next/link';
import { IoChevronForward, IoCall } from "react-icons/io5";

export default function Spa() {
    // Màu chủ đạo lấy từ ảnh MIUWOOF
    const BRAND_COLOR = "#4d3b32";
    const HIGHLIGHT_COLOR = "#be1e2d"; // Màu đỏ của số điện thoại

    // Danh sách 12 bước quy trình (Copy y hệt từ ảnh)
    const stepsLeft = [
        "1. Kiểm tra sức khỏe cơ bản",
        "2. Vệ sinh tai, nhổ lông tai",
        "3. Cạo lông bàn chân",
        "4. Cạo lông bụng, vùng vệ sinh",
        "5. Cắt móng, dũa móng",
        "6. Vắt tuyến hôi",
    ];

    const stepsRight = [
        "7. Tắm và dưỡng xả lông",
        "8. Sấy khô lông",
        "9. Gỡ rối, đánh tơi lông",
        "10. Kiểm tra tai sau khi tắm",
        "11. Tỉa gọn lông vùng mắt",
        "12. Thoa dưỡng và thơm lông",
    ];

    return (
        <div className="main-content !mx-auto !px-4 sm:!px-6 lg:!px-8 !py-6 !font-sans">

            {/* ===== 1. BREADCRUMB (Thanh điều hướng) ===== */}
            <nav className="!flex !items-center !space-x-2 !text-[13px] !text-[#888] !mb-8">
                <Link href="/" className="hover:!text-[#0084ff]">Trang chủ</Link>
                <IoChevronForward size={10} />
                <span className="!text-[#333]">Dịch vụ spa chuyên nghiệp cho thú cưng tại MIUWOOF!</span>
            </nav>

            {/* ===== 2. TIÊU ĐỀ CHÍNH ===== */}
            <div className="!text-center !mb-6">
                <h1 className="!text-[28px] md:!text-[32px] !font-bold !mb-4" style={{ color: BRAND_COLOR }}>
                    Dịch vụ spa chuyên nghiệp cho thú cưng tại MIUWOOF!
                </h1>

                {/* Số điện thoại nổi bật */}
                <div className="!flex !items-center !justify-center !space-x-2 !text-[18px] md:!text-[20px] !font-bold" style={{ color: HIGHLIGHT_COLOR }}>
                    <IoCall size={24} />
                    <span>0906.679.089 - 0988.004.089</span>
                </div>
            </div>

            {/* ===== 3. NỘI DUNG MÔ TẢ ===== */}
            <div className="!max-w-4xl !mx-auto !text-[#333] !text-[15px] !leading-7">

                <div className="!mb-6">
                    <h2 className="!font-bold !uppercase !mb-2" style={{ color: BRAND_COLOR }}>
                        MIUWOOF PET SPA - ĐỊA CHỈ ĐÁNG TIN CẬY CỦA CÁC BẠN NUÔI THÚ CƯNG:
                    </h2>
                    <p className="!mb-4">
                        <span className="!font-bold">Dịch vụ spa trọn gói cho chó mèo ở MIUWOOF Pet Shop</span> được làm theo quy trình chăm sóc toàn diện từ A - Z.
                        <br />
                        Quy trình tắm vệ sinh bao gồm 12 bước:
                    </p>
                </div>

                {/* ===== 4. DANH SÁCH 12 BƯỚC (Chia 2 cột giống ảnh) ===== */}
                <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-x-12 !gap-y-2 !mb-10">
                    {/* Cột Trái */}
                    <ul className="!space-y-3">
                        {stepsLeft.map((step, index) => (
                            <li key={index} className="!font-bold !text-[18px]" style={{ color: BRAND_COLOR }}>
                                {step}
                            </li>
                        ))}
                    </ul>

                    {/* Cột Phải */}
                    <ul className="!space-y-3 !mt-3 md:!mt-0">
                        {stepsRight.map((step, index) => (
                            <li key={index} className="!font-bold !text-[18px]" style={{ color: BRAND_COLOR }}>
                                {step}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Ảnh minh họa */}
                <div className="!w-full !text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://file.hstatic.net/200000263355/file/img_6304_361223fe49aa441dada2f926be9faf17_grande.jpg"
                        alt="Quy trình Spa MIUWOOF"
                        className="!mx-auto !rounded-lg !shadow-sm !max-w-full !h-auto"
                    />
                </div>

            </div>
        </div>
    );
}