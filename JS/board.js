// 필요 기능
// 1. 가짜 포스트 생성
// 2. 가짜 포스트를 HTML에 붙여넣어서 표시하기
//     1) 붙일 요소: article class="board-card"와 그 아래의 모든 요소
//     2) 붙일 위치: div class="board-list" 아래
//     3) example-title과 example-content를 post의 제목과 content로 바꾸어야 함
//     4) setAttribute와 getAttribute를 이용하여 id 속성을 추가한다.
//     5) 입력: id, 붙여넣을 title, 붙여넣을 content
// 3. 삭제 버튼을 누르면 삭제 버튼이 붙어있는 개체 삭제
// 4. 포스트를 누르면 제목과 내용이 아래쪽에 표시(입력: post)
//     1) board-detail 요소 가져오기
//     2) post에서 article의 자식 요소 순회
//         (1) 요소가 h3이면 board-detail의 p 태그 수정
//         (2) 요소가 div이면 board-detail의 div 태그 수정
// 5. 수정 버튼 클릭
//     1) 선택된 게시글이 없다면 게시글을 선택해주세요 출력
//     2) 게시글 클릭하고 수정 버튼을 누르면
//         (1) 상세 보기의 텍스트를 input 요소로 바꾸기
//         (2) 게시글의 id를 파악하여 수정할 게시글을 찾기
//     3) input 요소가 나와있는 상태에서 수정 버튼을 누르면
//         (1) 두 input 요소의 값으로 선택한 게시글을 수정
//         (2) 나타난 input 요소 없애기
//가짜 포스트 생성
const $boardList = document.querySelector(".board-list");
const $writeBtn = document.querySelector(".write-btn");
function generateMockPost(n) {
    return Array(n)
        .fill()
        .map((_, i) => {
            return {
                id: i + 1,
                title: `title-${i + 1}`,
                content: `content-${i + 1}`,
            };
        });
}
function writePosts(mockPostArr) {
    const mockPostTags = mockPostArr
        .map((el) => {
            return `<article class="board-card">
        <h3 class="flex-center">
            <p class="post-title">writePost-${el.title}</p>
            <button>삭제</button>
        </h3>
        <div class="flex-center">${el.content}</div>
    </article>`;
        })
        .join("");
    return mockPostTags;
}
function appendPosts(title, content) {
    const example = document.querySelector("#example-article");
    if (example !== null) {
        example.remove();
    }

    let $postArticle = document.createElement("article");
    $postArticle.className = "board-card";

    let $postH3 = document.createElement("h3");
    $postH3.className = "flex-center";

    let $postTitle = document.createElement("p");
    $postTitle.className = "post-title";
    $postTitle.innerText = `${title}`;

    let $postDeleteBtn = document.createElement("button");
    $postDeleteBtn.innerText = "삭제";
    $postDeleteBtn.addEventListener("click", deleteArticle);

    let $postContent = document.createElement("div");
    $postContent.className = "flex-center";
    $postContent.innerText = content;

    $postArticle.appendChild($postH3);
    $postH3.append($postTitle, $postDeleteBtn);
    $postArticle.appendChild($postContent);
    $postArticle.addEventListener("click", (event) => {
        showDetail(event, title, content);
    });
    $boardList.appendChild($postArticle);
}
function renderPost(post) {}
function showDetail(event, title, content) {
    event.stopPropagation();
    const boardDetail = document.querySelector(".board-detail");
    const target = event.currentTarget;
    for (const child of target.children) {
        console.log(child.tagName);
        if (child.tagName === "H3") {
            boardDetail.querySelector("p").innerText = title;
            continue;
        }
        if (child.tagName === "DIV") {
            boardDetail.querySelector("div").innerText = content;
        }
    }
}
function deleteArticle(event) {
    event.stopPropagation();
    const target = event.target;
    const article = target.parentNode.parentNode;
    article.remove();
}

const mockPosts = generateMockPost(2); //배열
console.log(mockPosts);

$boardList.innerHTML = writePosts(mockPosts);

$writeBtn.addEventListener("click", (e) => {
    const $inputTitle = document.querySelector(".title").value;
    const $inputContent = document.querySelector(".content").value;
    appendPosts($inputTitle, $inputContent);
});
for (const post of mockPosts) {
    const $inputTitle = post.title;
    const $inputContent = post.content;
    appendPosts($inputTitle, $inputContent);
}
