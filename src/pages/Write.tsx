
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import type { Order, Product } from "../types/order";

type WriteProps = {
    onCancel: () => void;
    onComplete: (order: Order) => void;
};



const today = new Date();

const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
].join("-");


export default function Write({ onCancel, onComplete }: WriteProps) {
    // 기본 정보
    const [author, setAuthor] = useState("홍길동CR1234");
    const [category, setCategory] = useState("판매상품");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 주문 기간
    const [startDate, setStartDate] = useState(todayString);
    const [startHour, setStartHour] = useState("00");
    const [startMinute, setStartMinute] = useState("00");

    const [endDate, setEndDate] = useState(todayString);
    const [endHour, setEndHour] = useState("00");
    const [endMinute, setEndMinute] = useState("00");

    // 배송 설정
    const [deliveryCompany, setDeliveryCompany] = useState("");
    const [shippingFees, setShippingFees] = useState(["", "", "", ""]);

    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: "", price: "", quantity: "9999" },
    ]);

    const addProduct = () => {
        setProducts((prev) => [
            ...prev,
            { id: Date.now(), name: "", price: "", quantity: "9999" },
        ]);
    };

    const removeProduct = (id: number) => {
        setProducts((prev) =>
            prev.length > 1 ? prev.filter((product) => product.id !== id) : prev
        );
    };

    const updateProduct = (
        id: number,
        field: "name" | "price" | "quantity",
        value: string
    ) => {
        setProducts((prev) =>
            prev.map((product) =>
                product.id === id
                    ? { ...product, [field]: value }
                    : product
            )
        );
    };

    const handleComplete = () => {
        const order: Order = {
            author,
            category,
            title,
            content,
            products,
            startDate,
            startHour,
            startMinute,
            endDate,
            endHour,
            endMinute,
            deliveryCompany,
            freeShippingAmount: shippingFees[0],
            baseShippingFee: shippingFees[1],
            remoteAreaFee: shippingFees[2],
            jejuFee: shippingFees[3],
        };

        onComplete(order);
    };
    return (
        <div className="mx-auto w-full max-w-xl py-4 pb-12">
            {/* 주문서 헤더 */}
            <div className="bg-orange-500 px-5 py-5 text-center text-2xl font-bold text-white">
                주문서 작성
            </div>

            <div className="flex flex-col gap-4 bg-white px-4 py-6">
                {/* 상단 입력 영역 */}
                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="h-14 w-full bg-[#f1f1f1] px-4 text-lg outline-none"
                    />

                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="h-14 w-full bg-[#f1f1f1] px-4 text-lg outline-none"
                    />

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목"
                        className="h-14 w-full bg-[#f1f1f1] px-4 text-lg outline-none"
                    />

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요"
                        rows={5}
                        className="w-full resize-none bg-white border border-gray-300 p-4 text-lg outline-none"
                    />
                </div>


                {/* 상품 등록 영역 */}
                <div className="mt-4 bg-[#ededed] p-4">
                    <div className="py-3 text-2xl font-bold">
                        판매 상품을 등록해주세요.
                    </div>
                    <div className="flex flex-col gap-3">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center gap-3 bg-white p-3"
                            >
                                <div className="flex min-w-0 flex-1 flex-col gap-3">
                                    {/* 품목명 */}
                                    <input
                                        type="text"
                                        placeholder="품목"
                                        value={product.name}
                                        onChange={(e) =>
                                            updateProduct(product.id, "name", e.target.value)
                                        }
                                        className="h-16 w-full bg-[#f8f8f8] px-4 text-xl outline-none"
                                    />

                                    {/* 단가 / 수량 */}
                                    <div className="flex h-16 items-center bg-[#f8f8f8]">
                                        <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                placeholder="단가"
                                                value={product.price}
                                                onChange={(e) =>
                                                    updateProduct(
                                                        product.id,
                                                        "price",
                                                        e.target.value.replace(/\D/g, "")
                                                    )
                                                }
                                                className="min-w-0 w-full bg-transparent text-right text-lg outline-none"
                                            />
                                            원
                                        </div>

                                        <div className="flex w-28 shrink-0 items-center border-l border-white px-2">
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                aria-label="수량"
                                                value={product.quantity}
                                                onChange={(e) =>
                                                    updateProduct(
                                                        product.id,
                                                        "quantity",
                                                        e.target.value.replace(/\D/g, "")
                                                    )
                                                }
                                                className="w-full bg-transparent text-right text-xl outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* 품목 삭제 / 추가 */}
                                <div className="flex shrink-0 items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => removeProduct(product.id)}
                                        disabled={products.length === 1}
                                        className="flex h-12 w-12 items-center justify-center bg-red-500 text-white disabled:opacity-40"
                                        aria-label="품목 삭제"
                                    >
                                        <Minus size={28} strokeWidth={3} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={addProduct}
                                        className="flex h-12 w-12 items-center justify-center bg-blue-500 text-white"
                                        aria-label="품목 추가"
                                    >
                                        <Plus size={32} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* 주문 시간 설정 */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="mb-2 block text-lg font-bold">
                                    주문 시작시간
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        type="date"
                                        className="h-14 min-w-0 w-full border border-gray-300 bg-white px-3"
                                    />

                                    <div className="flex h-14 items-center gap-2 bg-white">
                                        {/* 시간: 00~23 */}
                                        <select
                                            value={startHour}
                                            onChange={(e) => setStartHour(e.target.value)}
                                            defaultValue="00"
                                            aria-label="시"
                                            className="h-full min-w-0 flex-1 px-2 text-center"
                                        >
                                            {Array.from({ length: 24 }, (_, i) => {
                                                const hour = String(i).padStart(2, "0");
                                                return (
                                                    <option key={hour} value={hour}>
                                                        {hour}
                                                    </option>
                                                );
                                            })}
                                        </select>

                                        <span className="font-bold text-xl">시</span>

                                        {/* 분: 00~59 */}
                                        <select
                                            value={startMinute}
                                            onChange={(e) => setStartMinute(e.target.value)}
                                            defaultValue="00"
                                            aria-label="분"
                                            className="h-full min-w-0 flex-1  px-2 text-center"
                                        >
                                            {Array.from({ length: 60 }, (_, i) => {
                                                const minute = String(i).padStart(2, "0");
                                                return (
                                                    <option key={minute} value={minute}>
                                                        {minute}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <span className="font-bold text-xl">분</span>
                                    </div>

                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-lg font-bold">
                                    주문 마감시간
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}

                                        type="date"
                                        className="h-14 min-w-0 w-full border border-gray-300 bg-white px-3"
                                    />

                                    <div className="flex h-14 items-center gap-2 bg-white">
                                        {/* 시간: 00~23 */}
                                        <select
                                            value={endHour}
                                            onChange={(e) => setEndHour(e.target.value)}
                                            aria-label="시"
                                            className="h-full min-w-0 flex-1 px-2 text-center"
                                        >
                                            {Array.from({ length: 24 }, (_, i) => {
                                                const hour = String(i).padStart(2, "0");
                                                return (
                                                    <option key={hour} value={hour}>
                                                        {hour}
                                                    </option>
                                                );
                                            })}
                                        </select>

                                        <span className="font-bold text-xl">시</span>

                                        {/* 분: 00~59 */}
                                        <select
                                            value={endMinute}
                                            onChange={(e) => setEndMinute(e.target.value)}
                                            aria-label="분"
                                            className="h-full min-w-0 flex-1  px-2 text-center"
                                        >
                                            {Array.from({ length: 60 }, (_, i) => {
                                                const minute = String(i).padStart(2, "0");
                                                return (
                                                    <option key={minute} value={minute}>
                                                        {minute}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <span className="font-bold text-xl">분</span>
                                    </div>

                                </div>
                            </div>

                            <p className="text-sm text-gray-500">
                                ※ 24시간 기준입니다.
                            </p>
                        </div>



                    </div>
                </div>

                {/* 배송비 설정 */}
                <div className="rounded-lg bg-[#e4f3ff] p-5">
                    <h2 className="mb-5 text-xl font-bold">배송비 설정</h2>

                    <div className="grid grid-cols-2 items-center gap-x-4 gap-y-4">
                        <label htmlFor="delivery-company" className="font-bold">
                            기본 택배사 선택
                        </label>


                        <select
                            value={deliveryCompany}
                            onChange={(e) => setDeliveryCompany(e.target.value)}
                            id="delivery-company"
                            className="h-12 min-w-0 w-full border border-gray-300 bg-white px-2"
                        >
                            <option value="" disabled>
                                택배사 선택
                            </option>
                            <option value="cj">CJ대한통운</option>
                            <option value="post">우체국택배</option>
                            <option value="hanjin">한진택배</option>
                            <option value="lotte">롯데택배</option>
                            <option value="logen">로젠택배</option>
                            <option value="dream">드림택배</option>
                            <option value="cvsnet">CVSnet 편의점택배</option>
                            <option value="cu">CU 편의점택배</option>
                            <option value="kgb">KGB택배</option>
                            <option value="kyungdong">경동택배</option>
                            <option value="daesin">대신택배</option>
                            <option value="ilyang">일양로지스</option>
                            <option value="hapdong">합동택배</option>
                            <option value="gtx">GTX로지스</option>
                            <option value="kunyoung">건영택배</option>
                            <option value="chunil">천일택배</option>
                            <option value="hanyi">한의사랑택배</option>
                            <option value="today">오늘의픽업</option>
                        </select>

                        {[
                            "배송비 무료기준 금액",
                            "기본 배송비",
                            "도서산간 추가 배송비",
                            "제주도 추가 배송비",
                        ].map((label, index) => (
                            <div
                                key={label}
                                className="col-span-2 grid grid-cols-2 items-center gap-4"
                            >
                                <label
                                    htmlFor={`shipping-fee-${index}`}
                                    className="font-bold"
                                >
                                    {label}
                                </label>

                                <div className="flex h-12 min-w-0 items-center border border-gray-300 bg-white px-3">
                                    <input
                                        id={`shipping-fee-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="0"
                                        value={shippingFees[index]}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "");

                                            setShippingFees((prev) =>
                                                prev.map((fee, i) => (i === index ? value : fee))
                                            );
                                        }}
                                        className="w-full min-w-0 bg-transparent text-right outline-none"
                                    />
                                    <span className="ml-2 shrink-0 text-gray-500">원</span>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>


                {/* 하단 버튼 */}
                <div className="mt-6 flex gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="h-14 flex-1 rounded-full bg-gray-300 text-lg font-bold text-gray-700"
                    >
                        취소
                    </button>

                    <button
                        type="button"
                        className="h-14 flex-1 rounded-full bg-gray-500 text-lg font-bold text-white"
                    >
                        임시저장
                    </button>

                    <button
                        type="button"
                        onClick={handleComplete}
                        className="h-14 flex-1 rounded-full bg-orange-500 text-lg font-bold text-white"
                    >
                        작성완료
                    </button>
                </div>
            </div>
        </div>
    );
}
