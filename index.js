let allMemo = JSON.parse(localStorage.getItem("allMemo"));
allMemo = allMemo ?? [];
render();

document.getElementById("button").addEventListener("click", saveNote);

function saveNote() {
    const title = document.getElementById("title");
    const content = document.getElementById("content");

    //날짜 자동생성
    const date = new Date();

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const dateStr = year + '-' + month + '-' + day;

    allMemo.push({title: title.value, content: content.value, len: allMemo.length, date: dateStr});

    localStorage.setItem("allMemo", JSON.stringify(allMemo));
    render();

    //texterea clear
    title.value = " ";
    content.value = " ";
}

function render() {
    const display = document.getElementById("display");
    display.innerHTML = "";

    // // 최신 게시물이 위로 올라오도록
    // for (let i = allMemo.length; i > 0 ; i--) {
    //     // 아래와 유사 코드
    // }

    for (const item of allMemo) {
        const saveTitle = document.createElement("h2");
        const saveContent = document.createElement("p");
        const saveId = document.createElement("p");
        const deleteMemoBtn = document.createElement("button");
        const itemBox = document.createElement("div");
        const saveDay = document.createElement("p");

        saveTitle.textContent = item.title;
        saveContent.textContent = item.content;
        saveId.textContent = item.len + 1;
        deleteMemoBtn.textContent = "삭제";
        deleteMemoBtn.setAttribute("id", item.len);
        deleteMemoBtn.setAttribute("onclick", "remove()");
        itemBox.textContent = " ";
        saveDay.textContent = item.date;

        display.appendChild(itemBox);
        itemBox.appendChild(saveId);
        itemBox.appendChild(saveTitle);
        itemBox.appendChild(saveContent);
        itemBox.appendChild(saveDay);
        itemBox.appendChild(deleteMemoBtn);
    }
}

function remove() {
    // console.log(event.srcElement.id);
    // console.log(allMemo);
    const idx = allMemo.find(
        (item) => item.len == event.srcElement.id
    );
    if (idx) {
        allMemo.splice(
            allMemo.findIndex((item) => item.len == idx.len),
            1
        );
    }
    localStorage.setItem("allMemo", JSON.stringify(allMemo));
    render();
}