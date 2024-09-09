from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

class Memo(BaseModel):
    id:str
    content:str

memos=[]


app = FastAPI()

@app.post("/memos")
def create_memo(memo:Memo):
    memos.append(memo)
    return '메모 추가 완료'

@app.get("/memos")
def read_memo():
    return memos

@app.put("/memos/{memo_id}")
def put_memo(req_memo:Memo):
    for memo in memos:
        if memo.id==req_memo.id:
            memo.content = req_memo.content
            return'메모 수정 완료'
    return'없는 메모입니다.'

@app.delete("/memos/{memo_id}")
def delete_memo(memo_id):
    for index,memo in enumerate(memos):
         if memo.id==memo_id:
            memos.pop(index)
            return'메모 삭제 완료'
    return'없는 메모입니다.'



app.mount("/", StaticFiles(directory="static",html=True), name="static")
