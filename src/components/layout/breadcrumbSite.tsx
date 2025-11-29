import Link from "next/link";


export default function BreadcrumbSite() {

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
                                <Link className="!text-[13px]" href="/">Trang chủ</Link>
                            </li>
                            {/* Tên các trang */}
                            <li className="breadcrumb-item active " aria-current="page">
                                <span className="!text-[13px]">cart</span>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    );
}
