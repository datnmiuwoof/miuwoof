"use client"
import Image from 'next/image';
import '@/app/styles/globals.css';
import { useEffect } from 'react';

export default function MyCarousel() {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js').then((module) => {
            // @ts-ignore
            const bootstrap = module.default; // Hoặc module nếu không dùng default export
            const carouselElement = document.getElementById('heroCarousel');
            if (carouselElement) {
                new bootstrap.Carousel(carouselElement, {
                    interval: 4000,
                    ride: 'carousel',
                });
            }
        });
    }, []);
    return (
        <section className="banner">
            <div className="main-content">
                <div
                    id="heroCarousel"
                    className="carousel slide carousel-fade"
                    data-bs-ride="carousel" // Đảm bảo thuộc tính này
                    data-bs-interval="4000"
                >
                    {/* Indicators */}
                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#heroCarousel"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#heroCarousel"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#heroCarousel"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                    </div>

                    {/* Slides */}
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <Image
                                src="/assets/image/banner-1.jpg"
                                width={1600}
                                height={500}
                                className="d-block w-100"
                                alt="Ảnh 1"
                                loading="eager"
                            />
                        </div>
                        <div className="carousel-item">
                            <Image
                                src="/assets/image/banner-2.jpg"
                                width={1600}
                                height={500}
                                className="d-block w-100"
                                loading="eager"
                                alt="Ảnh 2"
                            />
                        </div>
                        <div className="carousel-item">
                            <Image
                                src="/assets/image/banner-3.jpg"
                                width={1600}
                                height={500}
                                className="d-block w-100"
                                loading="eager"
                                alt="Ảnh 3"
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#heroCarousel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#heroCarousel"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </section>
    );
}