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
        console.log(animationPosition);

        if(animationPosition - windowHeight <= -100) {
            animation[i].classList.add('is_active');
        } else if(animationPosition - windowHeight > -100) {
            animation[i].classList.remove('is_active');
        }

    })
}

// work 가로스크롤
const horizontalBox = document.querySelector(".works");
let items = gsap.utils.toArray(".works_list")

items.forEach((container, i) => {
    let localItems = container.querySelectorAll(".works_item"),
        distance = () => {
            let lastItemBounds = localItems[localItems.length - 1].getBoundingClientRect(),
                containerBounds = container.getBoundingClientRect();
            return Math.max(0, lastItemBounds.right - containerBounds.right);
        };
    gsap.to(horizontalBox, {
        x: () => -distance() - 200,
        ease: "none",
        scrollTrigger: {
            trigger: horizontalBox,
            start: "top top",
            pinnedContainer: horizontalBox,
            end: () => "+=" + distance(),
            pin: horizontalBox,
            scrub: true,
            invalidateOnRefresh: true
        }
    })
});




const section = document.querySelectorAll("section");
const sectionHeight = section[0].getBoundingClientRect().height;
const nextSection = section[1].getBoundingClientRect().top;

window.addEventListener("wheel", function (e) {
    console.log(e.deltaY);

    

})



