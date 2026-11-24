
import type { Order } from "../types/order";

type OrderDetailProps = {
  order: Order;
  onBack: () => void;
};

export default function OrderDetail({
  order,
  onBack,
}: OrderDetailProps) {
  const formatPrice = (value: string) =>
    Number(value || 0).toLocaleString("ko-KR");

  const formatDateTime = (
    date: string,
    hour: string,
    minute: string
  ) => `${date} ${hour}:${minute}`;

  const shippingItems = [
    ["무료배송 기준", order.freeShippingAmount],
    ["기본 배송비", order.baseShippingFee],
    ["도서산간 추가 배송비", order.remoteAreaFee],
    ["제주도 추가 배송비", order.jejuFee],
  ];

  return (
    <div className="mx-auto w-full max-w-xl py-4 pb-12">
      {/* 헤더 */}
      <div className="bg-orange-500 px-5 py-5 text-center text-2xl font-bold text-white">
        주문서 상세
      </div>

      <div className="flex flex-col gap-6 bg-white px-4 py-6">
        {/* 기본 정보 */}
        <section className="flex flex-col gap-3">
          <div className="text-gray-500">
            {order.author} · {order.category}
          </div>

          <h1 className="break-words text-2xl font-bold">
            {order.title || "제목 없음"}
          </h1>

          <div className="min-h-32 whitespace-pre-wrap break-words border border-gray-300 p-4">
            {order.content || "내용 없음"}
          </div>
        </section>

        {/* 상품 목록 */}
        <section>
          <h2 className="mb-3 text-xl font-bold">
            판매 상품
          </h2>

          <div className="flex flex-col gap-3">
            {order.products.map((product) => (
              <div
                key={product.id}
                className="bg-[#ededed] p-4"
              >
                <p className="mb-3 break-words text-lg font-bold">
                  {product.name || "품목 없음"}
                </p>

                <div className="flex justify-between gap-3">
                  <span>
                    단가: {formatPrice(product.price)}원
                  </span>
                  <span>
                    수량: {formatPrice(product.quantity)}개
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 주문 기간 */}
        <section>
          <h2 className="mb-3 text-xl font-bold">
            주문 기간
          </h2>

          <div className="flex flex-col gap-3 bg-[#f1f1f1] p-4">
            <div>
              <p className="mb-1 text-sm text-gray-500">
                주문 시작시간
              </p>
              <p className="font-bold">
                {formatDateTime(
                  order.startDate,
                  order.startHour,
                  order.startMinute
                )}
              </p>
            </div>

            <div>
              <p className="mb-1 text-sm text-gray-500">
                주문 마감시간
              </p>
              <p className="font-bold">
                {formatDateTime(
                  order.endDate,
                  order.endHour,
                  order.endMinute
                )}
              </p>
            </div>
          </div>
        </section>

        {/* 배송비 설정 */}
        <section className="rounded-lg bg-[#e4f3ff] p-5">
          <h2 className="mb-4 text-xl font-bold">
            배송비 설정
          </h2>

          <div className="mb-4 flex justify-between gap-3">
            <span>기본 택배사</span>
            <span className="font-bold">
              {order.deliveryCompany || "미선택"}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {shippingItems.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-3"
              >
                <span>{label}</span>
                <span className="font-bold">
                  {formatPrice(value)}원
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 하단 버튼 */}
        <button
          type="button"
          onClick={onBack}
          className="h-14 w-full rounded-full bg-gray-300 text-lg font-bold text-gray-700"
        >
          홈으로
        </button>
      </div>
    </div>
  );
}
