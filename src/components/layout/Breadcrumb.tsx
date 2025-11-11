"use client"
import { IProduct } from "@/lib/cautrucdata";
import Link from "next/link";

interface BreadcrumbProps {
    product: IProduct;
}

export default function Breadcrumb({ product }: BreadcrumbProps) {

    const category = product.Category;
    const parentCategory = category?.ParentCategory;


    return (
        <div className="breadcrumb-paren">
            <div className="main-content">
                <div className="breadcrumb__inner">
                    <nav
                        style={{ "--bs-breadcrumb-divider": "'/'" } as React.CSSProperties}
                        aria-label="breadcrumb"
                    >
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link href="/">Trang chủ</Link>
                            </li>

                            {/* Nếu có category cha thì mới hiển thị */}
                            {parentCategory && (
                                <li className="breadcrumb-item">
                                    <Link href={`/collections/${parentCategory.slug}`}>
                                        {parentCategory.name}
                                    </Link>
                                </li>
                            )}

                            {/* Tên sản phẩm */}
                            <li className="breadcrumb-item active" aria-current="page">
                                {product.name}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    );
}
