// 1. GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// 2. 변수 선언 및 초기화
const animation = document.querySelectorAll('.animation');
const sections = gsap.utils.toArray('section'); 

// 3. 초기 로드 시 애니메이션 클래스 추가
document.addEventListener('DOMContentLoaded', function () {
    if (animation.length > 0) animation[0].classList.add('is_active');
    if (animation.length > 1) animation[1].classList.add('is_active');
});

// 4. 스크롤 애니메이션
function isActive() {
    const currentWindowHeight = window.innerHeight;
    animation.forEach(function (el) {
        const animationPosition = el.getBoundingClientRect().top;
        if (animationPosition - currentWindowHeight <= -100) {
            el.classList.add('is_active');
        } else {
            el.classList.remove('is_active');
        }
    });
}
document.addEventListener('scroll', isActive);

// 5. Work 가로 스크롤 (마지막에 머무는 기능 추가 핵심 수정)
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || window.innerWidth <= 768;

if (!isMobile) {
    const horizontalBox = document.querySelector('.works');
    const items = gsap.utils.toArray('.works_list');

    if (horizontalBox) {
        items.forEach((container) => {
            const localItems = container.querySelectorAll('.works_item');
            if (!localItems.length) return;

            const getDistance = () => {
                const lastItemBounds = localItems[localItems.length - 1].getBoundingClientRect();
                const containerBounds = container.getBoundingClientRect();
                // 시각적으로 마지막 아이템이 끝나는 지점
                return Math.max(0, lastItemBounds.right - containerBounds.right);
            };

            gsap.to(horizontalBox, {
                x: () => -getDistance(), 
                ease: 'none',
                scrollTrigger: {
                    id: 'worksTrigger',
                    trigger: horizontalBox,
                    start: 'top top',
                    // 마지막에 머무는 시간을 위해 end 값에 윈도우 높이만큼 추가 (여유 공간)
                    end: () => '+=' + (getDistance() + window.innerHeight), 
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                },
            });
        });
    }
}

// 6. 풀페이지 휠 스크롤 - Works 섹션 충돌 완벽 해결
let isAnimating = false;

sections.forEach((section, i) => {
    section.addEventListener('wheel', (e) => {
        // 첫 섹션에서 위로 또는 마지막 섹션에서 아래로 스크롤 시 기본 스크롤 허용
        if ((i === 0 && e.deltaY < 0) || (i === sections.length - 1 && e.deltaY > 0)) return;

        // 가로 스크롤 영역('works')에 대한 진행도 체크
        if (section.classList.contains('works')) {
            const worksST = ScrollTrigger.getById('worksTrigger');

            if (worksST) {
                const currentProgress = worksST.progress;

                // 휠 내릴 때: 가로 스크롤이 끝까지 안 갔으면(progress < 1) 풀페이지 이동 차단
                if (e.deltaY > 0 && currentProgress < 1) {
                    return;
                }
                // 휠 올릴 때: 가로 스크롤이 맨 앞으로 안 왔으면(progress > 0) 풀페이지 이동 차단
                if (e.deltaY < 0 && currentProgress > 0) {
                    return;
                }
            }
        }

        e.preventDefault();
        if (isAnimating) return;

        let targetIndex = i;
        if (e.deltaY > 0 && i < sections.length - 1) targetIndex = i + 1;
        else if (e.deltaY < 0 && i > 0) targetIndex = i - 1;

        if (targetIndex !== i) {
            isAnimating = true;

            gsap.to(window, {
                scrollTo: { y: sections[targetIndex], autoKill: false },
                duration: 0.8,
                ease: 'power2.out',
                onComplete: () => {
                    isAnimating = false;
                    ScrollTrigger.refresh(); // 이동 완료 후 업데이트 강제
                }
            });
        }
    }, { passive: false });
});