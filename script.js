const galleryItems =
    document.querySelectorAll(".gallery-item");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const imageCaption =
    document.getElementById("imageCaption");

const closeButton =
    document.getElementById("closeBtn");

const previousButton =
    document.getElementById("prevBtn");

const nextButton =
    document.getElementById("nextBtn");


let currentIndex = 0;



// =========================
// Get Visible Gallery Items
// =========================

function getVisibleItems() {

    return Array.from(galleryItems).filter(
        function (item) {

            return !item.classList.contains("hide");

        }
    );

}



// =========================
// Open Lightbox
// =========================

function openLightbox(item) {

    const visibleItems =
        getVisibleItems();

    currentIndex =
        visibleItems.indexOf(item);

    showImage();

    lightbox.classList.add("show");

}



// =========================
// Show Current Image
// =========================

function showImage() {

    const visibleItems =
        getVisibleItems();

    const selectedItem =
        visibleItems[currentIndex];

    const image =
        selectedItem.querySelector("img");

    lightboxImage.src =
        image.src;

    lightboxImage.alt =
        image.alt;

    imageCaption.textContent =
        image.alt;

}



// =========================
// Next Image
// =========================

function nextImage() {

    const visibleItems =
        getVisibleItems();

    currentIndex++;

    if (
        currentIndex >=
        visibleItems.length
    ) {
        currentIndex = 0;
    }

    showImage();

}



// =========================
// Previous Image
// =========================

function previousImage() {

    const visibleItems =
        getVisibleItems();

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex =
            visibleItems.length - 1;

    }

    showImage();

}



// =========================
// Close Lightbox
// =========================

function closeLightbox() {

    lightbox.classList.remove("show");

}



// =========================
// Open Image When Clicked
// =========================

galleryItems.forEach(
    function (item) {

        item.addEventListener(
            "click",
            function () {

                openLightbox(item);

            }
        );

    }
);



// =========================
// Navigation Buttons
// =========================

nextButton.addEventListener(
    "click",
    nextImage
);


previousButton.addEventListener(
    "click",
    previousImage
);


closeButton.addEventListener(
    "click",
    closeLightbox
);



// =========================
// Close When Background Clicked
// =========================

lightbox.addEventListener(
    "click",
    function (event) {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);



// =========================
// Keyboard Controls
// =========================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            !lightbox.classList.contains("show")
        ) {
            return;
        }


        if (
            event.key === "ArrowRight"
        ) {

            nextImage();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousImage();

        }


        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }

    }
);



// =========================
// Gallery Filters
// =========================

filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const selectedFilter =
                    button.dataset.filter;


                // Active button

                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                // Filter images

                galleryItems.forEach(
                    function (item) {

                        const category =
                            item.dataset.category;


                        if (
                            selectedFilter === "all" ||
                            selectedFilter === category
                        ) {

                            item.classList.remove(
                                "hide"
                            );

                        } else {

                            item.classList.add(
                                "hide"
                            );

                        }

                    }
                );

            }
        );

    }
);