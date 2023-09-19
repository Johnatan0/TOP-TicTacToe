const DOM = (() => {
    let RadiobtnChecked = document.querySelectorAll('input[type="radio"]:checked');
    const _radiobtn = document.querySelectorAll('input[type="radio"]');
    const _player1Select = document.querySelectorAll('#player-select1');
    const _player2select = document.querySelectorAll('#player-select2');

    const _toggledm = document.querySelectorAll('.toggle-dm');
    const playbtn = document.querySelector('#play-btn');

    _toggledm.forEach(btn => btn.addEventListener('click', () => document.documentElement.classList.toggle('dark-mode')));
    _radiobtn.forEach(btn => btn.addEventListener('input', _iconChecker));

    function _iconChecker(){
        if(this.name == 'player1-select'){
            if(_player1Select[0].checked) {
                _player2select[1].checked = true;
            }
            if(_player1Select[1].checked) {
                _player2select[0].checked = true;
            };
        }
        if(this.name == 'player2-select'){
            if(_player2select[0].checked){
                _player1Select[1].checked = true;
            }
            if(_player2select[1].checked){
                _player1Select[0].checked = true;
            }
        }
        DOM.RadiobtnChecked = document.querySelectorAll('input[type="radio"]:checked');
    };

    function shake() {
        document.querySelector('.grid').classList.add('shake');

        setTimeout(() => document.querySelector('.grid').classList.remove('shake'), 150);
    }

    return {RadiobtnChecked, shake};
})();

const Player = (function(){

    function _createPlayer(name, icon, points){
        return {name, icon, points};
    };

    const _playbtn = document.querySelector('#play-btn');
    const playername = document.querySelectorAll('.player-name');
    _playbtn.addEventListener('click', () => { 
        
        Player.p1 = _createPlayer(document.querySelector('#playername1').value, DOM.RadiobtnChecked[0].value, 0);
        if(Player.p1.name === '') Player.p1.name = "Player 1";
        playername[0].textContent = Player.p1.name;
        
        Player.p2 = _createPlayer(document.querySelector('#playername2').value, DOM.RadiobtnChecked[1].value, 0);
        if(Player.p2.name === '') Player.p2.name = "Player 2";
        playername[1].textContent = Player.p2.name;
        
        document.querySelector('dialog').classList.add('close');
        
        (Player.p1.icon === 'x') ? Player.Selected = Player.p1 : Player.Selected = Player.p2;

        Player.switchPlayer = switchPlayer;
    });



    function switchPlayer() {
        (Player.Selected.name === Player.p1.name) ? Player.Selected = Player.p2 : Player.Selected = Player.p1;

        if(Player.Selected.icon === 'x'){
            document.querySelector('.player-turn').textContent = Player.Selected.name + ' TURN!'
            document.querySelector('.turn').classList.remove('filled-o');
            document.querySelector('.turn').classList.add('filled-x');
            document.querySelector('.grid').classList.add('icon-x');
            document.querySelector('.grid').classList.remove('icon-o');
        } else {
            document.querySelector('.player-turn').textContent = Player.Selected.name + ' TURN!'
            document.querySelector('.grid').classList.remove('filled-x');
            document.querySelector('.turn').classList.add('filled-o');
            document.querySelector('.grid').classList.add('icon-o');
            document.querySelector('.grid').classList.remove('icon-x')
        }
    }

    return {switchPlayer}
})();

