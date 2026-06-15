import imgCarCar from "../images/AccidentTypes/car.png";
import imgCarPed from "../images/AccidentTypes/pedestrian.png";
import imgCarMoto from "../images/AccidentTypes/motorcycle.png";
import imgCarBicycle from "../images/AccidentTypes/bicycle.png";
import imgSingle from "../images/AccidentTypes/single.png";
import imgEtc from "../images/AccidentTypes/etc.png";

export const ACCIDENT_TYPES = [
  {
    id: "car-to-car",
    num: "01",
    title: "차량 대 차량",
    desc: "자동차와 자동차 간의 사고",
    bgImage: imgCarCar
  },
  {
    id: "car-to-pedestrian",
    num: "02",
    title: "차량 대 보행자",
    desc: "자동차와 보행자 간의 사고",
    bgImage: imgCarPed
  },
  {
    id: "car-to-motorcycle",
    num: "03",
    title: "차량 대 이륜차",
    desc: "자동차와 이륜차(오토바이) 간의 사고",
    bgImage: imgCarMoto
  },
  {
    id: "car-to-bicycle",
    num: "04",
    title: "차량 대 자전거",
    desc: "자동차와 자전거 간의 사고",
    bgImage: imgCarBicycle
  },
  {
    id: "single-accident",
    num: "05",
    title: "단독사고",
    desc: "차량 단독 사고 (전복, 추돌, 시설물 충돌 등)",
    bgImage: imgSingle
  },
  {
    id: "etc-accident",
    num: "06",
    title: "기타사고",
    desc: "위 유형에 해당되지 않는 기타 사고",
    bgImage: imgEtc
  },
];
