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

    return {RadiobtnChecked};
})();

const Player = (() => {

    const playbtn = document.querySelector('#play-btn');
    playbtn.addEventListener('click', () => {
        Player.p1 = _createPlayer(document.querySelector('#playername1').value, DOM.RadiobtnChecked[0].value);
        (Player.p1.name === '') ? Player.p1.name = "Player 1" : '' ;
        Player.p2 = _createPlayer(document.querySelector('#playername2').value, DOM.RadiobtnChecked[1].value);
        (Player.p2.name === '') ? Player.p2.name = "Player 2" : '' ;
        console.log(Player);
    })
    
    function _createPlayer(name, icon){
        return {name, icon};
    };

    return {};
})();