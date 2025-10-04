//Data Structures involved:
//List - [""]

//Dictionary - keeps data in key-value pairs
/*  {


    }
*/

const database1 = [
    {
        question : "How many villagers are there in animal crossing new horizons?",
        options : ["423 villagers", "413 villagers", "444 villagers", "435 villagers"],
        answer : "413 villagers"
    },

    {
        question : "When was the first pokemon game made?",
        options : ["February 27, 1996", "February 27, 1986", "March 27, 1996", "February 17, 1996"],
        answer : "February 27, 1996"
    },

    {
        question : "What free minecraft content can you get if you purchase the nintendo switch version?",
        options : ["Super Mario Mash-up Pack", "Adventure Time Mash-up", "Furniture+", "The Ultimate Animal Mash-Up"],
        answer : "Super Mario Mash-up Pack"
    },

    {
        question : "When was the nintendo switch officially released worldwide?",
        options : ["March 3, 2016", "March 3, 2017", "March 4, 2017", "July 3, 2017"],
        answer : "March 3, 2017"
    },

    {
        question : "What did Nintendo sell before it started selling video games?",
        options : ["hanafuda playing cards", "poker cards", "pokemon plushies", "pokemon minifigures"],
        answer : "hanafuda playing cards"
    },
];

const DropDown = document.getElementById("drop-down-menu");
const StartButton = document.getElementById("start-btn");
const TimerLabel = document.getElementById("timer-label");
const QuestionLabel = document.getElementById("question");
const OptionContainer = document.getElementById("option-container");
const ScoreLabel = document.getElementById("Score-label");
const FeedbackLabel = document.getElementById("Feedback-label");
const ProgressBar = document.getElementById("progress-bar-fill");
const BgmSelector = document.getElementById("BGM-selector");
const MusicBtn = document.getElementById("music-btn");

let Currentsong = null;
let IsMusicPlaying = false;
MusicBtn.textContent = "🔇Music Off";

//on bgm dropdown change
BgmSelector.addEventListener("change", () => {
    const SelectedSong = BgmSelector.value;

    // quit the function if the song cannot be found
    if(!SelectedSong) return;

    // stop and reset previous song if it's being played
    if(Currentsong)
    {
        Currentsong.pause();
        Currentsong.currentTime = 0;
    }

    // load and play the newly selected song
    Currentsong = new Audio(SelectedSong);
    Currentsong.loop = true
    Currentsong.volume = 0.2
    Currentsong.play()
    IsMusicPlaying = true
    MusicBtn.textContent = "🔈 Music On"
});

MusicBtn.addEventListener("click", () => {
    if(IsMusicPlaying)
    {
        Currentsong.pause();
        MusicBtn.textContent = "🔇Music Off";
        IsMusicPlaying = false;
    } else
    {
        Currentsong.play();
         MusicBtn.textContent = "🔈 Music On";
         IsMusicPlaying = true
    }
    
});

























StartButton.addEventListener('click', StartQuiz)

let timer;
let question_index = 0;
let score = 0;

function StartQuiz()
{
    DropDown.style.display = 'none';
    StartButton.style.display ='none';
    LoadQuestion();
}


function LoadQuestion()
{
    if (question_index < database1.length)
    {

        // reset the timer
        TimerLabel.textContent = 15

        // clear feedback label text
        FeedbackLabel.textContent = "";

        // adjust progress bar's width
        ProgressBar.style.width = `${((question_index + 1) / database1.length) * 100}%`;

        //load a question from the database
        const CurrentQuestionSet = database1[question_index];

        QuestionLabel.textContent =CurrentQuestionSet.question;

        //erase all previous option buttons
        OptionContainer.innerHTML = '';

        //create a button for each option associated to a question
        CurrentQuestionSet.options.forEach((item) => {
            const button = document.createElement('button');
            button.textContent = item;
            button.classList.add('option-button');
            OptionContainer.appendChild(button);

            button.addEventListener('click', () => {
                DisableAllOptionButtons();
                CheckAnswer(item);
            });
        });

        // turn on the timer
        timer = setInterval(() =>{
        // reduce timer text by 1
        TimerLabel.textContent = parseInt(TimerLabel.textContent) - 1;

            if(parseInt(TimerLabel.textContent) === 0 )
            {
                clearInterval(timer);// to turn off the timer
                ShowFeedback(null);
            }
        }, 1000);
    } else 
    {
        EndQuiz()
    }
}


function EndQuiz()
{
    clearInterval(timer)
    QuestionLabel.textContent = "HOORAY! Quiz has ended!";
    OptionContainer.style.display = 'none';
    FeedbackLabel.style.display = 'none';
    TimerLabel.textContent = '🏆'
}


function DisableAllOptionButtons()
{
    //batch select all option button out there
    const all_option_buttons = document.querySelectorAll('.option-button');


    all_option_buttons.forEach(button => {
        button.disabled = true;
    })
}

// 'item' refers to the player selected option
function CheckAnswer(item)
{
    const actul_ans = database1[question_index].answer

    if(item === actul_ans)
    {
        score = score + 1;
    }

    ScoreLabel.textContent = `You scored ${score} points!`;
    clearInterval(timer);
    ShowFeedback(item);
}

function ShowFeedback(item)
{
    const CurrentQuestionSet = database1[question_index];
    let message = "";

    if(item === CurrentQuestionSet.answer)
    {
        message = "Correct! 1 point goes to you.";

    } else if (item === null)
    {
        message = "Time's up!";

    } else 
    {
        message = `Incorrect! The correct answer was ${CurrentQuestionSet.answer}.`;
    }

    FeedbackLabel.textContent = message + " Please wait for 5 seconds.";

    //hold for 22 seconds
    setTimeout(() => {
        question_index = question_index + 1;
        LoadQuestion();
    }, 5000);

}