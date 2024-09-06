async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  console.log(jsonRes);
}

readMemo();

async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //문자열만 통신이 가능하기때문에 JSON->문자열로 변환해서 송신
      id: new Date().getTime(),
      content: value,
    }),
  });
  const jsonRes = await res.json();
}
function handleSubmit(event) {
  event.preventDefault(); //submit에서 새로고침까지 진행해버리기에 이벤트를 막아서 log 출력.
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}
const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);
