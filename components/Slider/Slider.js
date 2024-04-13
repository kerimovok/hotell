class Slider {
    constructor(
        container,
        content,
        items,
        btnPrev,
        btnNext,
        gap,
        autoSlideInterval,
        slidesToShow,
        slidesToScroll,
    ) {
        this.position = 0;
        this.slidesToShow = slidesToShow;
        this.slidesToScroll = slidesToScroll;
        this.autoSlideInterval = autoSlideInterval;
        this.container = document.querySelector(container);
        this.content = document.querySelector(content);
        this.items = document.querySelectorAll(items);
        this.btnPrev = document.querySelector(btnPrev);
        this.btnNext = document.querySelector(btnNext);
        this.gap = gap;
        this.itemWidth = this.items[0].clientWidth;
        this.movePosition = this.slidesToScroll * (this.itemWidth + this.gap);
        this.itemsCount = this.items.length;
        this.docHeight = document.documentElement.clientHeight;

        const setWH = () => {
            this.itemWidth = this.items[0].clientWidth;
            this.movePosition =
                this.slidesToScroll * (this.itemWidth + this.gap);
            this.items.forEach((item) => {
                // item.style.minWidth = `${this.itemWidth}px`;
                item.style.marginRight = `${this.gap}px`;
            });

            this.position = 0;
        };

        window.addEventListener("resize", setWH);
        setWH();

        const setPosition = () => {
            this.content.style.transform = `translateX(${this.position}px)`;
            if (
                this.position <=
                -(this.itemsCount - this.slidesToShow) *
                    (this.itemWidth + this.gap)
            ) {
                this.position = 0;
            }
        };

        const checkBtns = () => {
            this.btnPrev.disabled = this.position >= 0;
            this.btnNext.disabled = false;
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