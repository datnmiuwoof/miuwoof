"use client"
import Image from 'next/image';
import '@/app/styles/globals.css';
import { useEffect, useState } from 'react';

export default function MyCarousel() {

    const [banners, setBanners] = useState([])
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js').then((module) => {
            const bootstrap = module.default;
            const carouselElement = document.getElementById('heroCarousel');
            if (carouselElement) {
                new bootstrap.Carousel(carouselElement, {
                    interval: 4000,
                    ride: 'carousel',
                });
            }
        });
    }, []);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const result = await fetch(`http://localhost:3000/banner`);

        const res = await result.json()

        setBanners(res)
    }
    return (
        <section className="banner">
            {!banners.length > 0 ? (
                <div className='h-[900px] w-full'>

                </div>
            ) : (<div className="main-content">
                {banners.length > 0 && (
                    <div
                        id="heroCarousel"
                        className="carousel slide carousel-fade"
                        data-bs-ride="carousel"
                        data-bs-interval="4000"
                    >
                        {/* Indicators */}
                        <div className="carousel-indicators">
                            {banners.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    data-bs-target="#heroCarousel"
                                    data-bs-slide-to={index}
                                    className={index === 0 ? "active" : ""}
                                    aria-current={index === 0 ? "true" : undefined}
                                    aria-label={`Slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Slides */}
                        <div className="carousel-inner">
                            {banners.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                                >
                                    <Image
                                        src={item.image}
                                        width={1600}
                                        height={500}
                                        className="d-block w-100"
                                        alt={`Banner ${index + 1}`}
                                        priority={index === 0}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Controls */}
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#heroCarousel"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" />
                            <span className="visually-hidden">Previous</span>
                        </button>

                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#heroCarousel"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" />
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                )}
            </div>)}

        </section>

    );
}