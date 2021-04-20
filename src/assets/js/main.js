'use script';
import Swiper, {Navigation, Pagination, Autoplay, Thumbs} from 'swiper';
import Readmore from "readmore-js";
import GLightbox from 'glightbox';

Swiper.use([Navigation, Pagination, Autoplay, Thumbs]);


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
        modalJob = document.querySelector('.modal-job'),
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
        if (target && (target.classList.contains('js-job') || target.classList.contains('modal-job__exit'))) {
            toggleModal(e, modalJob)
        }
        /* ЗАКРЫТИЕ ПО КЛИКУ НА САЙДБАР */
        if (target && target.classList.contains('sidebar-bg')) {
            e.preventDefault();
            modalBlock.classList.toggle('sidebar-bg');
            for(let i =0; i < allModal.length; i++){
                if (allModal[i].classList.toggle('active')) {
                    allModal[i].classList.remove('active');
                }
            }
        }
    });

    function toggleModal(e, modal) {
        e.preventDefault();
        modalBlock.classList.toggle('sidebar-bg');
        modal.classList.toggle('active');
    }


    /* TABS */
    let reviewsBlockParent = document.querySelector('.reviews-block'),
        reviewsBlockTabs = document.querySelectorAll('.js-reviews-block-tab'),
        reviewsBlockLink = document.querySelectorAll('.reviews-block__link'),
        newsBlockParent = document.querySelector('.news-block'),
        newsBlockTabs = document.querySelectorAll('.js-news-block-tab'),
        newsBlockLink = document.querySelectorAll('.news-block__link'),
        regionParent = document.querySelector('.region'),
        regionTabs = document.querySelectorAll('.js-region-tabs'),
        regionLink = document.querySelectorAll('.region__link'),
        productDescrParent = document.querySelector('.product-descr'),
        productDescrTabs = document.querySelectorAll('.js-product-descr-tab'),
        productDescrLink = document.querySelectorAll('.product-descr__link'),
        
        productBlockParent = document.querySelector('.product-block'),

        productBlockTabs = document.querySelectorAll('.js-product-tab'),
        productBlockLink = document.querySelectorAll('.js-product-link'),
        boardBlockParent = document.querySelector('.board'),
        boardBlockTabs = document.querySelectorAll('.js-banner-tab'),
        boardBlockLink = document.querySelectorAll('.js-banner-link');

    if (boardBlockParent && boardBlockLink.length > 0 && boardBlockTabs.length > 0) {
        toggleTabs(0, boardBlockLink, boardBlockTabs, boardBlockParent, 'js-banner-link');
    }
    if (productBlockParent && productBlockLink.length > 0 && productBlockTabs.length > 0) {
        toggleTabs(0, productBlockLink, productBlockTabs, productBlockParent, 'js-product-link');
    }
    if (reviewsBlockParent && reviewsBlockLink.length > 0 && reviewsBlockTabs.length > 0) {
        toggleTabs(0, reviewsBlockLink, reviewsBlockTabs, reviewsBlockParent, 'reviews-block__link');
    }
    
    if (newsBlockParent && newsBlockLink.length > 0 && newsBlockTabs.length > 0) {
        toggleTabs(0, newsBlockLink, newsBlockTabs, newsBlockParent, 'news-block__link');
    }
    if (productDescrParent && productDescrLink.length > 0 && productDescrTabs.length > 0) {
        toggleTabs(0, productDescrLink, productDescrTabs, productDescrParent, 'product-descr__link');
    }
    if (regionParent && regionLink.length > 0 && regionTabs.length > 0) {
        toggleTabs(0, regionLink, regionTabs, regionParent, 'region__link', true);
    }
    let body = document.querySelector('body');
    body.addEventListener('click', (e)=>{
        console.log(e.target);
    });

    function toggleTabs(i = 0, link, tabs, parent, classContains, subRegion, subLink, subContent) {
        hideTabs(link, tabs);
        showTabs(0, link, tabs);
        /*
        let indexPrevTabs = 0,
            TabsPrevHeight = tabs[indexPrevTabs].clientHeight;
        console.log(tabs[0].clientHeight);
        */
        let subIndex = 0;
       
        if (subRegion && regionLink.length > 0) {
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
        for(let i = 0; i < link.length; i++){
            link[i].classList.remove('active');
        }
        for(let i = 0; i < content.length; i++){
            content[i].classList.remove('active');
        }
    }

    /* SHOW HIDE CONTENT */
    let jobParent = document.querySelector('.job'),
        jobLink = document.querySelectorAll('.job-item__header'),
        jobContent = document.querySelectorAll('.job-item__content');

    if(jobParent){
        toggleContent(jobLink, jobContent, 'job-item__header')
    }
    function toggleContent(link, content, linkClass) {
        document.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains(linkClass)) {
                e.preventDefault();
                for(let i = 0; i < link.length; i++){
                    if (e.target == link[i]) {
                        link[i].classList.toggle('active');
                        content[i].classList.toggle('active');
                    }
                }
            }
        });
    }

    /* card */

    let cards = document.querySelectorAll('.card'),
        oldPrice = document.querySelectorAll('.card__price'),
        newPrice = document.querySelectorAll('.card__price-b'),
        cardLike = document.querySelectorAll('.card__heart');
        document.addEventListener('click', (e) => {
            if(e.target && e.target.classList.contains('card__heart')){
                e.preventDefault();
            }
        })
        if(cards){/*
            for(let i = 0; i < cards.length;i++){
        let economy = cards[i].querySelectorAll('.card__economy');
        console.log(economy);

                let oldP = +oldPrice[i].innerHTML.replace(/\D+/g, ''),
                    newP = +newPrice[i].innerHTML.replace(/\D+/g, ''),
                    resultNum = oldP - newP,
                    resultDec =   (oldP - newP) / (oldP / 100);
                    if(economy){
                        if(resultNum > 0){
                            economy.innerHTML = `${resultNum} ₽ ${resultDec.toFixed(1)} %`;
                        }
                        else{
                            economy.innerHTML = '-';
                        }
                    }
                
            }
*/
            toggleCardLike(cardLike);

        function toggleCardLike(like) {
            for(let i=0; i < like.length; i++) {
                let trigger = false;
                like[i].onclick = function(x) {
                    return function() {
                        if(trigger){
                            like[i].innerHTML = `
                            <img src="https://maritimehistory.webdevlair.com/wp-content/themes/maritimehistory/assets/img/cardheart.svg" class="card__heart-img" alt="">
                            `
                            ;
                            trigger = false;
                        }else{
                            like[i].innerHTML = `
                            <img src="https://maritimehistory.webdevlair.com/wp-content/themes/maritimehistory/assets/img/cardheartactive.svg" class="card__heart-img" alt="">
                            `
                            ;
                            trigger = true;


                        }
                    }
                }(i)

            }
        }


        }
    
    let modalCountKg = document.querySelectorAll('.js-modal-count-kg'),
        modalCountPrev = document.querySelectorAll('.modal-one-click__prev'),
        modalCountNext = document.querySelectorAll('.modal-one-click__next'),
        modalPrice = document.querySelectorAll('.js-modal-price'),
        productParent = document.querySelector('.product'),
        productPlus = document.querySelector('.product-count__next'),
        productMinus = document.querySelector('.product-count__prev'),
        productCount = document.querySelector('.product-count__num'),
        basketParent = document.querySelector('.basket'),
        basketItems = document.getElementsByClassName('basket-item'),
        basketItemNum = document.getElementsByClassName('js-basket-num'),
        basketItemCount = document.getElementsByClassName('js-basket-kg'),
        basketItemPlus = document.getElementsByClassName('basket__next'),
        basketItemMinus = document.getElementsByClassName('basket__prev'),
        basketItemSum = document.getElementsByClassName('js-basket-sum'),
        basketItemPrice = document.getElementsByClassName('js-basket-price'),
        basketItemDelete = document.getElementsByClassName('js-basket-delete'),
        basketResultPrice = document.querySelector('.js-basket-result-price'),
        basketResultSum = document.querySelector('.js-basket-result-sum'),
        basketResultKg = document.querySelector('.js-basket-result-kg'),
        orderPrice = document.querySelector('.js-order-price'),
        orderDelivery = document.querySelector('.js-order-delivery'),
        orderDiscount = document.querySelector('.js-order-discount'),
        orderFinal = document.querySelector('.js-order-final');
