const open = document.querySelector('.open');
const close = document.querySelector('.close');
const popup = document.querySelector('.pop-up');
const slide = document.querySelector('.slide');
const got = document.querySelector('.got-it');
const middle = document.querySelector('.middle');
const itemimg = document.querySelector('.item-img');

const img = [
    'assets/uncommon-box.png',
    'assets/common-box.png',
    'assets/rare-box.png',
    'assets/epic-box.png',
    'assets/legendary-box.png',
]

// create items
for(let i = 0; i < 200; i++) {
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
    console.clear();
    setRandomBox();
        
});

function getRandomBox() {
    const randomNumber = Math.random() * 100;
    // 40%
    if (randomNumber <= 40) {
        return "uncommon-box";
    } 
    // 30%
    else if (randomNumber <= 70) {
        return "common-box";
    } 
    // 20%
    else if (randomNumber <= 90) {
        return "rare-box";
    } 
    // 9%
    else if (randomNumber <= 99) {
        return "epic-box";
    } 
    // 1%
    else {
        return "legendary-box";
    }
}

function setRandomBox() {
    for(let i = 0; i < items.length; i++) {
        const randomBox = getRandomBox();
        if (randomBox == 'uncommon-box') {
            items[i].firstChild.src = img[0];
        }
        else if (randomBox == 'common-box') {
            items[i].firstChild.src = img[1];
        }
        else if (randomBox == 'rare-box') {
            items[i].firstChild.src = img[2];
        }
        else if (randomBox == 'epic-box') {
            items[i].firstChild.src = img[3];
        }
        else if (randomBox == 'legendary-box') {
            items[i].firstChild.src = img[4];
        }
    }
    // show result of randombox
    const results = {
        "uncommon-box": 0,
        "common-box": 0,
        "rare-box": 0,
        "epic-box": 0,
        "legendary-box": 0,
      };
    
    const randomBoxCount = items.length;
  
    for (let i = 0; i < randomBoxCount; i++) {
      const randomBox = getRandomBox();
      results[randomBox]++;
    }
  
    for (const box in results) {
      const percentage = (results[box] / randomBoxCount) * 100;
      console.log(`${box}: ${results[box]} กล่อง (${percentage.toFixed(2)}%)`);
    }
}
