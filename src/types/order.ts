
export type Product = {
  id: number;
  name: string;
  price: string;
  quantity: string;
};

export type Order = {
  // 기본 정보
  author: string;
  category: string;
  title: string;
  content: string;

  // 판매 상품
  products: Product[];

  // 주문 기간
  startDate: string;
  startHour: string;
  startMinute: string;
  endDate: string;
  endHour: string;
  endMinute: string;

  // 배송비 설정
  deliveryCompany: string;
  freeShippingAmount: string;
  baseShippingFee: string;
  remoteAreaFee: string;
  jejuFee: string;
};