/* basket 
        if(basketParent){
            toggleBasketCount(basketItemMinus, basketItemCount, basketItemPlus);

            function toggleBasketCount(prev, count ,next) {
                for(let i=0; i < basketItems.length; i++) {
                    basketItemNum[i].innerHTML = i + 1;
                    let price =  +basketItemPrice[i].innerHTML.replace(/\D+/g, ''),
                        kg = +basketItemCount[i].innerHTML.replace(/\D+/g, ''),
                        sum = +basketItemSum[i].innerHTML.replace(/\D+/g, '');

                    basketItemSum[i].innerHTML = +count[i].innerHTML * price + ' ₽';
                    basketResultPrice.innerHTML = +basketResultPrice.innerHTML.replace(/\D+/g, '') + price  + ' ₽';
                    basketResultSum.innerHTML = +basketResultSum.innerHTML.replace(/\D+/g, '') + (+count[i].innerHTML * price) + ' ₽';
                    orderFinal.innerHTML = +basketResultSum.innerHTML.replace(/\D+/g, '') + ' ₽';
                    orderPrice.innerHTML = +basketResultSum.innerHTML.replace(/\D+/g, '') + ' ₽';
                    basketResultKg.innerHTML = +basketResultKg.innerHTML.replace(/\D+/g, '') + kg;
                    if(i+1 == basketItems.length && +basketResultSum.innerHTML.replace(/\D+/g, '') != 0){
                        basketResultSum.innerHTML = +basketResultSum.innerHTML.replace(/\D+/g, '') + +orderDelivery.innerHTML.replace(/\D+/g, '') - +  +orderDiscount.innerHTML.replace(/\D+/g, '') + ' ₽';
                        orderFinal.innerHTML = +basketResultSum.innerHTML.replace(/\D+/g, '') + ' ₽';
                    }
                    orderFinal.innerHTML = +basketResultSum.innerHTML.replace(/\D+/g, '') + ' ₽';
                    next[i].onclick = function(x) {
                        return function() {
                            count[i].innerHTML = +count[i].innerHTML + 1;
                            basketItemSum[i].innerHTML = +count[i].innerHTML * price + ' ₽';
                            nullData();
                            toggleBasketCount(basketItemMinus, basketItemCount, basketItemPlus);
                        }
                    }(i)
                    prev[i].onclick = function(x) {
                            return function() {
                                if(+count[i].innerHTML > 0){
                                count[i].innerHTML = +count[i].innerHTML - 1;
                                basketItemSum[i].innerHTML = +count[i].innerHTML * price + ' ₽';
                                nullData();
                                toggleBasketCount(basketItemMinus, basketItemCount, basketItemPlus);
                            }
                        }

                    }(i)
                    basketItemDelete[i].onclick = function (x) {
                        return function() {
                            basketItems[i].remove();
                            nullData();
                            toggleBasketCount(basketItemMinus, basketItemCount, basketItemPlus);


                    }
                    }(i)
                    function nullData(){
                        basketResultKg.innerHTML = 0;
                        basketResultPrice.innerHTML = 0;
                        basketResultSum.innerHTML = 0;
                        orderPrice.innerHTML = 0;
                        orderFinal.innerHTML = 0;
                    }
                }
            }
        }

    if(productParent && productCount){
        let count = productCount.value;
        productPlus.addEventListener('click', (e) => {
            e.preventDefault();
                productCount.value = ++count;
        });
        productMinus.addEventListener('click', (e) => {
            e.preventDefault();
            if(count > 0){
                productCount.value = --count;
            }
        });
    }
    */
    /*modal one click */
    if(modalOneClick){
        toggleModalCount(modalCountPrev, modalCountKg, modalCountNext);

        function toggleModalCount(prev, count ,next) {
            for(let i=0; i < count.length; i++) {
                let price =  +modalPrice[i].innerHTML.replace(/\D+/g, '');
                count[i].innerHTML = 1
                next[i].onclick = function(x) {
                    return function() {
                        count[i].innerHTML = +count[i].innerHTML + 1;
                        modalPrice[i].innerHTML = +modalPrice[i].innerHTML.replace(/\D+/g, '') + price + ' ₽';
                    }
                }(i)
                prev[i].onclick = function(x) {
                        return function() {
                            if(+count[i].innerHTML > 0){
                            count[i].innerHTML = +count[i].innerHTML - 1;
                            modalPrice[i].innerHTML = +modalPrice[i].innerHTML.replace(/\D+/g, '') - price + ' ₽';
                        }
                    }

                }(i)
            }
        }

    }
     /* modal one click */
     let card = document.querySelectorAll('.card'),
     cardPrice = document.querySelectorAll('.card__price-b'),
     cardName = document.querySelectorAll('.card__name'),
     cardImg = document.querySelectorAll('.card__img'),

     modalOneClickImg = document.querySelector('.modal-one-click__img'),
     modalOneClickName = document.querySelector('.modal-one-click__name'),
     modalOneClickPrice = document.querySelector('.js-modal-price'),
     modalOneClickBtn = document.querySelectorAll('.js-one-click'),

     modalInputName = document.querySelector('#js-modal-one-click-name'),
     modalInputPrice = document.querySelector('#js-modal-one-click-price'),
     modalInputUrl = document.querySelector('#js-modal-one-click-url'),
     oneCardParent = document.querySelector('.product__info'),
     oneCardName = document.querySelector('.product__title'),
     oneCardPrice = document.querySelector('.product-price__new'),
     oneCardImg = document.querySelector('.product__img');



