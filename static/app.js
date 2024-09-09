async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 값을 입력하세요");
  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //문자열만 통신이 가능하기때문에 JSON->문자열로 변환해서 송신
      id,
      content: editInput,
    }),
  });
  readMemo();
}

async function delMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });
  readMemo();
}

function displayMemos(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  li.innerText = `[id:${memo.id}] ${memo.content}`;

  const editBtn = document.createElement("button");
  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;

  const delBtn = document.createElement("button");
  delBtn.innerText = "삭제";
  delBtn.addEventListener("click", delMemo);
  delBtn.dataset.id = memo.id;

  li.appendChild(editBtn);
  li.appendChild(delBtn);
  ul.appendChild(li);
}

async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemos);
}

async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //문자열만 통신이 가능하기때문에 JSON->문자열로 변환해서 송신
      id: new Date().getTime().toString(),
      content: value,
    }),
  });
  readMemo();
}
function handleSubmit(event) {
  event.preventDefault(); //submit에서 새로고침까지 진행해버리기에 이벤트를 막아서 동작하게 한다
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = " ";
}
const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();
