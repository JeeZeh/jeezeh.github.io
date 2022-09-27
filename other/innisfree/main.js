var lines = [ /*2*/ "<b>Line 2-3</b><br>And a small cabin build there, of clay and wattles made,<br>Nine bean-rows will I have there, a hive for the honey-bee.",
    /*4*/
    "<b>Line 4</b><br>And live alone in the bee-loud glade",
    /*5*/
    "<b>Line 5-6</b><br>And I shall have some peace there, for peace comes dropping slow,<br>Dropping from the veils of the morning to where the cricket sings",
    /*7*/
    "<b>Line 7-8</b><br>There midnight's all a glimmer, and noon a purple glow,<br>And evening full of the linnet's wings.",
    /*9*/
    "<b>Line 9-10</b><br>I will arise and go now, for always night and day<br>I hear lake water lapping with low sounds by the shore"
];

var descriptions = ["Nature and simplicity are evident in these 2 lines.<br>The word ‘small’ suggest he wants to live alone in peace.",
    "The 4th line completes an ABAB rhyme scheme.",
    "Metaphorical relationship between the notion of peace and nature.<br>The motion symbolises time standing still",
    "Notion of a daydream enhanced by imagery. Purple, hazy, birds...",
    "Yeats is so absorbed in his dream he can hear water that isn’t there. This demonstrates his love for the island."
];

var codes = ["Home",
    "Innisfree",
    "Isolation",
    "Nature",
    "Solitude"
];

var links = ["https://www.shmoop.com/lake-isle-innisfree/home-theme.html",
    "https://www.shmoop.com/lake-isle-innisfree/innisfree-symbol.html",
    "https://www.shmoop.com/lake-isle-innisfree/isolation-theme.html",
    "https://www.shmoop.com/lake-isle-innisfree/nature-imagery.html",
    "https://www.shmoop.com/lake-isle-innisfree/solitude-imagery.html"
]

var sound;

var playing = false;
var wait = true;

function ambiance() {
    ambiance = new Audio('audio\\nature.mp3');
    ambiance.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
    ambiance.volume = 0.6;
    ambiance.play();
}


function playAudio(file) {
    sound = new Audio("audio\\" + file + ".ogg");
    if (!playing) {
        sound.play();
        playing = true;
        sound.onended = () => {
            playing = false;
        };
    }
}

function popup(line) {
    if (!playing) {
        line -= 1;
        document.getElementById('popup').classList.remove("hidden");
        document.getElementById('dimmer').classList.remove("hidden");
        playAudio(line);
        $('#popup-line').html(lines[line]);
        $('#popup-desc').html(descriptions[line]);
        $('#popup-qr-link').empty();
        $('#popup-qr-text').html("Learn more about<br><a href='" + links[line] + "' target='_blank'><b>" + codes[line] + "</b</a>");
        var img = $('<img>');
        img.attr("src", "qr/" + line + ".png");
        img.attr("class", "qr");
        $('#popup-qr-link').attr("href", links[line]);
        img.appendTo('#popup-qr-link');
    }
}

function closePopup() {
    document.getElementById('popup').classList.add("hidden");
    document.getElementById('dimmer').classList.add("hidden");
    sound.pause();
    sound.currentTime = 0;
    playing = false;
}

$(document).ready(function () {
    $("#start-button").click(() => {
        $("#start-button").css("cursor", "context-menu");
        $("#start-button").off();
        $('#heart').fadeOut(16);
        $('#intro').fadeOut(6000);
        $('#refresh').removeClass("hidden");
        $('#refresh').fadeOut(1);
        playAudio("intro");
        setTimeout(() => {
            $('#refresh').fadeIn(2000);

            $('#heart').delay(2000).fadeIn(4000);

            setTimeout(() => {
                $('#heart').addClass("pulsate");
                wait = false;
            }, 5750);
        }, 5000);
    });

    $("#heart").click(() => {
        if (!wait && !playing) {
            $('#pavements').fadeOut(6000);
            $('#heart').fadeOut(2500);
            $('#guide').fadeOut(6000);
            playAudio("entry");
            setTimeout(() => {
                ambiance();
            }, 1000);
        }
    });

    $('#dimmer').click(() => {
        closePopup();
    });

    $("#hut").click(() => {
        popup(1);
    });

    $("#bees").click(() => {
        popup(2);
    });

    $("#dew").click(() => {
        popup(3);
    });

    $("#linnets").click(() => {
        popup(4);
    });

    $("#water-effects").click(() => {
        popup(5);
    });

});