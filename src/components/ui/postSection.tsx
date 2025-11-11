"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IPost } from "../../lib/cautrucdata";


export default function PostSection() {
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/data/product.json");
            const data = await res.json();

            setPosts(data.posts.slice(0, 6));
        };

        fetchData();
    }, []);

    return (
        <section className="post">
            <div className="main-content">
                <section className="post__related">
                    <h2 className="post__heading">Có thể bạn muốn biết</h2>

                    <ul className="post_list grid grid-cols-1 md:grid-cols-3 gap-4">
                        {posts.map((post) => (
                            <li key={post.id} className="post__item">
                                <article className="post__article">
                                    <div className="post__image">
                                        <Link href={post.href}>
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                width={400}
                                                height={300}
                                                className="w-full h-full object-cover "
                                            />
                                        </Link>
                                    </div>
                                    <div className="post__content">
                                        <h3 className="post__title line-clamp">
                                            {post.title}
                                        </h3>
                                        <div className="post__time">
                                            <time dateTime={post.date}>{post.date}</time>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        ))}
                    </ul>

                    <div className="post__more">
                        <Link className="post__more--btn" href="/posts">
                            Xem các tin bài khác &gt;&gt;&gt;
                        </Link>
                    </div>
                </section>
            </div>
        </section>
    );
}
