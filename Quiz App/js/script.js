const intro = document.querySelector(".intro");
const start_btn = document.querySelector(".intro .buttons .start");
const rule_btn = document.querySelector(".intro .buttons .rule");
const quiz = document.querySelector(".quiz_box");
const timeCount = quiz.querySelector(".timer .timer_sec");
const timeLine = quiz.querySelector("header .time_line");
const timeOff = quiz.querySelector("header .time_txt");

const option_list = document.querySelector(".option_list");
const resultBox = document.querySelector(".result_box");
const restartQuiz = resultBox.querySelector(".buttons .restart");

start_btn.onclick = ()=>{
    intro.classList.add("removeItem");
    quiz.classList.remove("removeItem");
    quiz.classList.add("activeInfo");

    showQuestion(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz.querySelector(".next_btn");
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestion(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time Left";
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Question Completed");
        showResultBox();
    }

}

restartQuiz.onclick = () => {
    window.location.reload();
}

function showQuestion(index){
    const queText = document.querySelector(".que_text");
    
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    queText.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correct = questions[que_count].answer;
    let allOption = option_list.children.length;
    if(userAns == correct){
        userScore += 1;
        answer.classList.add("correct");
        console.log("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }
    else{
        answer.classList.add("incorrect");
        console.log("Wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        for(let i = 0; i < allOption; i++){
            if(option_list.children[i].textContent == correct){
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    for(let i = 0; i < allOption; i++){
        option_list.children[i].classList.add("dis");
    }
    next_btn.style.display = "block";
}

function showResultBox(){
    quiz.classList.remove("activeInfo");
    quiz.classList.add("removeItem");
    resultBox.classList.remove("removeItem");
    resultBox.classList.add("activeInfo");

    const scoreText = resultBox.querySelector(".score_text");
    if (userScore > 3){
        let scoreTag = '<span>and congrats!, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer,1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";

            let allOption = option_list.children.length;
            let correcAns = questions[que_count].answer;

            for(let i = 0; i < allOption; i++){
                if(option_list.children[i].textContent == correcAns){
                    option_list.children[i].setAttribute("class","option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for(let i = 0; i < allOption; i++){
                option_list.children[i].classList.add("dis");
            }
            next_btn.style.display = "block";
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 34);
    function timer(){
        time += 3;
        timeLine.style.width = time + "px";
        if(time > 1363){
            clearInterval(counterLine);
        }
    }
}

function queCounter(index){
    const bottom_ques_counter = quiz.querySelector(".total_que");
    let totalQuesCounting = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCounting;
}

