const img = [
    'assets/uncommon-box.png',
    'assets/common-box.png',
    'assets/rare-box.png',
    'assets/epic-box.png',
    'assets/legendary-box.png',
]

const open = document.querySelector('.open');
const close = document.querySelector('.close');
const popup = document.querySelector('.pop-up');
const slide = document.querySelector('.slide');
const got = document.querySelector('.got-it');
const middle = document.querySelector('.middle');
const itemimg = document.querySelector('.item-img');

createItems();
const items = document.querySelectorAll('.items');

open.addEventListener('click', () => {
    console.log(items.length);
    for (let i = 0; i < items.length; i++) {
        items[i].classList.add('anim-slide');
        // console.log(items[i]);
    }
    items[items.length - 1].addEventListener('animationend', () => {
        for(let i = 0; i < items.length; i++) {
            const checkmiddle = middle.getBoundingClientRect();
            const checkitems = items[i].getBoundingClientRect();
            if (checkmiddle.top < checkitems.bottom &&
                checkmiddle.bottom > checkitems.top &&
                checkmiddle.left < checkitems.right &&
                checkmiddle.right > checkitems.left) {
                    console.log(items[i])
                    got.style.background = items[i].style.background;
                    got.src = items[i].firstChild.src;
            }
        }
        setTimeout(() => {
            popup.style.display = 'flex';
            const audio = new Audio('assets/sound/interface-124464.mp3');
            audio.play();
        }, 300);
    });
});

close.addEventListener('click', () => {
    popup.style.display = 'none';

    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('anim-slide');
    }
    for(let i = 0; i < items.length; i++) {
        items[i].firstChild.src = img[Math.floor(Math.random() * img.length)];
    }
});

function createItems() {
    slide.innerHTML = '';
    for (let i = 0; i < 201; i++) {
        const item = document.createElement('div');
        const addimg = document.createElement('img');
        item.classList.add('items');
        // item.style.background = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        // random img in img array
        addimg.src = img[Math.floor(Math.random() * img.length)];;
        addimg.classList.add('item-img');
        item.appendChild(addimg);
        slide.appendChild(item);
    }
}
