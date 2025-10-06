"use client"

import '@/app/styles/reset.css';
import '@/app/styles/globals.css';
import React from "react";
import { IProduct } from "./cautrucdata"



export default function ProductCard({ product }: { product: IProduct }) {
    return (
        <div className="product__item">
            <div className="product__images">
                {product.sale && !product.soldOut && (
                    <div className="product__sale">
                        <span>{product.sale}</span>
                    </div>
                )}

                {product.soldOut && (
                    <div className="product__sold">
                        <span>Tạm hết hàng</span>
                    </div>
                )}

                <div className="product__favorite">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55ZM16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"
                            fill="black"
                        />
                    </svg>
                </div>

                <div className="product__img">
                    {product.image && <img src={product.image} alt="product.alt" />}
                </div>
                <a href={product.slug} className="product__link"></a>
            </div>

            <div className="product__detail">
                <h3 className="product__name line-clamp">
                    <a href={`product/${product.slug}`}>{product.name}</a>
                </h3>

                <div className="product__price">
                    <span className="prod__price">{product.price}</span>
                    <span className="prod__price-del">{product.originalPrice}</span>
                </div>

                <div className="product__action">
                    <a href="#!" className="product__cart">
                        <span className="prod_cart">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M19 7H16V6C16 4.93913 15.5786 3.92172 14.8284 3.17157C14.0783 2.42143 13.0609 2 12 2C10.9391 2 9.92172 2.42143 9.17157 3.17157C8.42143 3.92172 8 4.93913 8 6V7H5C4.73478 7 4.48043 7.10536 4.29289 7.29289C4.10536 7.48043 4 7.73478 4 8V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V8C20 7.73478 19.8946 7.48043 19.7071 7.29289C19.5196 7.10536 19.2652 7 19 7ZM10 6C10 5.46957 10.2107 4.96086 10.5858 4.58579C10.9609 4.21071 11.4696 4 12 4C12.5304 4 13.0391 4.21071 13.4142 4.58579C13.7893 4.96086 14 5.46957 14 6V7H10V6ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V9H8V10C8 10.2652 8.10536 10.5196 8.29289 10.7071C8.48043 10.8946 8.73478 11 9 11C9.26522 11 9.51957 10.8946 9.70711 10.7071C9.89464 10.5196 10 10.2652 10 10V9H14V10C14 10.2652 14.1054 10.5196 14.2929 10.7071C14.4804 10.8946 14.7348 11 15 11C15.2652 11 15.5196 10.8946 15.7071 10.7071C15.8946 10.5196 16 10.2652 16 10V9H18V19Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </span>
                        <span className="prod_text">CHỌN MUA</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
