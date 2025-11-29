
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export default function PassLogin({ logOut }: any) {
    const user = useSelector((state: RootState) => state.user.info);
    return (
        <div className="bg-white rounded shadow-lg p-1 space-y-3 w-[235px]">

            <ul className="">
                <li className="p-4 rounded"><h3>xin chào {user.name}</h3></li>
                <li className="!border-t border-[#5c5c5c] shadow-lg my-1"></li>
                <li className="p-4 hover:bg-amber-100 rounded"><a href="#">xem hồ sơ</a></li>
                <li className="p-4 hover:bg-amber-100 rounded"><a href="#">Xem sản phẩm yêu thích</a></li>
                <li className="p-4 hover:bg-amber-100 rounded"><a href="#">Xem đơn hàng</a></li>
                <li className="!border-t border-[#5c5c5c] my-1"></li>
                <li className="p-4 hover:bg-amber-100 rounded"><a href="#">đổi mật khẩu</a></li>
                <li className="p-4 hover:bg-amber-100 rounded" onClick={logOut}>
                    Đăng xuất
                </li>
            </ul>
        </div>
    )
}