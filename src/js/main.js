document.addEventListener('DOMContentLoaded', function() {
    isActive();
    layerOpen();
})

document.addEventListener('scroll', function() {
    // 애니메이션
    isActive();
})

document.addEventListener('click', function() {
    
})

const windowHeight = window.innerHeight;
const animation = document.querySelectorAll('.animation');

// 애니메이션
function isActive() {
    animation.forEach(function(e, i){
        const animationPosition = animation[i].getBoundingClientRect().top;
        //console.log(animationPosition);

        if(animationPosition - windowHeight <= -100) {
            animation[i].classList.add('is_active');
        } else if(animationPosition - windowHeight > -100) {
            animation[i].classList.remove('is_active');
        }

    })
}

// work 가로스크롤
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform))) {
    // mobile

} else {
    // desctop
    const horizontalBox = document.querySelector(".works");
    let items = gsap.utils.toArray(".works_list");

    items.forEach((container, i) => {
        let localItems = container.querySelectorAll(".works_item"),
            distance = () => {
                let lastItemBounds = localItems[localItems.length - 1].getBoundingClientRect(),
                    containerBounds = container.getBoundingClientRect();
                return Math.max(0, lastItemBounds.right - containerBounds.right);
            };

        let scrollEvent = gsap.to(horizontalBox, {
            x: () => -distance() - 160,
            ease: "none",
            scrollTrigger: {
                trigger: horizontalBox,
                start: "top top",
                pinnedContainer: horizontalBox,
                end: () => "+=" + distance(),
                pin: horizontalBox,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1,
            }
        })
    });
}



const section = document.querySelectorAll("section");
    
// section.forEach(function(item, i){

//     if(i == 3) {

//     } else {
//         item.addEventListener("wheel", function (e) {
//             e.preventDefault();
    
//             let moveTop = window.scrollY;
    
//             // 스크롤 내릴 때
//             if(e.deltaY > 0){
//                 moveTop += section[(i+1)].getBoundingClientRect().top;
//             }
        
//             // 스크롤 올릴 떄
//             if(e.deltaY < 0){
//                 moveTop += section[(i-1)].getBoundingClientRect().top;
//             }
    
//             window.scrollTo({top: moveTop, left: 0, behavior: "smooth"});
//         })
//     }


// })

// 상세페이지 레이어
function layerOpen(){
    const thumbList = document.querySelector('.works_list');
    const thumbItem = document.querySelectorAll('.works_item')[0];

    const layer = document.querySelector('.layer_detail');
    const layerItem = document.querySelectorAll('.detail_item')[0];
    thumbItem.querySelector('a').addEventListener('click', function() {
        document.body.classList.add('scrollLock');
        layerItem.classList.add('open');
    })
}