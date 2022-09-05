document.addEventListener(
	'DOMContentLoaded',
	function () {
		started = false;
		ended = false;
		loadstatus = 'status';
		score = 0;
		cycles = 0;
		time = 0;
		i = 1;

		game = document.getElementById('game');
		start = document.getElementById('start');
		end = document.getElementById('end');
		boundary = document.getElementsByClassName('boundary');
		gameStatus = document.getElementById('status');

		// Listeners
		start.addEventListener('mouseover', startPlaying);

		function startPlaying() {
			if (cycles < 6) {
				time = 60 / i;
				gameStatus.innerHTML = 'cycles ' + cycles + ' started - Score: ' + score;
				gameStatus.style.color = 'rgb(26, 25, 22)';
				started = true;
				ended = true;
				i = cycles + 1;
				timer(time);
				restartBoundary();
			}
		}

		start.addEventListener('click', resetGame);

		function resetGame() {
			gameStatus.innerHTML = 'cycles ' + cycles + ' started - Score: ' + score;
			gameStatus.style.color = 'rgb(26, 25, 22)';
			score = 0;
			cycles = 0;
			restartBoundary();
			ended = false;
		}

		game.addEventListener('mouseleave', mouseLeftTheGame);
		function mouseLeftTheGame() {
			if (started == true) {
				lose();
			}
		}

		end.addEventListener('mouseover', endGame);
		function endGame() {
			if (started == true) {
				score += 5;
				if (cycles < 6) {
					gameStatus.innerHTML = 'You Won cycles ' + cycles + ' - Score: ' + score;
				} else {
					gameStatus.innerHTML = 'Finished! Pleae press S to restart game - Score: ' + score;
				}
				gameStatus.style.color = 'green';
				started = false;
				ended = true;
				cycles++;
			}
		}

		for (let i = 0; i < boundary.length; i++) {
			boundary[i].addEventListener('mouseover', function () {
				if (started == true) {
					lose();
				}
			});
		}


        // helpers

        function restartBoundary() {
            y = -1;
            for (let i = 0; i < boundary.length; i++) {
                if (boundary[i].classList.contains('example')) {
                    y = i;
                } else {
                    continue;
                }
            }
            for (let i = 0; i < boundary.length; i++) {
                boundary[i].style.backgroundColor = boundary[y].style.backgroundColor;
            }
        }

        function highestScore(score){
            localStorage.setItem('HighestScore', JSON.stringify(score));
            // localStorage.getItem('HighestScore');
        }
        
        
        function timer(timeRemianed) {
            statusText = gameStatus.innerHTML;
            var downloadTimer = setInterval(function () {
                if (timeRemianed <= 0) {
                    lose();
                    clearInterval(downloadTimer);
                } else if (started == false || ended == false) {
                    clearInterval(downloadTimer);
                } else {
                    gameStatus.innerHTML = statusText + ' - ' + timeRemianed + ' seconds remaining';
                }
                timeRemianed -= 1;
            }, 1000);
        }

        function lose() {
            score -= 10;
            gameStatus.innerHTML = 'You Lose - Score: ' + score;
            gameStatus.style.color = 'rgb(247, 31, 7)';
            started = false;
            ended = true;
            colorLoserBoundaries();
        }
        
        function colorLoserBoundaries() {
            for (let i = 0; i < boundary.length; i++) {
                y = -1;
                for (let i = 0; i < boundary.length; i++) {
                    if (boundary[i].classList.contains('example')) {
                        y = i;
                    } else {
                        continue;
                    }
                }
                if (i != y) {
                    boundary[i].style.backgroundColor = 'rgb(247, 31, 7)';
                }
            }
        }
	},
	false
);


