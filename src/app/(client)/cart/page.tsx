"use client"

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { ICart } from '@/lib/cautrucdata';
import BreadcrumbSite from "@/components/layout/breadcrumbSite";
import { useAuth } from "@/context/AuthContext";
import { toggleSelect, resetSelect } from '@/lib/checkoutSlice';
import { useRouter } from 'next/navigation';
import { selectSelectedTotal } from '@/lib/checkoutSlice';
import {
  deleteCart,
  incrementQuantity,
  decrementQuantity,
  selectCartTotal,
  setcart
} from '@/lib/cartSlice';

export default function CartPage() {
  const dispatch = useDispatch();
  const cart: ICart[] = useSelector((state: RootState) => state.cart.listProduct);
  // const totalPriceAll = useSelector(selectCartTotal);
  const [isClient, setIsClient] = useState(false);
  const { userId, token, loading } = useAuth();
  const router = useRouter();
  const selectedItems = useSelector((state: RootState) => state.checkout.selectedIds);
  const selectedTotal = useSelector(selectSelectedTotal);


  const API = "http://localhost:3000/api/cart";
  useEffect(() => {
    setIsClient(true);

    const fetchCart = async () => {
      if (!userId) return;

      try {
        const res = await fetch(API, { credentials: "include" });
        if (!res.ok) return;

        const data = await res.json();
        console.log(data)
        const itemsWithUniqueId = data.items.map((p: any) => ({
          ...p,
          quantity: p.quantity,
          uniqueId: `${p.id}-${p.variant.id || "default"}`,
        }))


        dispatch(setcart({ userId: data.userId, cart: itemsWithUniqueId || [] }));
        dispatch(resetSelect());
      } catch (err) {
        console.error("Lỗi fetch giỏ hàng:", err);
      }
    };

    fetchCart();
  }, [userId, dispatch]);

  if (!isClient) return null;

  const handleIncrement = async (uniqueId: string, id: number) => {
    if (userId) {
      const res = await fetch(`${API}/update/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: 1 }),
      });

      if (res.ok) {
        const data = await fetch(API, { credentials: "include" }).then(r => r.json());
        const itemsWithUniqueId = data.items.map((p: any) => ({
          ...p,
          uniqueId: `${p.id}-${p.variant?.id || "default"}`,
        }));
        dispatch(setcart({ userId: data.userId, cart: itemsWithUniqueId }));
      }
    } else {
      dispatch(incrementQuantity(uniqueId));
    }
  };


  const handleDecrement = async (uniqueId: string, id: number) => {
    if (userId) {
      const res = await fetch(`${API}/update/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: -1 }),
      });

      if (res.ok) {
        const data = await fetch(API, { credentials: "include" }).then(r => r.json());

        const itemsWithUniqueId = data.items.map((p: any) => ({
          ...p,
          uniqueId: `${p.id}-${p.variant?.id || "default"}`,
        }));
        dispatch(setcart({ userId: data.userId, cart: itemsWithUniqueId }));
      }
    } else {
      dispatch(decrementQuantity(uniqueId));
    }
  };


  const handleDelete = async (id: number) => {
    if (userId) {
      const res = await fetch(`${API}/remove/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (!res.ok) {
        console.error("Xoá giỏ hàng thất bại!");
        return;
      }
    }

    dispatch(deleteCart(id));
  };


  const handleSelectItem = (uniqueId: string) => {
    dispatch(toggleSelect(uniqueId));
  };

  const handleCheckout = () => {
    if (!userId) {
      alert("Vui lòng đăng nhập để thanh toán");
      return;
    }
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn sản phẩm để thanh toán");
      return;
    }

    if (cart.length === 0) {
      alert("Vui lòng chọn chọn thêm sản phẩm để thanh toán");
      return;
    }
    router.push("/checkout");
  };

  function calcProductPrice(price: number, discountValue?: number) {
    if (!discountValue || discountValue <= 0) return price;
    return Math.round(price * (1 - discountValue / 100));
  }


  return (
    <div className="main-content">
      <div className="pt-2 !mt-[10px]">
        <BreadcrumbSite />
      </div>
      <div className="container mx-auto !mt-[40px] py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 shadow rounded p-5">
          <h1 className="!text-[20px] !font-bold !p-[10px] !border-b-1 !border-[#5c5c5c] !border-dotted mb-5">Giỏ hàng của bạn</h1>

          {cart.length === 0 ? (
            <p className="text-gray-500">Giỏ hàng đang trống</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item: ICart, index: number) => {

                const unitPrice = calcProductPrice(
                  item?.variant.price,
                  item?.discounts?.[0]?.discount_value
                );

                const rowTotal = unitPrice * item.quantity;

                return (
                  <div key={item.uniqueId} className="flex items-center gap-4  pb-4 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.uniqueId)}
                      onChange={() => handleSelectItem(item.uniqueId)}
                    />
                    <img src={item.image} className="w-20 h-20 object-cover rounded" />

                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-[#5c5c5c] !text-[10px] py-1">
                        {[
                          item?.variant?.size,
                          item?.variant?.style,
                          item?.variant?.unit,
                          item?.variant?.flavor,
                        ]
                          .filter(Boolean)
                          .join(" / ")}
                      </p>

                      <p className="text-sm text-gray-600">{unitPrice.toLocaleString('vi-VN')}đ</p>

                      <div className="flex items-center mt-2">
                        <button className="px-2 py-1 border rounded" onClick={() => handleDecrement(item.uniqueId, item.id)}>-</button>
                        <span className="px-4">{item.quantity}</span>
                        <button className="px-2 py-1 border rounded" onClick={() => handleIncrement(item.uniqueId, item.id)}>+</button>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-end h-full">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 font-bold p-1 hover:bg-red-100 rounded"
                      >
                        X
                      </button>

                      <p className="!font-bold !mt-[8px]">
                        {rowTotal.toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="p-5 h-fit !sticky top-5">
          <h3 className="!font-semibold !text-[20px] mb-4">Thông tin đơn hàng</h3>

          <div className="flex justify-between items-center !my-[10px] border-dotted !border-y-1 !py-[10px] mb-2">
            <span className='!font-semibold  !text-[16px]'>Tạm tính:</span>
            <span className="!font-semibold !text-[24px] text-red-600">{selectedTotal.toLocaleString('vi-VN')}đ</span>
          </div>

          <div className="!mt-[8px]">
            <ul className="">
              <li className="!pt-[8px] !text-[14px]">Miễn phí vận chuyển cho đơn hàng từ 399.000đ (Dưới 10km từ miuwoof Gò Vấp)</li>
              <li className="!mt-[8px] !text-[14px]">Giao hàng hỏa tốc trong vòng 4 giờ, áp dụng tại khu vực nội thành Hồ Chí Minh</li>
            </ul>
          </div>

          <button
            className="w-full bg-red-600 text-white py-3 rounded-lg mt-5 font-semibold"
            onClick={handleCheckout}
          >
            THANH TOÁN
          </button>
        </div>
      </div>
    </div>
  );
}