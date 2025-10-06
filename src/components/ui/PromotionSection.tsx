// src/components/ui/PromotionSection.tsx
import React from 'react';

// Định nghĩa kiểu cho mỗi item khuyến mãi
interface PromotionItem {
    title: string;
    content: string;
    href: string;
    titleAttr: string;
}

// Định nghĩa props với giá trị mặc định
interface PromotionSectionProps {
    items?: PromotionItem[];
}

// Component với giá trị mặc định trong destructuring
const PromotionSection: React.FC<PromotionSectionProps> = ({ items = [
    { title: 'SHIP COD TOÀN QUỐC', content: 'Thanh toán khi nhận hàng', href: '', titleAttr: 'SHIP COD TOÀN QUỐC' },
    { title: 'MIỄN PHÍ ĐỔI HÀNG *', content: 'Trong vòng 7 ngày', href: '', titleAttr: 'MIỄN PHÍ ĐỔI HÀNG' },
    { title: 'GIAO HÀNG TRONG NGÀY', content: 'Đối với đơn nội thành TP HCM', href: '', titleAttr: 'GIAO HÀNG TRONG NGÀY' },
    { title: 'ĐẶT HÀNG TRỰC TUYẾN', content: 'Hotline: 0123456789', href: '', titleAttr: 'ĐẶT HÀNG TRỰC TUYẾN' },
] }) => {
    return (
        <section className="promotion">
            <div className="main-content">
                <div className="promotion__list">
                    {items.map((item, index) => (
                        <div key={index} className="promotion__item">
                            <div className="promotion__inner">
                                <a href={item.href} title={item.titleAttr}>
                                    <span className="promotion__title">{item.title}</span>
                                    <span className="promotion__content">{item.content}</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PromotionSection;