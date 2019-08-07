import http from "k6/http";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default function () {
  http.get(`http://localhost:4022/api/${getRandomInt(1, 10000000)}/images`);
};
