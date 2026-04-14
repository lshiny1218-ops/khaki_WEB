(function() {
    // preconnect 설정
    const pre1 = document.createElement('link');
    pre1.rel = 'preconnect';
    pre1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(pre1);

    // const pre2 = document.createElement('link');
    // pre2.rel = 'preconnect';
    // pre2.href = 'https://fonts.gstatic.com';
    // pre2.crossOrigin = 'anonymous';
    // document.head.appendChild(pre2);

    // Gowun Batang 폰트
    // const fontLink = document.createElement('link');
    // fontLink.rel = 'stylesheet';
    // fontLink.href = 'https://fonts.googleapis.com/css2?family=Gowun+Batang&display=swap';
    // document.head.appendChild(fontLink);

    // Noto Sans KR 폰트
    const notoLink = document.createElement('link');
    notoLink.rel = 'stylesheet';
    notoLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap';
    document.head.appendChild(notoLink);

    console.log("Gowun Batang & Noto Sans KR Fonts Loaded via JS");
})();





// 1. Meta 뷰포트 설정 (기존 <script> 내용)
const meta = document.querySelector('meta[name="viewport"]');
if (meta) {
    meta.content = 'width=840';
} else {
    const newMeta = document.createElement('meta');
    newMeta.name = "viewport";
    newMeta.content = "width=840";
    document.head.appendChild(newMeta);
}

// 2. menu_pc 컨테이너 생성 (기존 <div id="menu_pc"></div> 내용)
// 만약 부모 HTML에 이미 <div id="menu_pc">가 있다면 이 부분은 생략해도 됩니다.
if (!document.getElementById('menu_pc')) {
    const menuDiv = document.createElement('div');
    menuDiv.id = 'menu_pc';
    // 원하는 위치에 삽입 (예: body 맨 위)
    document.body.prepend(menuDiv); 
}

// 3. 메뉴 로드 함수
function loadCorrectMenu() {
    const container = document.getElementById('menu_pc');
    if (!container) return;

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // CSS 동적 로드 함수
    function loadCSS(href) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }

    if (isMobile) {
        container.innerHTML = '<iframe src="menu_mobile.html" id="menu_mobile" style="width:840px; height:200px; border:none;"></iframe>';

        try {
            const viewIds = getComputedStyle(document.documentElement)
                .getPropertyValue('--web-view-ids').trim();
            if (viewIds && document.getElementById(viewIds)) {
                document.getElementById(viewIds).style.top = '143px';
            }
        } catch(e) { console.log("viewIds 설정 실패"); }
        
        loadCSS('css/menu_mobile.css');
        console.log("Mobile detected: Loading menu_mobile.html");
    } else {
        container.innerHTML = '<iframe src="menu_pc.html" id="menu_pc" style="width:220px; height:500px; border:none;"></iframe>';
        loadCSS('css/menu_pc.css');
        console.log("PC detected: Loading menu_pc.html");
    }
}




// 페이지 로드 시 실행
window.addEventListener('load', loadCorrectMenu);