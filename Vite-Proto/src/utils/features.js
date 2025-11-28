// 숫자를 통화 형식으로 변환 (예 : 10000 => "10,000원")
export const formatCurrency = (number) => {
  return number.toLocaleString() + "원";
};
