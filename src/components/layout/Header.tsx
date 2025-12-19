'use client';

import '@/app/styles/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/app/styles/globals.css';
import { useEffect, useState } from 'react';
import { ICategory } from '../../lib/cautrucdata';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import LoginForm from "./register";
import PassLogin from "./passLogin"
import Link from 'next/link';
import { UseDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { passLogin, userSlice } from '@/lib/userSlice';
import { LogOut } from '@/lib/userSlice';
import { totalQuantity } from '@/lib/cartSlice';
export default function Header() {

    const router = useRouter();
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState<ICategory[]>([]);
    const [menuTree, setMenuTree] = useState<ICategory[]>([]);
    const [openId, setOpenId] = useState<number | null>(null);
    const [openLogin, setOpenLogin] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [loading, setLoading] = useState(true)
    // const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const passUser = useSelector((state: RootState) => state.user.info);
    const tatolQuantity = useSelector(totalQuantity);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const finalQuantity = mounted ? tatolQuantity : 0;

    useEffect(() => {
        let lastCurrent = 0;
        const downHeader = document.querySelector(".header-container");
        const upheader = document.querySelector(".header__nav");

        const handleScroll = () => {
            let currentScroll = window.scrollY;
            if (window.scrollY > 50) {
                downHeader?.classList.add("scroll-down");

                if (lastCurrent > currentScroll) {
                    upheader?.classList.add("scroll-up");
                } else {
                    upheader?.classList.remove("scroll-up");
                }
            } else {
                downHeader?.classList.remove("scroll-down");
                upheader?.classList.remove("scroll-up");
            }

            lastCurrent = currentScroll;
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    useEffect(() => {
        fetch("http://localhost:3000/user/me", {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Chưa đăng nhập");
                return res.json();
            })
            .then((data) => dispatch(passLogin(data)))
            .catch(() => dispatch(LogOut()));
    }, []);


    const toggleMenu = () => {
        setOpenMenu(!openMenu);
        if (openLogin == true) {
            setOpenLogin(false);
        }
    }

    const toggleLogin = () => {
        setOpenLogin(!openLogin);
        if (openMenu == true) {
            setOpenMenu(false);
        }
    }

    const handleToggle = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    useEffect(() => {
        const handleScroll = () => {

            if (window.scrollY > 400) {
                setOpenMenu(false);
                setOpenId(null);
                setOpenLogin(false);
            }
        };

        window.addEventListener("scroll", handleScroll);


        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:3000/categories");
            const datacategory = await res.json();

            setCategory(datacategory.data);
            setLoading(false);
        };
        fetchData();
    }, []);

    const fallbackMenu = [
        { name: "MUA ĐỒ CHO CHÓ", slug: "#" },
        { name: "MUA ĐỒ CHO MÈO", slug: "#" },
        { name: "VÒNG CỔ", slug: "#" },
        { name: "KHUYẾN MÃI", slug: "#" },
        { name: "DỊCH VỤ SPA", slug: "#" },
        { name: "TIN TỨC", slug: "#" },
        { name: "LIÊN HỆ", slug: "#" },
    ];

    const menuHeader = [
        ...category.filter((c) => c.parent_id === null).map(cate => ({
            name: cate.name,
            slug: `/collections/${cate.slug}`,
            dynamic: true
        })),
        { name: "KHUYẾN MÃI", slug: "/collections/khuyen-mai" },
        { name: "DỊCH VỤ SPA", slug: "/spa" },
        { name: "TIN TỨC", slug: "/news" },
        { name: "LIÊN HỆ", slug: "/contact" },
    ];

    useEffect(() => {
        if (category.length) {
            const tree = category
                .filter((c) => c.parent_id === null)
                .map((parent) => ({
                    ...parent,
                    children: category.filter((c) => c.parent_id === parent.id),
                }));

            setMenuTree(tree);
        }
    }, [category]);

    const handleLogOut = async () => {
        try {
            await fetch("http://localhost:3000/user/logout", {
                method: "POST",
                credentials: "include",
            });
            dispatch(LogOut())
            setOpenLogin(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    const handleSearch = () => {
        const q = query.trim();
        if (q) {
            router.push(`/search?q=${encodeURIComponent(q)}`);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };




    return (
        <header>
            <div className="top-header">
                <div className="main-content">
                    {/* bootstrap-carousel */}
                    <div
                        id="topHeaderCarousel"
                        className="carousel slide text-center"
                        data-bs-ride="carousel"
                    >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <p className="header__content">Miễn phí vận chuyển đơn hàng từ 399k</p>
                            </div>
                            <div className="carousel-item">
                                <p className="header__content">Giảm 20% cho đơn hàng đầu tiên</p>
                            </div>
                            <div className="carousel-item">
                                <p className="header__content">Tặng kèm quà cho hóa đơn trên 599k</p>
                            </div>
                        </div>

                        {/* Nút điều hướng */}
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#topHeaderCarousel"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#topHeaderCarousel"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="header-container">
                <div className="main-content">
                    <div className="header-container-inner">

                        {/* header__menu */}
                        <div className="header__menu" >
                            <a onClick={toggleMenu} href="#" className="header__menu--action" aria-label="Menu">
                                <span className="header__menu--icon">
                                    {
                                        openMenu
                                            ? (
                                                // Nút đóng
                                                <span className="header__menu--close">
                                                    <svg width="25" height="25" viewBox="0 0 12 16" fill="none">
                                                        <path
                                                            d="M10.7062 4.70627C11.0968 4.31565 11.0968 3.68127 10.7062 3.29065C10.3155 2.90002 9.68115 2.90002 9.29053 3.29065L5.9999 6.5844L2.70615 3.29377C2.31553 2.90315 1.68115 2.90315 1.29053 3.29377C0.899902 3.6844 0.899902 4.31877 1.29053 4.7094L4.58428 8.00002L1.29365 11.2938C0.903027 11.6844 0.903027 12.3188 1.29365 12.7094C1.68428 13.1 2.31865 13.1 2.70928 12.7094L5.9999 9.41565L9.29365 12.7063C9.68428 13.0969 10.3187 13.0969 10.7093 12.7063C11.0999 12.3156 11.0999 11.6813 10.7093 11.2906L7.41553 8.00002L10.7062 4.70627Z"
                                                            fill="black"
                                                        />
                                                    </svg>
                                                </span>
                                            )
                                            : (
                                                // Nút mở
                                                <span className="header__menu--open">
                                                    <svg width="25" height="25" viewBox="0 0 36 26" fill="none">
                                                        <path
                                                            d="M1.8 3.6H34.2C34.6774 3.6 35.1352 3.41036 35.4728 3.07279C35.8104 2.73523 36 2.27739 36 1.8C36 1.32261 35.8104 0.864774 35.4728 0.527208C35.1352 0.189643 34.6774 0 34.2 0H1.8C1.32261 0 0.864773 0.189643 0.527208 0.527208C0.189642 0.864774 0 1.32261 0 1.8C0 2.27739 0.189642 2.73523 0.527208 3.07279C0.864773 3.41036 1.32261 3.6 1.8 3.6ZM34.2 10.8H1.8C1.32261 10.8 0.864773 10.9896 0.527208 11.3272C0.189642 11.6648 0 12.1226 0 12.6C0 13.0774 0.189642 13.5352 0.527208 13.8728C0.864773 14.2104 1.32261 14.4 1.8 14.4H34.2C34.6774 14.4 35.1352 14.2104 35.4728 13.8728C35.8104 13.5352 36 13.0774 36 12.6C36 12.1226 35.8104 11.6648 35.4728 11.3272C35.1352 10.9896 34.6774 10.8 34.2 10.8ZM34.2 21.6H1.8C1.32261 21.6 0.864773 21.7896 0.527208 22.1272C0.189642 22.4648 0 22.9226 0 23.4C0 23.8774 0.189642 24.3352 0.527208 24.6728C0.864773 25.0104 1.32261 25.2 1.8 25.2H34.2C34.6774 25.2 35.1352 25.0104 35.4728 24.6728C35.8104 24.3352 36 23.8774 36 23.4C36 22.9226 35.8104 22.4648 35.4728 22.1272C35.1352 21.7896 34.6774 21.6 34.2 21.6Z"
                                                            fill="black"
                                                        />
                                                    </svg>
                                                </span>
                                            )
                                    }
                                </span>


                                <span className="header__menu--text">Menu</span>
                            </a>

                            {openMenu && (
                                <div className="header__menu--dropdown">
                                    <div className="header__menu-home">
                                        <a href="/">
                                            <span className="header__menu--home">
                                                <svg
                                                    width="22"
                                                    height="22"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_106_310)">
                                                        <path
                                                            d="M18.7279 9.60556L10.3945 1.27222C10.2904 1.16875 10.1496 1.11067 10.0029 1.11067C9.8561 1.11067 9.7153 1.16875 9.61121 1.27222L1.27787 9.60556C1.18686 9.71184 1.1393 9.84855 1.1447 9.98836C1.1501 10.1282 1.20806 10.2608 1.30701 10.3598C1.40595 10.4587 1.53858 10.5167 1.6784 10.5221C1.81822 10.5275 1.95493 10.4799 2.06121 10.3889L10.0001 2.45L17.939 10.3944C18.0453 10.4855 18.182 10.533 18.3218 10.5276C18.4616 10.5222 18.5942 10.4643 18.6932 10.3653C18.7921 10.2664 18.8501 10.1337 18.8555 9.99392C18.8609 9.8541 18.8133 9.71739 18.7223 9.61111L18.7279 9.60556Z"
                                                            fill="#522F1F"
                                                        />
                                                        <path
                                                            d="M15.5555 17.7778H12.7777V12.2222H7.22214V17.7778H4.44436V10L3.33325 11.1111V17.7778C3.33325 18.0725 3.45032 18.3551 3.65869 18.5635C3.86706 18.7718 4.14968 18.8889 4.44436 18.8889H8.33325V13.3333H11.6666V18.8889H15.5555C15.8502 18.8889 16.1328 18.7718 16.3411 18.5635C16.5495 18.3551 16.6666 18.0725 16.6666 17.7778V10.9778L15.5555 9.86667V17.7778Z"
                                                            fill="#522F1F"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_106_310">
                                                            <rect width="20" height="20" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </span>
                                        </a>

                                        <span className="header__menu--close"
                                            onClick={toggleMenu}>
                                            X
                                        </span>
                                    </div>
                                    <ul className="header__menu-list ">

                                        {menuTree.map(p => (
                                            <li key={p.id} className="header__menu-item">
                                                <div onClick={() => handleToggle(p.id)} className='header__menu-a'>{p.name}
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4.5 6L8 9.5L11.5 6" stroke="currentColor" />
                                                    </svg>
                                                </div>

                                                {p.children && p.id === openId && (
                                                    <ul className="header__menu-children">
                                                        {p.children.map((ca: any) => (
                                                            <li key={ca.id} className="header__children-item"><a href={`/collections/${ca.slug}`}>{ca.name}</a></li>
                                                        ))}

                                                    </ul>
                                                )}


                                            </li>
                                        ))}

                                        <li className="header__menu-item">
                                            <a href='/collections/khuyen-mai' className='header__menu-a uppercase'>
                                                khuyến mãi
                                            </a>
                                        </li>

                                        <li className="header__menu-item">
                                            <a href='/collections/spa' className='header__menu-a uppercase'>
                                                dịch vụ SPA
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}


                        </div>


                        {/* header__logo */}
                        <div className="header__logo">
                            <div className="header__box">
                                <a href="/" className="header__images">
                                    <img
                                        src="/assets/image/image-logo.png"
                                        className="header__img"
                                        alt="Miuwoof Logo"
                                    />

                                </a>
                                <h1 style={{ display: "none" }}>Miuwoof</h1>
                            </div>
                        </div>

                        {/* header__search */}
                        <div className="header__mz-search">
                            <input
                                id="search"
                                name="search"
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="mz-search__input"
                                placeholder="Tìm kiếm sản phẩm..."
                                autoComplete="off"
                            />
                            <button className="mz-search__btn" aria-label="Tìm kiếm" onClick={handleSearch}>
                                <span className="mz-search__icon">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M17.7552 15.5622L14.2499 12.0574C14.0917 11.8992 13.8772 11.8113 13.6522 11.8113H13.0791C14.0495 10.5705 14.6261 9.00967 14.6261 7.31179C14.6261 3.27273 11.3528 0 7.31304 0C3.27329 0 0 3.27273 0 7.31179C0 11.3508 3.27329 14.6236 7.31304 14.6236C9.01121 14.6236 10.5723 14.0471 11.8134 13.0768V13.6498C11.8134 13.8748 11.9013 14.0892 12.0595 14.2474L15.5648 17.7522C15.8953 18.0826 16.4297 18.0826 16.7567 17.7522L17.7517 16.7573C18.0822 16.4269 18.0822 15.8926 17.7552 15.5622ZM7.31304 11.8113C4.82731 11.8113 2.81271 9.80061 2.81271 7.31179C2.81271 4.82648 4.82379 2.81223 7.31304 2.81223C9.79876 2.81223 11.8134 4.82297 11.8134 7.31179C11.8134 9.79709 9.80228 11.8113 7.31304 11.8113Z"
                                            fill="#C5CEE0"
                                        />
                                    </svg>
                                </span>
                            </button>
                        </div>


                        {/* header__action */}
                        <div className="header__action ">
                            <div className='relative'>
                                <a href="#" onClick={toggleLogin} className="header__user">
                                    <span className="header__user--icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                                        </svg>
                                    </span>
                                    <span className="header__user--text">Tài khoản</span>
                                </a>

                                {/* {openLogin && (
                                    <span className=''>
                                        {passUser ? (
                                            <span className='absolute left-[70%] transform -translate-x-1/2 mt-2 z-50'>
                                                <PassLogin logOut={handleLogOut} />
                                            </span>
                                        ) : (
                                            <span className='absolute left-[70%] transform -translate-x-1/2 mt-2 z-50 w-[325px]'>
                                                <LoginForm />
                                            </span>
                                        )}

                                    </span>
                                )} */}

                                {openLogin && (
                                    <span className=''>
                                        {passUser ? (
                                            <span className='login-modal'>
                                                <button onClick={toggleLogin} className="close-btn">×</button>
                                                <div className="login-content">
                                                    <PassLogin logOut={handleLogOut} />
                                                </div>
                                            </span>
                                        ) : (
                                            <span className='login-modal'>
                                                <button onClick={toggleLogin} className="close-btn">×</button>
                                                <div className="login-content">
                                                    <LoginForm />
                                                </div>
                                            </span>
                                        )}
                                    </span>
                                )}

                            </div>


                            <Link href="/cart" className="header__cart">
                                <div className="">
                                    <span className='!py-[3px] !px-[6px] !text-[11px] rounded-full !font-bold absolute top-[-8px] bg-red-500 text-white'>{finalQuantity}</span>
                                </div>
                                <span className="header__cart--icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 
                                           0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7.16 
                                           14l.84-2h8.45c.75 0 1.41-.41 
                                           1.75-1.03l3.58-6.49L19.25 2H5.21L4.27 0H0v2h2l3.6 
                                           7.59-1.35 2.44C4.11 12.37 5 14 6.5 
                                           14h.66z"/>
                                    </svg>
                                </span>
                                <span className="header__user--text">Giỏ hàng</span>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

            <div className="header__nav w-full">
                <div className="main-content">
                    <nav className="header__nav-inner">
                        <a href="/" className="header__home">
                            <span className="header__home--icon">
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_106_310)">
                                        <path
                                            d="M18.7279 9.60556L10.3945 1.27222C10.2904 1.16875 10.1496 1.11067 10.0029 1.11067C9.8561 1.11067 9.7153 1.16875 9.61121 1.27222L1.27787 9.60556C1.18686 9.71184 1.1393 9.84855 1.1447 9.98836C1.1501 10.1282 1.20806 10.2608 1.30701 10.3598C1.40595 10.4587 1.53858 10.5167 1.6784 10.5221C1.81822 10.5275 1.95493 10.4799 2.06121 10.3889L10.0001 2.45L17.939 10.3944C18.0453 10.4855 18.182 10.533 18.3218 10.5276C18.4616 10.5222 18.5942 10.4643 18.6932 10.3653C18.7921 10.2664 18.8501 10.1337 18.8555 9.99392C18.8609 9.8541 18.8133 9.71739 18.7223 9.61111L18.7279 9.60556Z"
                                            fill="#522F1F"
                                        />
                                        <path
                                            d="M15.5555 17.7778H12.7777V12.2222H7.22214V17.7778H4.44436V10L3.33325 11.1111V17.7778C3.33325 18.0725 3.45032 18.3551 3.65869 18.5635C3.86706 18.7718 4.14968 18.8889 4.44436 18.8889H8.33325V13.3333H11.6666V18.8889H15.5555C15.8502 18.8889 16.1328 18.7718 16.3411 18.5635C16.5495 18.3551 16.6666 18.0725 16.6666 17.7778V10.9778L15.5555 9.86667V17.7778Z"
                                            fill="#522F1F"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_106_310">
                                            <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                        </a>

                        <ul className="header__list">
                            {(loading ? fallbackMenu : menuHeader).map((item, index) => (
                                <li key={index} className="header__item">
                                    <a className="header__link uppercase" href={item.slug}>
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

