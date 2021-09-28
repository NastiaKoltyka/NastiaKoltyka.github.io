let picture = document.querySelectorAll('.part.top');
let text = document.querySelectorAll('.text');
const main = document.querySelector('.container');
let items = document.querySelectorAll('.items').length;
let buttonDown = document.querySelector('.btn');
let buttonUp = document.querySelector('.btn-up');
let page = 0;
let active = true;

const scroll = (event) => {
    if (!active) {
        return false
    }
    if (event.deltaY > 0 && page < items - 1) {
        active = false;
        changePage();
        if (page === items - 1) {
            buttonDown.style.display = "none";
            buttonUp.style.display = "block";
        }
        setTimeout(() => {
            active = true;
        }, 2000);
    } else if (event.deltaY < 0 && page > 0) {
        page = page - 1;
        main.style.top = `${-window.innerHeight*page}px`;
        active = false;
        buttonDown.style.display = "block";
        buttonUp.style.display = "none";
        setTimeout(() => {
            active = true;
        }, 2000);

    }
};
const scrollDown = () => {
    if (page === items - 1) {
        buttonDown.style.display = "none";
        buttonUp.style.display = "block";
    }
    changePage();


};
const changePage = () => {

    if (page < items - 1) {
        page = page + 1;
        main.style.top = `${-window.innerHeight*page}px`;
        setTimeout(() => {
            if (page % 2) {
                picture[page - 1].classList.add("hover");
                text[page - 1].style.cssText = 'width:66%; opacity:1; right:0;';
            } else {
                picture[page - 1].classList.add("hover");
                text[page - 1].style.cssText = 'width:66%; opacity:1; left:0;';
            }
        }, 1000);
    }

}
const scrollUp = () => {
    page = 0;
    main.style.top = `${-window.innerHeight*0}px`;
    active = false;
    buttonDown.style.display = "block";
    buttonUp.style.display = "none";
    setTimeout(() => {
        active = true;
    }, 2000);
};
main.addEventListener('touchstart', function (e) {
    let swipe = e.touches;
    let start = swipe[0].pageY;
    main.setAttribute('start', start);
});
main.addEventListener('touchmove', function (e) {
    let contact = e.touches;
    let end = contact[0].pageY;
    let start = parseFloat(main.getAttribute('start'));
    let distance = end - start;
    if (!active) {
        return false
    }
    if (distance < -30 && page < items - 1) {
        active = false;
        changePage();
        setTimeout(() => {
            active = true;
        }, 2000);
    }

    if (distance > 30 && page > 0) {
        page = page - 1;
        main.style.top = `${-window.innerHeight*page}px`;
        active = false;
        buttonDown.style.display = "block";
        buttonUp.style.display = "none";
        setTimeout(() => {
            active = true;
        }, 2000);
    }
});
main.addEventListener("wheel", scroll);
buttonDown.addEventListener("click", scrollDown);
buttonUp.addEventListener("click", scrollUp);

function carousel() {
    let carousels = document.getElementsByClassName("carusel");
    for (let item of carousels) {
        let x = item.children;
        for (let i = 1; i < x.length; i++) {
            x[i].style.display = "none";
        }

        let myIndex = 0;
        setInterval(()=> {
            x[myIndex].style.display = "none";
            myIndex++;
            if(myIndex == x.length){
                myIndex = 0;
            }
            x[myIndex].style.display = "block";
        }, 2000);
    }
}

carousel()