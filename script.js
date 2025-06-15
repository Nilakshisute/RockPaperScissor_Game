let userScore = 0;
        let compScore = 0;
        let gamesPlayed = 0;
        
        const choices = document.querySelectorAll(".choice");
        const msg = document.getElementById("msg");
        const userScorePara = document.getElementById("user-score");
        const compScorePara = document.getElementById("comp-score");
        const computerChoiceDiv = document.getElementById("computer-choice");
        const computerChoiceIcon = document.getElementById("computer-choice-icon");
        const gamesPlayedSpan = document.getElementById("games-played");
        const winRateSpan = document.getElementById("win-rate");

        const choiceEmojis = {
            rock: "🪨",
            paper: "📄",
            scissors: "✂️"
        };

        const choiceNames = {
            rock: "Rock",
            paper: "Paper",
            scissors: "Scissors"
        };

        const genCompChoice = () => {
            const options = ["rock", "paper", "scissors"];
            const randIdx = Math.floor(Math.random() * 3);
            return options[randIdx];
        };

        const updateStats = () => {
            gamesPlayedSpan.textContent = gamesPlayed;
            const winRate = gamesPlayed > 0 ? Math.round((userScore / gamesPlayed) * 100) : 0;
            winRateSpan.textContent = winRate + "%";
        };

        const showComputerChoice = (compChoice) => {
            computerChoiceDiv.classList.add("thinking");
            computerChoiceIcon.classList.remove("show");
            
            setTimeout(() => {
                computerChoiceIcon.textContent = choiceEmojis[compChoice];
                computerChoiceIcon.classList.add("show");
                computerChoiceDiv.classList.remove("thinking");
            }, 1000);
        };

        const drawGame = () => {
            msg.textContent = "🤝 It's a tie! Great minds think alike!";
            msg.className = "msg draw";
        };

        const showWinner = (userWin, userChoice, compChoice) => {
            if (userWin) {
                userScore++;
                userScorePara.textContent = userScore;
                msg.textContent = `🎉 You Win! ${choiceNames[userChoice]} beats ${choiceNames[compChoice]}!`;
                msg.className = "msg win";
            } else {
                compScore++;
                compScorePara.textContent = compScore;
                msg.textContent = `😔 You Lost! ${choiceNames[compChoice]} beats ${choiceNames[userChoice]}!`;
                msg.className = "msg lose";
            }
        };

        const playGame = (userChoice) => {
            gamesPlayed++;
            
            // Show computer thinking
            computerChoiceIcon.textContent = "🤔";
            computerChoiceIcon.classList.add("show");
            msg.textContent = "🤖 Computer is thinking...";
            msg.className = "msg default";
            
            // Generate computer choice
            const compChoice = genCompChoice();
            
            // Show computer choice with animation
            showComputerChoice(compChoice);
            
            // Determine winner after animation
            setTimeout(() => {
                if (userChoice === compChoice) {
                    drawGame();
                } else {
                    let userWin = true;
                    if (userChoice === "rock") {
                        userWin = compChoice === "paper" ? false : true;
                    } else if (userChoice === "paper") {
                        userWin = compChoice === "scissors" ? false : true;
                    } else { // scissors
                        userWin = compChoice === "rock" ? false : true;
                    }
                    showWinner(userWin, userChoice, compChoice);
                }
                updateStats();
            }, 1200);
        };

        const resetGame = () => {
            userScore = 0;
            compScore = 0;
            gamesPlayed = 0;
            userScorePara.textContent = "0";
            compScorePara.textContent = "0";
            msg.textContent = "🎯 Choose your weapon to start!";
            msg.className = "msg default";
            computerChoiceIcon.textContent = "❓";
            computerChoiceIcon.classList.remove("show");
            updateStats();
        };

        // Add click events to choices
        choices.forEach((choice) => {
            choice.addEventListener("click", () => {
                const userChoice = choice.getAttribute("data-choice");
                playGame(userChoice);
            });
        });

        // Add hover effects
        choices.forEach((choice) => {
            choice.addEventListener("mouseenter", () => {
                choice.style.transform = "scale(1.1)";
            });
            
            choice.addEventListener("mouseleave", () => {
                choice.style.transform = "scale(1)";
            });
        });

        // Initialize stats
        updateStats();