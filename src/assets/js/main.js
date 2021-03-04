'use script';
import Swiper, {Navigation, Pagination, Autoplay} from 'swiper';
import Readmore from "readmore-js";
import GLightbox from 'glightbox';

Swiper.use([Navigation, Pagination, Autoplay]);


window.addEventListener('DOMContentLoaded', () => {
    const glightbox = new GLightbox({});
    /* HAMBURGER + FORM SEARCH OPEN HEADER */
    let header = document.querySelector('.header'),
        searchForm = header.querySelector('.header__search > form'),
        hamburgerBtn = header.querySelector('.js-burger'),
        hamburgerMenu = header.querySelector('.hamburger-menu'),
        hamburgerAside = document.querySelector('.aside__menu'),
        hamburgerAsideLinks = document.querySelectorAll('.aside__menu > li > a'),
        subMenu = document.querySelectorAll('.aside__menu-lvl2'),
        footer = document.querySelector('.footer'),
        footerLink = footer.querySelectorAll('.js-footer'),
        footerContent = footer.querySelectorAll('.footer__menu');

    footer.addEventListener('click', (e) => {
        let target = e.target;
        if (target && target.classList.contains('js-footer')) {

            for (let i = 0; i < footerContent.length; i++) {
                if (target == footerLink[i]) {
                    console.log(footerContent[i]);
                    footerContent[i].classList.toggle('active');
                }
            }
        }
    });


    header.addEventListener('click', (e) => {
        let target = e.target;
        if (target && target.classList.contains('js-search')) {
            searchForm.classList.toggle('active');
        }
        if (target && target.classList.contains('js-burger')) {
            hamburgerMenu.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        }


    });
        hamburgerAside.addEventListener('click', e => {
            let target = e.target;
            if (target && target.tagName == 'A') {
                for (let i = 0; i < hamburgerAsideLinks.length; i++) {
                    if (target === hamburgerAsideLinks[i]) {

                        subMenu[i].classList.toggle('active');
                    }
                }
            }
        })

    /* ЗАГРУЗКА ДАННЫХ ИЗ LocalStorage */
    /* пример
    if(localStorage.getItem('city') != null){
        regionBtn.innerHTML = localStorage.getItem('city');
    } else{
        regionBtn.innerHTML = 'Москва';
    }
    */

    /* MODAL */
    let modalBlock = document.querySelector('.js-sidebars'),
        allModal = document.querySelectorAll('.js-sidebars > section'),
        modalCall = document.querySelector('.modal-call'),
        modalOneClick = document.querySelector('.modal-one-click'),
        modalSubscribe = document.querySelector('.modal-subscribe');


    document.addEventListener('click', e => {
        let target = e.target;

        if (target && (target.classList.contains('js-call') || target.classList.contains('modal-call__exit'))) {
            toggleModal(e, modalCall)
        }
        if (target && (target.classList.contains('js-one-click') || target.classList.contains('modal-one-click__exit'))) {
            toggleModal(e, modalOneClick)
        }
        if (target && (target.classList.contains('js-subscribe') || target.classList.contains('modal-subscribe__exit'))) {
            toggleModal(e, modalSubscribe)
        }
        /* ЗАКРЫТИЕ ПО КЛИКУ НА САЙДБАР */
        if (target && target.classList.contains('sidebar-bg')) {
            e.preventDefault();
            modalBlock.classList.toggle('sidebar-bg');
            allModal.forEach(item => {
                if (item.classList.toggle('active')) {
                    item.classList.remove('active');
                }
            });
        }
    });

    function toggleModal(e, modal) {
        e.preventDefault();
        modalBlock.classList.toggle('sidebar-bg');
        modal.classList.toggle('active');
    }


    /* TABS */
    let reviewsBlockParent = document.querySelector('.reviews-block'),
        reviewsBlockTabs = reviewsBlockParent.querySelectorAll('.js-reviews-block-tab'),
        reviewsBlockLink = reviewsBlockParent.querySelectorAll('.reviews-block__link'),
        newsBlockParent = document.querySelector('.news-block'),
        newsBlockTabs = newsBlockParent.querySelectorAll('.js-news-block-tab'),
        newsBlockLink = newsBlockParent.querySelectorAll('.news-block__link'),
        regionParent = document.querySelector('.region'),
        regionTabs = regionParent.querySelectorAll('.js-region-tabs'),
        regionLink = regionParent.querySelectorAll('.region__link');


    if (reviewsBlockParent) {
        toggleTabs(0, reviewsBlockLink, reviewsBlockTabs, reviewsBlockParent, 'reviews-block__link');
    }
    if (newsBlockParent) {
        toggleTabs(0, newsBlockLink, newsBlockTabs, newsBlockParent, 'news-block__link');
    }
    if (regionParent) {
        toggleTabs(0, regionLink, regionTabs, regionParent, 'region__link', true);
    }


    function toggleTabs(i = 0, link, tabs, parent, classContains, subRegion, subLink, subContent) {
        hideTabs(link, tabs);
        showTabs(0, link, tabs);
        /*
        let indexPrevTabs = 0,
            TabsPrevHeight = tabs[indexPrevTabs].clientHeight;
        console.log(tabs[0].clientHeight);
        */
        let subIndex = 0;

        if (subRegion) {
            let subLinks = tabs[0].querySelectorAll('.subregion__link'),
                subTabs = tabs[0].querySelectorAll('.subregion__content');

            hideTabs(subLinks, subTabs);
            showTabs(0, subLinks, subTabs);

        }
        parent.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains(classContains)) {
                e.preventDefault();

                for (let i = 0; i < link.length; i++) {
                    if (link[i] === e.target) {
                        hideTabs(link, tabs);
                        showTabs(i, link, tabs);
                        if (subRegion) {
                            let subLinks = tabs[i].querySelectorAll('.subregion__link'),
                                subTabs = tabs[i].querySelectorAll('.subregion__content');
                            hideTabs(subLinks, subTabs);
                            showTabs(0, subLinks, subTabs);
                            subIndex = i;
                        }
                        /*
                        if(tabs[i].clientHeight > TabsPrevHeight){
                            console.log(tabs[i].clientHeight);
                            console.log(TabsPrevHeight);
                        }
                        */
                    }
                }
            }
            let subLinks = tabs[subIndex].querySelectorAll('.subregion__link'),
                subTabs = tabs[subIndex].querySelectorAll('.subregion__content');
            if (e.target && e.target.classList.contains('subregion__link')) {
                e.preventDefault();
                for (let i = 0; i < subLinks.length; i++) {
                    if (subLinks[i] === e.target) {
                        console.log(subLinks[i]);
                        hideTabs(subLinks, subTabs);
                        showTabs(i, subLinks, subTabs);
                    }
                }
            }
        });
    }

    function showTabs(i = 0, link, content) {
        link[i].classList.add('active');
        content[i].classList.add('active');
    }

    function hideTabs(link, content) {
        link.forEach(item => {
            item.classList.remove('active');
        });
        content.forEach(item => {
            item.classList.remove('active');
        });
    }

    /* SHOW HIDE CONTENT */

    function toggleContent(link, content, linkClass) {
        document.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains(linkClass)) {
                e.preventDefault();
                link.forEach((item, i) => {
                    if (e.target == item) {
                        item.classList.toggle('active');
                        content[i].classList.toggle('active');
                    }
                });
            }
        });
    }

    /* card */
    let cards = document.querySelectorAll('.card'),
        oldPrice = document.querySelectorAll('.card__price'),
        newPrice = document.querySelectorAll('.card__price-b'),
        economy = document.querySelectorAll('.card__economy'),
        countKG = document.querySelectorAll('.js-count-kg');

    for(let i = 0; i < cards.length;i++){
        let oldP = +oldPrice[i].innerHTML.replace(/\D+/g, ''),
            newP = +newPrice[i].innerHTML.replace(/\D+/g, ''),
            resultNum = oldP - newP,
            resultDec =   (oldP - newP) / (oldP / 100);
        if(resultNum > 0){
            economy[i].innerHTML = `${resultNum} ₽, ${resultDec.toFixed(1)} %`;
        }
        else{
            economy[i].innerHTML = '-';
        }

    }
    /* SWIPER */

    let sliderBanner = new Swiper('.swiper-container-banner', {
        slidesPerView: 1,
        observeParents: true,
        observer: true,

        navigation: {
            nextEl: '.banner__next',
            prevEl: '.banner__prev'
        },
        autoplay: {
            delay: 4000,
        },

    });

    let sliderNewsBlock1 = new Swiper('.swiper-container-news-block-1', {
        slidesPerView: 1,
        spaceBetween: 50,
        observeParents: true,
        observer: true,
        autoHeight: true,
        navigation: {
            nextEl: '.news-block__next-1',
            prevEl: '.news-block__prev-1'
        },
    });
    let sliderNewsBlock2 = new Swiper('.swiper-container-news-block-2', {
        slidesPerView: 1,
        spaceBetween: 50,
        observeParents: true,
        observer: true,
        autoHeight: true,
        navigation: {
            nextEl: '.news-block__next-2',
            prevEl: '.news-block__prev-2'
        },
    });
    let sliderNewsBlock3 = new Swiper('.swiper-container-news-block-3', {
        slidesPerView: 1,
        spaceBetween: 50,
        observeParents: true,
        observer: true,
        autoHeight: true,
        navigation: {
            nextEl: '.news-block__next-3',
            prevEl: '.news-block__prev-3'
        },
    });
    let sliderNewsBlock4 = new Swiper('.swiper-container-news-block-4', {
        slidesPerView: 1,
        spaceBetween: 50,
        observeParents: true,
        observer: true,
        autoHeight: true,
        navigation: {
            nextEl: '.news-block__next-4',
            prevEl: '.news-block__prev-4'
        },
    });

    let sliderTags = new Swiper('.swiper-container-tags', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        observeParents: true,
        observer: true,
        allowSlidePrev: true,
        allowSlideNext: true,

        navigation: {
            nextEl: '.tags__next',
            prevEl: '.tags__prev'
        },


    });
    let sliderCert = new Swiper('.swiper-container-sertificate', {
        slidesPerView: 4,
        spaceBetween: 50,
        observeParents: true,
        observer: true,
        allowSlidePrev: true,
        allowSlideNext: true,

        navigation: {
            nextEl: '.cert__next',
            prevEl: '.cert__prev'
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            575: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 3,
            },
            1600: {
                slidesPerView: 4,
            }
        }


    });


    /* RATING */
    let ratingParent = document.querySelector('.js-rating'),
        ratingInput = document.querySelector('#js-rating'),
        ratingStar = document.querySelectorAll('.js-rating > li');

    if (ratingParent) {
        ratingParent.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target;
            if (target && target.tagName == 'LI') {
                ratingStar.forEach((item, i) => {
                    item.classList.remove('active');
                });
                for (let i = 0; i => ratingStar.length; i++) {
                    if (ratingStar[i] == target) {
                        ratingStar[i].classList.add('active');
                        ratingInput.value = ++i;
                        return
                    } else {
                        ratingStar[i].classList.add('active');
                    }
                }
            }

        });
    }
    /* CARD HEART */
    let card = document.querySelectorAll('.card');
    if (card) {
        document.addEventListener('click', (e) => {

            if (e.target && e.target.classList.contains('card__heart-img')) {
                e.preventDefault();
                console.log('asdfasdf');
            }
        });
    }


    /* VIDEO */
    function findVideos() {
        let videos = document.querySelectorAll('.video');

        for (let i = 0; i < videos.length; i++) {
            setupVideo(videos[i]);
        }
    }

    function setupVideo(video) {
        let link = video.querySelector('.video__link');
        let media = video.querySelector('.video__media');
        let button = video.querySelector('.video__button');
        let id = parseMediaURL(media);

        video.addEventListener('click', () => {
            let iframe = createIframe(id);

            link.remove();
            button.remove();
            video.appendChild(iframe);
        });

        link.removeAttribute('href');
        video.classList.add('video--enabled');
    }

    function parseMediaURL(media) {
        let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/hqdefault\.jpg/i;
        let url = media.src;
        let match = url.match(regexp);

        return match[1];
    }

    function createIframe(id) {
        let iframe = document.createElement('iframe');

        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay');
        iframe.setAttribute('src', generateURL(id));
        iframe.classList.add('video__media');

        return iframe;
    }

    function generateURL(id) {
        let query = '?rel=0&showinfo=0&autoplay=1';

        return 'https://www.youtube.com/embed/' + id + query;
    }

    findVideos();
});


