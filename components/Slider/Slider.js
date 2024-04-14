// TODO: Add lifecycle methods
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

        this.init();
    }

    init() {
        this.setWH();
        this.setPosition();
        this.checkButtons();
        this.autoSlide();

        window.addEventListener("resize", this.setWH.bind(this));
        this.btnPrev.addEventListener("click", this.prevSlide.bind(this));
        this.btnNext.addEventListener("click", this.nextSlide.bind(this));
        window.addEventListener("beforeunload", this.stopAutoSlide.bind(this));
    }

    setWH() {
        this.itemWidth = this.items[0].clientWidth;
        this.movePosition = this.slidesToScroll * (this.itemWidth + this.gap);
        this.items.forEach((item) => {
            item.style.marginRight = `${this.gap}px`;
        });
        this.position = 0;
    }

    setPosition() {
        this.content.style.transform = `translateX(${this.position}px)`;
        if (
            this.position <=
            -(this.itemsCount - this.slidesToShow) * (this.itemWidth + this.gap)
        ) {
            this.position = this.movePosition;
        }
    }

    checkButtons() {
        this.btnPrev.disabled = this.position >= 0;
        this.btnNext.disabled =
            this.position <=
            -(this.itemsCount - this.slidesToShow) *
                (this.itemWidth + this.gap);
    }

    prevSlide() {
        this.position += this.movePosition;
        this.setPosition();
        this.checkButtons();
    }

    nextSlide() {
        this.position -= this.movePosition;
        this.setPosition();
        this.checkButtons();
    }

    autoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.btnNext.click();
        }, this.autoSlideInterval);
    }

    stopAutoSlide(resetPosition = true) {
        if (resetPosition) {
            this.position = 0;
            this.setPosition();
            this.checkButtons();
        }
        clearInterval(this.autoSlideInterval);
    }
}
