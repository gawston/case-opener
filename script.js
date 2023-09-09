const open = document.querySelector('.open');
const close = document.querySelector('.close');
const popup = document.querySelector('.pop-up');
const slide = document.querySelector('.slide');
const got = document.querySelector('.got-it');
const middle = document.querySelector('.middle');
const itemimg = document.querySelector('.item-img');

// percent show in website
const puncommon = document.querySelector('.p-uncommon');
const pcommon = document.querySelector('.p-common');
const prare = document.querySelector('.p-rare');
const pepic = document.querySelector('.p-epic');
const plegendary = document.querySelector('.p-legendary');

const img = [
    'assets/uncommon-box.png',
    'assets/common-box.png',
    'assets/rare-box.png',
    'assets/epic-box.png',
    'assets/legendary-box.png',
]

// create items
const boxcount = 200;

for(let i = 0; i < boxcount; i++) {
    const item = document.createElement('div');
    const addimg = document.createElement('img');
    item.classList.add('items');
    addimg.classList.add('item-img');
    item.appendChild(addimg);
    slide.appendChild(item);
}
const items = document.querySelectorAll('.items');
setRandomBox();

open.addEventListener('click', () => {
    const audio = new Audio('assets/sound/case-opening.mp3');
    audio.play();
    // if sound play dont play again until sound end
    open.disabled = true;
    setTimeout(() => {
        open.disabled = false;
    }, 8000); 
    for (let i = 0; i < items.length; i++) {
        items[i].classList.add('anim-slide');
    }
    items[items.length - 1].addEventListener('animationend', () => {
        for(let i = 0; i < items.length; i++) {
            const checkmiddle = middle.getBoundingClientRect();
            const checkitems = items[i].getBoundingClientRect();
            if (checkmiddle.top < checkitems.bottom &&
                checkmiddle.bottom > checkitems.top &&
                checkmiddle.left < checkitems.right &&
                checkmiddle.right > checkitems.left) {
                    got.style.background = items[i].style.background;
                    got.src = items[i].firstChild.src;
            }
        }
        setTimeout(() => {
            popup.style.display = 'flex';
        }, 300);
    });
});

close.addEventListener('click', () => {
    popup.style.display = 'none';

    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('anim-slide');
    }
    console.clear();
    setRandomBox();
        
});

function setPercent() {
    const uncommonPercent = 55;
    const commonPercent = 25;
    const rarePercent = 15;
    const epicPercent = 4.5;
    const legendaryPercent = 0.5;
    return [uncommonPercent, commonPercent, rarePercent, epicPercent, legendaryPercent];
}

puncommon.innerHTML = setPercent()[0] + '%';
pcommon.innerHTML = setPercent()[1] + '%';
prare.innerHTML = setPercent()[2] + '%';
pepic.innerHTML = setPercent()[3] + '%';
plegendary.innerHTML = setPercent()[4] + '%';

function getRandomBox() {
    const uncommonPercent = setPercent()[0];
    const commonPercent = setPercent()[1];
    const rarePercent = setPercent()[2];
    const epicPercent = setPercent()[3];
    const legendaryPercent = setPercent()[4];
    const randomNumber = Math.random() * 100;
    if (randomNumber < uncommonPercent) {
        return 'uncommon-box';
    }
    else if (randomNumber < uncommonPercent + commonPercent) {
        return 'common-box';
    }
    else if (randomNumber < uncommonPercent + commonPercent + rarePercent) {
        return 'rare-box';
    }
    else if (randomNumber < uncommonPercent + commonPercent + rarePercent + epicPercent) {
        return 'epic-box';
    }
    else if (randomNumber < uncommonPercent + commonPercent + rarePercent + epicPercent + legendaryPercent) {
        return 'legendary-box';
    }
}

function setRandomBox() {
    let uncommon = 0;
    let common = 0;
    let rare = 0;
    let epic = 0;
    let legendary = 0;

    const uncommonPercent = setPercent()[0];
    const commonPercent = setPercent()[1];
    const rarePercent = setPercent()[2];
    const epicPercent = setPercent()[3];
    const legendaryPercent = setPercent()[4];

    for(let i = 0; i < items.length; i++) {
        const randomBox = getRandomBox();
        if (randomBox === 'uncommon-box' && uncommon <boxcount * uncommonPercent / 100) {
            items[i].firstChild.src = img[0];
            uncommon++;
        }
        else if (randomBox === 'common-box' && common < boxcount * commonPercent / 100) {
            items[i].firstChild.src = img[1];
            common++;
        }
        else if (randomBox === 'rare-box' && rare < boxcount * rarePercent / 100) {
            items[i].firstChild.src = img[2];
            rare++;
        }
        else if (randomBox === 'epic-box' && epic < boxcount * epicPercent / 100) {
            items[i].firstChild.src = img[3];
            epic++;
        }
        else if (randomBox === 'legendary-box' && legendary < boxcount * legendaryPercent / 100) {
            items[i].firstChild.src = img[4];
            legendary++;
        }
        else {
            i--;
        }
    }
}
