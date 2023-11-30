const random = document.querySelector('.random');
const close = document.querySelector('.close');
const popup = document.querySelector('.pop-up');
const slide = document.querySelector('.slide');
const got = document.querySelector('.got-it');
const middle = document.querySelector('.middle');
const itemimg = document.querySelector('.item-img');
const container = document.querySelector('.container');
const headertext = document.querySelector('.header-text');
const imgpercent = document.querySelectorAll('.img-percent');
const context = document.querySelectorAll('.context');

// percent show in website
const pcommon = document.querySelector('.p-common');
const puncommon = document.querySelector('.p-uncommon');
const prare = document.querySelector('.p-rare');
const pepic = document.querySelector('.p-epic');
const plegendary = document.querySelector('.p-legendary');

const img = [
    'assets/common-box.png',
    'assets/uncommon-box.png',
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


random.addEventListener('click', () => {
    const audio = new Audio('assets/sound/case-opening.mp3');
    audio.play();
    random.disabled = true;
    setTimeout(() => {
        random.disabled = false;
    }, 7500); 
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
            container.style.filter = 'blur(10px)';
            headertext.style.filter = 'blur(10px)';
            random.style.filter = 'blur(10px)';
        }, 300);
    });
});

close.addEventListener('click', () => {
    popup.style.display = 'none';
    container.style.filter = 'blur(0px)';
    headertext.style.filter = 'blur(0px)';
    random.style.filter = 'blur(0px)';

    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('anim-slide');
    }
    console.clear();
    setRandomBox();
        
});

// if hover context[i] then show context[i]
for (let i = 0; i < imgpercent.length; i++) {
    imgpercent[i].addEventListener('mouseover', () => {
        context[i].style.display = 'flex';
        context[i].classList.add('anim-context');
    });

    imgpercent[i].addEventListener('mouseout', () => {
        context[i].classList.remove('anim-context');
        context[i].classList.add('anim-context-down');
        setTimeout(() => {
            context[i].style.display = 'none';
            context[i].classList.remove('anim-context-down');
        }, 200);
    });
}

function setPercent() {
    const commonPercent = 55;
    const uncommonPercent = 25;
    const rarePercent = 15;
    const epicPercent = 4.5;
    const legendaryPercent = 0.5;
    return [commonPercent, uncommonPercent, rarePercent, epicPercent, legendaryPercent];
}

pcommon.innerHTML = setPercent()[0] + '%';
puncommon.innerHTML = setPercent()[1] + '%';
prare.innerHTML = setPercent()[2] + '%';
pepic.innerHTML = setPercent()[3] + '%';
plegendary.innerHTML = setPercent()[4] + '%';

function getRandomBox() {
    const commonPercent = setPercent()[0];
    const uncommonPercent = setPercent()[1];
    const rarePercent = setPercent()[2];
    const epicPercent = setPercent()[3];
    const legendaryPercent = setPercent()[4];
    const randomNumber = Math.random() * 100;
    if (randomNumber < commonPercent) {
        return 'common-box';
    }
    else if (randomNumber < commonPercent + uncommonPercent) {
        return 'uncommon-box';
    }
    else if (randomNumber < commonPercent + uncommonPercent + rarePercent) {
        return 'rare-box';
    }
    else if (randomNumber < commonPercent + uncommonPercent + rarePercent + epicPercent) {
        return 'epic-box';
    }
    else if (randomNumber < commonPercent + uncommonPercent + rarePercent + epicPercent + legendaryPercent) {
        return 'legendary-box';
    }
    
}

function setRandomBox() {
    let common = 0;
    let uncommon = 0;
    let rare = 0;
    let epic = 0;
    let legendary = 0;

    const commonPercent = setPercent()[0];
    const uncommonPercent = setPercent()[1];
    const rarePercent = setPercent()[2];
    const epicPercent = setPercent()[3];
    const legendaryPercent = setPercent()[4];

    for(let i = 0; i < items.length; i++) {
        const randomBox = getRandomBox();
        if (randomBox === 'common-box' && common <boxcount * commonPercent / 100) {
            items[i].firstChild.src = img[0];
            common++;
        }
        else if (randomBox === 'uncommon-box' && uncommon < boxcount * uncommonPercent / 100) {
            items[i].firstChild.src = img[1];
            uncommon++;
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
    // check box
    console.log(`common box: ${common} (${commonPercent}%)`);
    console.log(`uncommon box: ${uncommon} (${uncommonPercent}%)`);
    console.log(`rare box: ${rare} (${rarePercent}%)`);
    console.log(`epic box: ${epic} (${epicPercent}%)`);
    console.log(`legendary box: ${legendary} (${legendaryPercent}%)`);
    console.log(`total box: ${boxcount} (100%)`);
}