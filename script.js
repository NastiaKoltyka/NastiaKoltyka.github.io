let picture = document.querySelectorAll('.picture');
let text = document.querySelectorAll('.text');
const main = document.querySelector('.container');
let items = document.querySelectorAll('.items').length;
let buttonDown = document.querySelector('.btn');
let buttonUp=document.querySelector('.btn-up');
let page = 0;
let active = true;

const scroll = (event) => {
    if (!active) {
        return false
    }
    if (event.deltaY > 0 && page < items - 1) {
        active = false;
        changePage();
        setTimeout(() => {
            active = true;
        }, 2000);
    } else if (event.deltaY < 0 && page > 0) {
        page = page - 1;
        main.style.top = `${-window.innerHeight*page}px`;
        active = false;
        setTimeout(() => {
            active = true;
        }, 2000);
    }
};
const scrollDown = () => {
    changePage();
};
const changePage = () => {
    if (page < items - 1) {
        page = page + 1;
        main.style.top = `${-window.innerHeight*page}px`;
        setTimeout(() => {
            if (page % 2) {
                picture[page - 1].style.opacity = `1`;
                text[page - 1].style.cssText = 'width:66%; opacity:1; right:0;';
            } else {
                picture[page - 1].style.opacity = `1`;
                text[page - 1].style.cssText = 'width:66%; opacity:1; left:0;';
            }
        }, 1000);
    }

}
const scrollUp = () => {
    page = 0;
    main.style.top = `${-window.innerHeight*0}px`;
        active = false;
        setTimeout(() => {
            active = true;
        }, 2000);
};
main.addEventListener("wheel", scroll);
main.addEventListener("touchmove", scroll);
buttonDown.addEventListener("click", scrollDown);
buttonUp.addEventListener("click", scrollUp);