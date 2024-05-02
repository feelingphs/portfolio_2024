// work 가로스크롤
const horizontalBox = document.querySelector(".works");
let items = gsap.utils.toArray(".works_list")

items.forEach((container, i) => {
    let localItems = container.querySelectorAll(".works_item"),
    distance = () => {
        let lastItemBounds = localItems[localItems.length-1].getBoundingClientRect(),
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