/* АДАПТИВНОЕ ПЕРЕМЕЩЕНИЕ БЛОКОВ */
function DynamicAdapt(type) {
    this.type = type;
}

DynamicAdapt.prototype.init = function () {
    const _this = this;
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    this.nodes = document.querySelectorAll("[data-da]");

    for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(",");
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
        оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);

    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
        return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
        return Array.prototype.indexOf.call(self, item) === index;
    });

    for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];

        const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
            return item.breakpoint === mediaBreakpoint;
        });
        matchMedia.addListener(function () {
            _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
    }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
    } else {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) {
                this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        }
    }
};

DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
        destination.insertAdjacentElement('beforeend', element);
        return;
    }
    if (place === 'first') {
        destination.insertAdjacentElement('afterbegin', element);
        return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
}

DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
        parent.insertAdjacentElement('beforeend', element);
    }
}

DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};

DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return -1;
                }

                if (a.place === "last" || b.place === "first") {
                    return 1;
                }

                return a.place - b.place;
            }

            return a.breakpoint - b.breakpoint;
        });
    } else {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return 1;
                }

                if (a.place === "last" || b.place === "first") {
                    return -1;
                }

                return b.place - a.place;
            }

            return b.breakpoint - a.breakpoint;
        });
        return;
    }
};

const da = new DynamicAdapt("max");
da.init();