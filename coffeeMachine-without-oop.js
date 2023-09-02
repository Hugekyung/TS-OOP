// * 절차지향 프로그래밍으로 커피머신 기계 만들기
// * 에스프레소를 내리는 기계
function main(beans) {
    var water = 'water';
    var hotWater = getHotWater(water);
    var cup = getEspressoCup();
    var espressoShot = getShots(beans, hotWater);
    var espresso = getEspresso(cup, espressoShot);
    return espresso;
}
// * 뜨거운 물
function getHotWater(water) {
    var hotWater = 'hot' + water;
    return hotWater;
}
// * 에스프레소 컵 준비
function getEspressoCup() {
    var cup = 'espressoCup';
    return cup;
}
// * 샷 1개
function getShots(beans, hotWater) {
    var espressoShot = "".concat(beans, " + ").concat(hotWater);
    return espressoShot;
}
// * 에스프레소
function getEspresso(cup, espressoShot) {
    return "".concat(cup, " with ").concat(espressoShot);
}
var columbiaEspresso = main('columbia beans');
console.log(columbiaEspresso);
var ganaEspresso = main('gana beans');
console.log(ganaEspresso);
