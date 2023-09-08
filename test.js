function getRandomBox() {
    const randomNumber = Math.random() * 100;
  
    if (randomNumber < 40) {
      return "กล่องที่ 1";
    } else if (randomNumber < 70) {
      return "กล่องที่ 2";
    } else if (randomNumber < 90) {
      return "กล่องที่ 3";
    } else if (randomNumber < 99) {
      return "กล่องที่ 4";
    } else {
      return "กล่องที่ 5";
    }
  }
  
  // ตัวอย่างการทดสอบการสุ่ม 10 ครั้ง
  const results = {
    "กล่องที่ 1": 0,
    "กล่องที่ 2": 0,
    "กล่องที่ 3": 0,
    "กล่องที่ 4": 0,
    "กล่องที่ 5": 0,
  };
  
  const numberOfTrials = 200; // คุณสามารถเปลี่ยนจำนวนการทดลองตามต้องการ
  
  for (let i = 0; i < numberOfTrials; i++) {
    const randomBox = getRandomBox();
    results[randomBox]++;
  }
  
  console.log("ผลการสุ่มกล่อง:");
  for (const box in results) {
    const percentage = (results[box] / numberOfTrials) * 100;
    console.log(`${box}: ${results[box]} ครั้ง (${percentage.toFixed(2)}%)`);
  }