const Gb = (function() {
    
    const board = ['null', 'null', 'null',
                   'null', 'null', 'null',
                   'null', 'null', 'null',];

    let _boardFull = false;
    
    const _slot = document.querySelectorAll('section');
    _slot.forEach(slot => slot.addEventListener('click', _fillBoard));
    
    function _updateBoard() {
        for(let i=0; i < 9; i++){
            if(board[i] === 'null') _slot[i].removeAttribute('class'); 
            if(board[i] === 'x') _slot[i].classList.add('filled-x'); 
            if(board[i] === 'o') _slot[i].classList.add('filled-o');
        };
    }

    function _fillBoard() {
        if(this.classList.value) return DOM.shake();
        if(!this.classList.value){
            board[this.dataset.pos] = Player.Selected.icon;
            _checkVictory();
            checkTie();
            Player.switchPlayer();
            _updateBoard();
        };
    }

    const resetbtn = document.querySelector('.reset-btn');
    resetbtn.addEventListener('click', _resetPoints)

    function _resetPoints(){
        for(let i=0; i<9; i++){board[i] = 'null'};

        Player.p1.points = 0;
        Player.p2.points = 0;

        document.querySelectorAll('.score')[0].textContent = Player.p1.points;
        document.querySelectorAll('.score')[1].textContent = Player.p2.points;

        (Player.p1.icon === 'x') ? Player.Selected = Player.p1 : Player.Selected = Player.p2;
        document.querySelector('.grid').classList.remove('close');
        document.querySelector('h5').classList.add('close');
        document.querySelector('.player-turn').textContent = Player.Selected.name + ' TURN!'
        document.querySelector('.turn').classList.remove('filled-o');
        document.querySelector('.turn').classList.add('filled-x');
        document.querySelector('.grid').classList.add('icon-x');
        document.querySelector('.grid').classList.remove('icon-o');
        document.querySelector('.turn-board').classList.remove('close');
        _updateBoard();
    }

    function _reset() {
        for(let i=0; i<9; i++){board[i] = 'null'};
        (Player.p1.icon === 'x') ? Player.Selected = Player.p1 : Player.Selected = Player.p2;
        document.querySelector('.player-turn').textContent = Player.Selected.name + ' TURN!'
        document.querySelector('.turn').classList.remove('filled-o');
        document.querySelector('.grid').classList.remove('icon-o');
        _boardFull = false;
        _updateBoard();
    };

    function checkTie() {
        for(let i=0; i < 9; i++){
            if(board[i] === "null" || _boardFull === true){
                return false;
            }
        }
        
        document.querySelector('.tie').classList.remove('close'); 
        setTimeout(() => document.querySelector('.tie').classList.add('tie-animation'), 10);
        setTimeout(() => document.querySelector('.tie').classList.remove('tie-animation'), 500);
        setTimeout(() => document.querySelector('.tie').classList.add('close'), 1000)
        setTimeout(() => _slot.forEach(slot => slot.classList.add('fade')), 1000)
        setTimeout(() => _reset(), 2000)
    }

    function _checkVictory(){

        const score = document.querySelectorAll('.score')
        let boardCheck = (a, b, c) => board[a] === board[b] && board[b] === board[c] && board[a] != 'null';

        function validateVictory(){
            _boardFull = true;

            (Player.Selected.name === Player.p1.name) ? Player.p1.points = ++Player.p1.points : Player.p2.points = ++Player.p2.points;
            document.querySelector('.grid').classList.add('event-disable');
            document.querySelector('body').classList.add('no-cursor');
            setTimeout(() => document.querySelector('body').classList.remove('no-cursor'), 3000);
            setTimeout(() => document.querySelector('.grid').classList.remove('event-disable'), 3000);
            setTimeout(_reset, 3000);

            score[0].textContent = Player.p1.points;
            score[1].textContent = Player.p2.points;
        }

        function matchColor(a, b, c){
            setTimeout(() => _slot[a].classList.add('match'), 100)
            setTimeout(() => _slot[b].classList.add('match'), 400)
            setTimeout(() => _slot[c].classList.add('match'), 700)

            setTimeout(() => _slot.forEach(slot => slot.classList.add('fade')), 2000)
        }

        //Horizontal Lines
        if(boardCheck(0, 1, 2)) {validateVictory(); matchColor(0,1,2)};
        if(boardCheck(3, 4, 5)) {validateVictory(); matchColor(3,4,5)}
        if(boardCheck(6, 7, 8)) {validateVictory(); matchColor(6,7,8)}

        //Vertical Lines
        if(boardCheck(0, 3, 6)) {validateVictory(); matchColor(0,3,6)}
        if(boardCheck(1, 4, 7)) {validateVictory(); matchColor(1,4,7)}
        if(boardCheck(2, 5, 8)) {validateVictory(); matchColor(2,5,8)}

        //Diagonal Lines
        if(boardCheck(0, 4, 8)) {validateVictory(); matchColor(0,4,8)}
        if(boardCheck(2, 4, 6)) {validateVictory(); matchColor(2,4,6)}


        if(Player.p1.points > 3) {
            setTimeout(() => {
            document.querySelector('.grid').classList.add('close');
            document.querySelector('h5').classList.remove('close');
            document.querySelector('.turn-board').classList.add('close');
            document.querySelector('h5').textContent = Player.p1.name + " won the match! 🎉🎉"
            }, 2500);
        }

        if(Player.p2.points > 3) {
            setTimeout(() => {
            document.querySelector('.grid').classList.add('close');
            document.querySelector('h5').classList.remove('close');
            document.querySelector('.turn-board').classList.add('close');
            document.querySelector('h5').textContent = Player.p2.name + " won the match! 🎉🎉"
            }, 2000);
            
        }
    }
})();


