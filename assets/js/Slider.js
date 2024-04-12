class Slider {
    constructor(container, content, items, btnPrev, btnNext, gap) {
        this.position = 0;
        this.slidesToShow = 3.3;
        this.slidesToScroll = 1;
        this.autoSlideInterval = 3000;
        this.container = document.querySelector(container);
        this.content = document.querySelector(content);
        this.items = document.querySelectorAll(items);
        this.btnPrev = document.querySelector(btnPrev);
        this.btnNext = document.querySelector(btnNext);
        this.gap = gap;
        this.itemWidth =
            (this.container.clientWidth - (this.slidesToShow - 1) * this.gap) /
            this.slidesToShow;
        this.movePosition = this.slidesToScroll * (this.itemWidth + this.gap);
        this.itemsCount = this.items.length;
        this.docHeight = document.documentElement.clientHeight;

        const setWH = () => {
            this.itemWidth =
                (this.container.clientWidth -
                    (this.slidesToShow - 1) * this.gap) /
                this.slidesToShow;
            this.movePosition =
                this.slidesToScroll * (this.itemWidth + this.gap);
            this.items.forEach((item) => {
                item.style.minWidth = `${this.itemWidth}px`;
                item.style.marginRight = `${this.gap}px`;
            });
        };

        window.addEventListener("resize", setWH);
        setWH();

        const setPosition = () => {
            this.content.style.transform = `translateX(${this.position}px)`;
        };

        const checkBtns = () => {
            this.btnPrev.disabled = this.position >= 0;
            this.btnNext.disabled =
                this.position <=
                -(this.itemsCount - this.slidesToShow) *
                    (this.itemWidth + this.gap);
        };

        this.btnPrev.addEventListener("click", () => {
            this.position += this.movePosition;
            setPosition();
            checkBtns();
        });

        this.btnNext.addEventListener("click", () => {
            this.position -= this.movePosition;
            setPosition();
            checkBtns();
        });

        const autoSlide = () => {
            this.autoSlideInterval = setInterval(() => {
                this.btnNext.click();
            }, this.autoSlideInterval);
        };

        window.addEventListener("beforeunload", () => {
            clearInterval(this.autoSlideInterval);
        });

        checkBtns();
        autoSlide();
    }
}

let slider = new Slider(
    ".services-container",
    ".services-content",
    ".service-item",
    ".services-btn-prev",
    ".services-btn-next",
    30,
);
