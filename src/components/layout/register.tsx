"use client"

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { passLogin, LogOut } from "@/lib/userSlice";

export default function LoginForm() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErorrs] = useState<any>({});
    const dispatch = useDispatch();

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get("email")?.toString().trim()
        const password = formData.get("password")?.toString().trim();

        const newErrors: any = {};
        if (!email) newErrors.email = "Email không được để trống";
        if (!email?.includes("@")) newErrors.email = "email không hợp lệ";
        if (!password) newErrors.password = "password không để trống";

        setErorrs(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const data = await fetch("http://localhost:3000/user/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                    credentials: "include",
                })
                if (data.ok) {
                    const jsonData = await data.json();
                    dispatch(passLogin(jsonData));

                    alert("đăng nhập thành công");
                    setForm({
                        email: "",
                        password: "",
                    });



                } else {
                    console.log("đăng nhập lỗi");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow-lg p-4 space-y-3">
                <div className="text-center mb-5 mt-3">
                    <h2 className="!text-[1.8rem] text-[#5c5c5c] mb-2 !font-light uppercase">đăng nhập tài khoản</h2>
                    <p className="text-[#5c5c5c] text-[1.4rem] font-extralight">nhập mật khẩu và email của bạn</p>
                </div>

                <div className="mb-5">
                    <div className="mb-2">
                        <button className="w-full bg-[#db4437] text-white py-3 rounded hover:bg-[#c1351d] transition">
                            <i className="fab fa-google mr-2"></i>Đăng nhập Google
                        </button>
                    </div>

                    <div className="">
                        <button className="w-full bg-[#4267B2] text-white py-3 rounded font-medium hover:bg-[#365899] transition">
                            <i className="fab fa-facebook-f mr-2"></i>Đăng nhập Facebook
                        </button>
                    </div>
                </div>

                <div className="">
                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.email && (
                            <p className="text-red-500 !text-[1.2rem] mt-2 !ml-2">{errors.email}</p>
                        )}
                    </div>

                    <div className="mb-3"><input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Mật khẩu"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                        {errors.password && (
                            <p className="text-red-500 !text-[1.2rem] mt-2 !ml-2">{errors.password}</p>
                        )}
                    </div>
                </div>



                <button type="submit" className="w-full bg-blue-500 mt-5 text-white py-3 rounded-lg hover:bg-blue-600 transition">
                    Đăng nhập
                </button>

                <div className="text-start text-gray-500 mt-3">
                    <p className="text-[#5c5c5c] mt-2 !text-[1.2rem] font-extralight">Khách hàng mới? <a href="/account/register" className="text-[#5c3a2d] hover:underline">Tạo tài khoản</a></p>
                    <p className="text-[#5c5c5c] mt-2 !text-[1.2rem] font-extralight">Quên mật khẩu? <a href="#" className="text-[#5c3a2d] text-[10px] hover:underline">Khôi phục mật khẩu</a></p>

                </div>
            </div>
        </form>

    );
}
