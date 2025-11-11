export default function OrdersPage() {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Danh sách đơn hàng</h2>
            <div className="bg-white rounded-lg shadow p-4">
                <table className="min-w-full text-sm text-left">
                    <thead>
                        <tr className="border-b text-gray-500">
                            <th className="py-2">Mã đơn</th>
                            <th className="py-2">Khách hàng</th>
                            <th className="py-2">Sản phẩm</th>
                            <th className="py-2">Tổng tiền</th>
                            <th className="py-2">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b hover:bg-gray-50">
                            <td>#ORD-001</td>
                            <td>Nguyễn Thị Hương</td>
                            <td>iPhone 14</td>
                            <td>24,500,000 VNĐ</td>
                            <td><span className="text-green-600 font-medium">Hoàn thành</span></td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                            <td>#ORD-002</td>
                            <td>Trần Văn Minh</td>
                            <td>Laptop Dell XPS 15</td>
                            <td>35,900,000 VNĐ</td>
                            <td><span className="text-yellow-600 font-medium">Đang xử lý</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
