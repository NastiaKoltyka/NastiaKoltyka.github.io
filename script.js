$(function () {
    let startedGame=false
    let Time_counter
    $('.block').draggable({
        grid: [100, 100],
        revert: 'invalid',
        start:startGame

    });
    $(".reciever").droppable({
        accept: function(item){
            if(item.hasClass('block') && $(this).attr('block') == ''){
                return true
            }
            return false
        },
        drop: function (event, ui) {
            let result = $(ui.draggable).attr('block')
            $(`.reciever[block='${result}']`).attr('block', '');
            $(this).attr('block', result)
        },
        /* не працює, чому???????
        out : function (event, ui) {
            $(this).attr('block', '')
        },*/
    })
    function random() {
        let blocks = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen']
        blocks.forEach((val, key) => {
            randomIndex = Math.ceil(Math.random() * (key + 1));
            blocks[key] =  blocks[randomIndex];
            blocks[randomIndex] = val;
        });
       
        for( let i=0;  i < blocks.length; i++){
            $('.block').removeClass(blocks[i])
            $('.block').eq(i).addClass(blocks[i])
            $('.block').eq(i).attr('block',blocks[i])

        }
        
    }
    random()
    let check = true
    $('.checkModal').on('click', function () {
        clearInterval(Time_counter);
        let blocks = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen']
        for (let i = 0; i < blocks.length; i++) {
            if ($('.reciever').eq(i).attr('block') != blocks[i]) {
                check = false;
                break

            }
        }
        if (check) {
            $('.text').text(`Woohoo, well done, you did it!`)
            $('.checkModal').addClass('hidden')
        }
        else {
            $('.text').text(`It's a pity, but you lost`)
            $('.checkModal').addClass('hidden')
        }
        $('.check').attr("disabled", true)
        $('.small-time').addClass('hidden')
    })
    function time(seconds) {
        let minutes = `${parseInt(seconds / 60)}`
        let s = `${parseInt(seconds % 60)}`
        if (minutes.length == 1) {
            minutes = `0${minutes}`
        }
        if (s.length == 1) {
            s = `0${s}`
        }
        return (`${minutes}:${s}`)

    }
    let count = 60;
    function startGame() {
        if(startedGame){
            return
        }
        $('.check').attr("disabled", false)
        startedGame=true
        Time_counter = setInterval(timer, 1000);

        function timer() {
            count = count - 1;

            if (count < 0) {
                clearInterval(Time_counter);
                $('.check').attr("disabled", true),
                    $('.wrapperDark').removeClass('hidden')
                $('.modal').css({
                    display: 'flex',
                    left: `${(window.innerWidth - 700) / 2}px`,
                })
                $('.text').text(`It's a pity, but you lost`)
                $('.checkModal').addClass('hidden')
                $('.small-time').addClass('hidden')
                return
            }
            $('.time').text(time(count))
            $('.small-time').text(time(count))
        }
        $('.start').attr("disabled", true)
    }
    $('.start').on('click', startGame)
    $('.closeModal').on('click', function () {
        $('.wrapperDark').addClass('hidden')
        $('.modal').addClass('hidden')
    })
    $('.check').on('click', function () {
        $('.wrapperDark').removeClass('hidden')
        $('.modal').css({
            display: 'flex',
            left: `${(window.innerWidth - 700) / 2}px`,
        })
        $('.text').text(`You still have time, you sure?`)
        $('.checkModal').removeClass('hidden')
        $('.small-time').removeClass('hidden')
    })
    
    $('.newGame').on('click', function () {
        $('.block').css({
            top: '0px',
            left: '0px'
        })
        random()
        $('.start').attr("disabled", false)
        count=60
        $('.time').text(time(count))
        $('.reciever').attr('block','') 
        startedGame=false

    })

})
