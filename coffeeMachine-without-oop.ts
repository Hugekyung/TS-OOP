// * 절차지향 프로그래밍으로 커피머신 기계 만들기
// * 에스프레소를 내리는 기계
function main(beans: string) {
  const water = 'water';
  const hotWater = getHotWater(water);
  const cup = getEspressoCup();
  const espressoShot = getShots(beans, hotWater);
  const espresso = getEspresso(cup, espressoShot);

  return espresso;
}

// * 뜨거운 물
function getHotWater(water: string) {
  const hotWater = 'hot' + water;
  return hotWater;
}

// * 에스프레소 컵 준비
function getEspressoCup() {
  const cup = 'espressoCup';
  return cup;
}

// * 샷 1개
function getShots(beans: string, hotWater: string) {
  const espressoShot = `${beans} + ${hotWater}`;
  return espressoShot;
}

// * 에스프레소
function getEspresso(cup: string, espressoShot: string) {
  return `${cup} with ${espressoShot}`;
}

const columbiaEspresso = main('columbia beans');
console.log(columbiaEspresso);

const ganaEspresso = main('gana beans');
console.log(ganaEspresso);