if(card || oneCardParent){
 getCardInfoToModalOneClick(card);
}


 function getCardInfoToModalOneClick(card) {
     for(let i=0; i < card.length; i++) {
         modalOneClickBtn[i].onclick = function(x) {
             return function() {
                 if(oneCardParent){
                     console.log('work');
                     modalOneClickName.innerHTML = oneCardName.innerHTML;
                     modalInputName.value = oneCardName.innerHTML

                     modalOneClickPrice.innerHTML = oneCardPrice.innerHTML;
                     modalInputPrice.value = oneCardPrice.innerHTML;


                     modalOneClickImg.childNodes[1].src = oneCardImg.childNodes[1].src;
                     modalInputUrl.value =  window.location;
                 }
                 else{
                     modalOneClickName.innerHTML = cardName[i].innerHTML;
                     modalInputName.value = cardName[i].innerHTML
                     console.log(modalOneClickPrice.innerHTML);
                     console.log(cardPrice[i].innerHTML);

                     modalOneClickPrice.innerHTML = cardPrice[i].innerHTML;
                     modalInputPrice.value = cardPrice[i].innerHTML;


                     modalOneClickImg.childNodes[1].src = cardImg[i].childNodes[1].src;
                     modalInputUrl.value = cardName[i].href;
                 }


             }
         }(i)

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
    let sliderTags2 = new Swiper('.swiper-container-tags-2', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        observeParents: true,
        observer: true,
        allowSlidePrev: true,
        allowSlideNext: true,

        navigation: {
            nextEl: '.tags-2__next',
            prevEl: '.tags-2__prev'
        },


    });
    let sliderReviewsTabs = new Swiper('.swiper-container-reviews-tabs', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        observeParents: true,
        observer: true,
        allowSlidePrev: true,
        allowSlideNext: true,

        navigation: {
            nextEl: '.reviews-tabs__next',
            prevEl: '.reviews-tabs__prev'
        },


    });
    let sliderOrderTabs = new Swiper('.swiper-container-order', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        observeParents: true,
        observer: true,
        allowSlidePrev: true,
        allowSlideNext: true,

        navigation: {
            nextEl: '.order__next',
            prevEl: '.order__prev'
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
    let galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 30,
        autoplay:true,
        slidesPerView: 4,
        direction: 'vertical',
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    let galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 0,
        autoplay:true,
        navigation: {
            nextEl: '.product__next',
            prevEl: '.product__prev',
        },
        thumbs: {
            swiper: galleryThumbs
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
                for(let i = 0; i < ratingStar.length; i++){
                    ratingStar[i].classList.remove('active')
                }
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