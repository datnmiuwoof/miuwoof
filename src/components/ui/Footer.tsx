import '@/app/styles/reset.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/app/styles/globals.css';
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="main-content">
                <div className="footer__row grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-[30px]">

                    <section className="footer__contact footer__inner">
                        <h4 className="footer__heading">
                            Thông tin liên hệ
                        </h4>
                        <div className="footer__content">
                            <p>
                                <b>Mozzi.vn</b> là trang mua sắm trực tuyến các
                                sản phẩm bán lẻ dành cho thú cưng của <b>Mozzi
                                    Pet Shop. Công ty TNHH MOZZI</b>. Giấy chứng nhận
                                Đăng ký Kinh doanh số 0315592769 do Sở Kế hoạch
                                và Đầu tư Thành phố Hồ Chí Minh cấp ngày 28/03/2019.
                            </p>
                            <div className="footer__logo">
                                <Link href="/" passHref>
                                    <Image
                                        src="/assets/image/footer_logobct_img.png"
                                        alt="Footer logo"
                                        width={120}
                                        height={45}
                                    />
                                </Link>
                            </div>
                        </div>
                    </section>

                    <section className="footer__shop footer__inner">
                        <h4 className="footer__heading">
                            Thông tin cửa hàng
                        </h4>
                        <div className="footer__content">
                            <ul className="footer__list">
                                <li className="footer__item">
                                    <b>Địa chỉ:</b>{" "}
                                    <Link href="">
                                        136 Huỳnh Văn Bánh, p.11, quận Phú Nhuận, HCM
                                    </Link>
                                </li>
                                <li className="footer__item">
                                    <Link href="tel:0123456789">
                                        <b><strong>0123456789</strong></b>
                                    </Link>
                                </li>
                                <li className="footer__item">
                                    <Link href="">
                                        <b>datn@gmail.com</b>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="footer__client footer__inner">
                        <h4 className="footer__heading">
                            Hỗ trợ khách hàng
                        </h4>
                        <div className="footer__content">
                            <ul className="footer__list">
                                <li className="footer__item">
                                    <Link href="/search">Tìm kiếm</Link>
                                </li>
                                <li className="footer__item">
                                    <Link href="/about">Giới thiệu</Link>
                                </li>
                                <li className="footer__item">
                                    <Link href="/privacy-policy">Chính sách bảo mật</Link>
                                </li>
                                <li className="footer__item">
                                    <Link href="/payment-policy">Chính sách thanh toán</Link>
                                </li>
                                <li className="footer__item">
                                    <Link href="/shipping-policy">Chính sách giao hàng</Link>
                                </li>
                                <li className="footer__item">
                                    <Link href="/return-policy">Chính sách đổi trả</Link>
                                </li>
                                <li className="footer__item">
                                    <Link href="/guide">Hướng dẫn mua hàng</Link>
                                </li>
                                <li className="footer__item">
                                    <Link href="/terms">Điều khoản dịch vụ</Link>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="footer__socal footer__inner">
                        <h4 className="footer__heading">
                            Thông tin cửa hàng
                        </h4>
                        <div className="footer__content">
                            <div className="footer__info">
                                <div className="footer__logo-phone">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                        xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <rect width="30" height="30" fill="url(#pattern0_111_929)" />
                                        <defs>
                                            <pattern id="pattern0_111_929" patternContentUnits="objectBoundingBox" width="1"
                                                height="1">
                                                <use xlinkHref="#image0_111_929"
                                                    transform="translate(-0.0070028 -0.0714286) scale(0.0070028)" />
                                            </pattern>
                                            <image id="image0_111_929" width="155" height="153" preserveAspectRatio="none"
                                                xlinkHref="data:image/png;base64,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" />
                                        </defs>
                                    </svg>
                                </div>
                                <div className="footer__phone-email">
                                    <span>
                                        <strong>
                                            <a href="">0123.456.789</a>
                                        </strong>
                                    </span>
                                    <u>datn@gmail.com</u>
                                </div>
                            </div>
                            <h4 className="footer__heading">Follow Us</h4>
                            <ul className="footer__list">
                                <li className="footer__item">
                                    <a className="footer__socal--icon" href=""><svg width="14" height="14" viewBox="0 0 24 24"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.19776 21.5H13.1978V13.49H16.8018L17.1978 9.51H13.1978V7.5C13.1978 7.23478 13.3031 6.98043 13.4907 6.79289C13.6782 6.60536 13.9325 6.5 14.1978 6.5H17.1978V2.5H14.1978C12.8717 2.5 11.5999 3.02678 10.6622 3.96447C9.72454 4.90215 9.19776 6.17392 9.19776 7.5V9.51H7.19776L6.80176 13.49H9.19776V21.5Z"
                                            fill="black" />
                                    </svg>
                                    </a>
                                </li>
                                <li className="footer__item">
                                    <a className="footer__socal--icon" href="">
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M17 8.5C17.8284 8.5 18.5 7.82843 18.5 7C18.5 6.17157 17.8284 5.5 17 5.5C16.1716 5.5 15.5 6.17157 15.5 7C15.5 7.82843 16.1716 8.5 17 8.5Z"
                                                fill="black"
                                            />
                                            <path
                                                d="M16 3C18.76 3 21 5.24 21 8V16C21 18.76 18.76 21 16 21H8C5.24 21 3 18.76 3 16V8C3 5.24 5.24 3 8 3H12H16Z"
                                                stroke="black"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8Z"
                                                stroke="black"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>

                                    </a>
                                </li>
                                <li className="footer__item">
                                    <a href="">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                            <rect x="0.799805" y="0.649902" width="30.4" height="30.4"
                                                fill="url(#pattern0_117_223)" />
                                            <defs>
                                                <pattern id="pattern0_117_223" patternContentUnits="objectBoundingBox"
                                                    width="1" height="1">
                                                    <use xlinkHref="#image0_117_223"
                                                        transform="translate(-0.00638281 -0.00242953) scale(0.00564972)" />
                                                </pattern>
                                                <image id="image0_117_223" width="187" height="177"
                                                    preserveAspectRatio="none"
                                                    xlinkHref="data:image/png;base64,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" />
                                            </defs>
                                        </svg>
                                    </a>

                                </li>
                                <li className="footer__item">
                                    <a className="footer__socal--icon" href=""><svg width="14" height="14" viewBox="0 0 24 24"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16.6002 5.82C15.9167 5.03953 15.5401 4.0374 15.5402 3H12.4502V15.4C12.4268 16.0712 12.1437 16.7071 11.6605 17.1735C11.1773 17.6399 10.5318 17.9004 9.86016 17.9C8.44016 17.9 7.26016 16.74 7.26016 15.3C7.26016 13.58 8.92016 12.29 10.6302 12.82V9.66C7.18016 9.2 4.16016 11.88 4.16016 15.3C4.16016 18.63 6.92016 21 9.85016 21C12.9902 21 15.5402 18.45 15.5402 15.3V9.01C16.7932 9.90985 18.2975 10.3926 19.8402 10.39V7.3C19.8402 7.3 17.9602 7.39 16.6002 5.82Z"
                                            fill="black" />
                                    </svg>
                                    </a>
                                </li>
                                <li className="footer__item">
                                    <a href=""><svg width="32" height="32" viewBox="0 0 31 32" fill="none"
                                        xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <rect x="0.600098" y="0.649902" width="30.4" height="30.4"
                                            fill="url(#pattern0_117_225)" />
                                        <defs>
                                            <pattern id="pattern0_117_225" patternContentUnits="objectBoundingBox"
                                                width="1" height="1">
                                                <use xlinkHref="#image0_117_225"
                                                    transform="translate(0.0096079 -0.00958739) scale(0.00564972)" />
                                            </pattern>
                                            <image id="image0_117_225" width="177" height="177"
                                                preserveAspectRatio="none"
                                                xlinkHref="data:image/png;base64,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" />
                                        </defs>
                                    </svg></a>

                                </li>
                            </ul>
                        </div>
                    </section>

                </div>
                <b>
                    <div className="footer__text">
                        <p>Copyright © 2025 <a href=""> Mozzi Pet Shop.</a><a href="">Powered by Haravan.</a></p>
                    </div>
                </b>
            </div>
        </footer>
    );
}