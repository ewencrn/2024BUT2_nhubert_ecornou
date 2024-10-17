const carouselContainer = document.querySelector('.carousel-container');
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function updateCarousel() {
    carouselItems.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentIndex) {
            item.classList.add('active');
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
}

// Change slide every 3 seconds
setInterval(nextSlide, 3000);
