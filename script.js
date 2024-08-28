const btn = document.querySelectorAll(".button");
const num = document.querySelectorAll(".number");
const display = document.getElementById("result");
const point = document.querySelector(".point");
const clear = document.querySelector(".clear");
const oper = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
let operNo = 0; //연산자 없는 상태
let operator, firstOperand, secondOperand, result;

//숫자 디스플레이에 출력하기
num.forEach((element) => {
  element.addEventListener("click", function (e) {
    //display 넘치지 않게 숫자 출력
    if (display.innerText.length > 10) return;
    //display에 0만 있으면 0 지우고 출력
    if (display.innerText === "0") {
      display.innerText = e.target.innerText;
    } else {
      if (operNo === 1) {
        //1이면 연산자를 눌렀기 때문에 새로운 숫자 입력받음
        display.innerText = e.target.innerText;
        operNo = 0;
      } else {
        //0이면 연산자가 없기 때문에 숫자가 이어서 써짐
        display.innerText += e.target.innerText;
      }
    }
  });
});

//소수점 기능
point.addEventListener("click", function (e) {
  if (display.innerText.includes(".") === false) {
    display.innerText += e.target.innerText;
  }
});

//clear 기능
clear.addEventListener("click", function (e) {
  location.reload(true); //새로고침
});

//계산 함수
const calculate = function (firstnum, operator, secondnum) {
  result = eval(`${firstnum} ${operator} ${secondnum}`);

  display.innerText = result;
  operNo = 1; //계산이 끝나고 다시 숫자를 누를 경우 화면 초기화를 위함

  //콘솔 확인 코드
  console.log(`firstnum: ${firstnum}`);
  console.log(`operator: ${operator}`);
  console.log(`secondnum: ${secondnum}`);
  console.log(`result: ${result}`);
};

//계산 기능(좌항과 연산자 저장)
oper.forEach((element) => {
  element.addEventListener("click", function (e) {
    if (operator === undefined || firstOperand === undefined) {
      firstOperand = display.innerText;
      operator = e.target.innerText;
    } else {
      firstOperand = result;
      secondOperand = display.innerText;
      calculate(firstOperand, operator, secondOperand);
      operator = e.target.innerText;
    }
    operNo = 1; //연산자 클릭 확인 용도(연산자 누른 상태로 바꿈)
  });
});

//'=' 클릭 시 계산 함수 호출하여 결과 출력
equal.addEventListener("click", function (e) {
  secondOperand = display.innerText;
  calculate(firstOperand, operator, secondOperand);
  firstOperand = undefined;
});
