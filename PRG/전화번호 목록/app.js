const input = ['119', '97674223', '1195524421'];
// 풀이 1: 객체를 이용

function solution(phone_book) {
  const obj = {};
  phone_book.forEach((phone) => {
    obj[phone] = 1;
  });

  for (const phone of phone_book) {
    let num = '';
    for (let i = 0; i < phone.length - 1; i++) {
      num += phone[i];
      if (obj[num]) {
        return false;
      }
    }
  }
  return true;
}

// 풀이 2: 정렬을 이용
function solution(phone_book) {
  phone_book.sort();

  const answer = phone_book.some((phone, i) => {
    return phone_book[i + 1].startsWith(phone);
  });

  return !answer;
}
console.log(solution(input));

// phone_book의 길이가 백만이므로 O(N)에 풀어야함
// 전화번호의 길이가 1~20이므로 순회 가능
// 객체 조회 O(1)
