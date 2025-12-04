export function formatAddress(address: any, dvhcvn: any) {
    const province = dvhcvn.data.find((p: any) => p.level1_id == address.city);
    const district = province?.level2s.find((d: any) => d.level2_id == address.district);
    const ward = district?.level3s.find((w: any) => w.level3_id == address.ward);

    return {
        line: address.address_line,
        ward: ward?.name ?? "",
        district: district?.name ?? "",
        province: province?.name ?? "",
        full: `${address.address_line}`,
    };
}
