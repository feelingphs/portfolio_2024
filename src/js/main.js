document.addEventListener('DOMContentLoaded', function() {
    animation[0].classList.add('is_active');
    animation[1].classList.add('is_active');
})

document.addEventListener('scroll', function() {
    // 애니메이션
    isActive();
})

const windowHeight = window.innerHeight;
const animation = document.querySelectorAll('.animation');

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

        gsap.to(horizontalBox, {
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

window.addEventListener("wheel", function (e) {
    
    section.forEach(function(item, i){
        const currentScroll = window.scrollY;
        const height = window.innerHeight;
    
        // 스크롤 내릴 때
        if(e.deltaY > 0){
            this.window.scrollTo({left:0, top:currentScroll+height, behavior:'smooth'});
        }
    
        // 스크롤 올릴 떄
        if(e.deltaY < 0){
            this.window.scrollTo({left:0, top:currentScroll-height, behavior:'smooth'});
        }
    })
    


})