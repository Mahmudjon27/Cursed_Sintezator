let target_note_id = ""
let mus_ins = "piano"
let stop_play = false
let btn_changeIns = document.getElementById("btn_changeIns")
let menu_full = document.getElementById("menu_full")
let menu_h_val = "500px"
let open_redactor = document.getElementById("open_redactor")
let redactor_open = "closed"

let pitch_range = document.getElementById("pitch_range")
let pitch_value = 1
let picth_range_text = document.getElementById("picth_range_text")


let dur_time = 0
let is_redact = false
let makeMelBtn = document.getElementById("makeMelBtn")

let l_keys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "z", "x", "c", "v", "b", "n", "m", "2", "3", "5", "6", "7", "9", "0", "s", "d", "f", "h", "j"]


// m -- mode     n -- note      d -- duration     p -- pitch
melody_list1 = []

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('keydown', function(event) {
    if (event.key.length == 1 && l_keys.includes(event.key)) {
        // console.log(event.key)
        clc_note_snd = new Audio(`sounds/${mus_ins}/${event.key}.mp3`);
        clc_note_snd.play();

        clc_note_snd.playbackRate = pitch_value;

        if(is_redact==true){
            melody_list1.push(`d${dur_time/1000}`)
            dur_time=0
            melody_list1.push(`n${event.key}`)
            // console.log(melody_list1)
        }
        

        target_note_id = document.getElementById("button_" + event.key)
        if(target_note_id.className=="majorkey"){
            target_note_id.style.backgroundColor = 'lightgray';
            target_note_id.style.borderBottom = '1px solid black';
        }
        else if(target_note_id.className=="minorkey"){
            target_note_id.style.backgroundColor = 'gray';
            target_note_id.style.borderBottom = '1px solid black';
        }
        // console.log(`${event.key} tugmasi bosildi!`)

    }
});

document.addEventListener('keyup', function(event) {
    if (event.key.length == 1 && l_keys.includes(event.key)) {

        
        target_note_id = document.getElementById("button_" + event.key)
        
        if(target_note_id.className=="majorkey"){
            target_note_id.style.backgroundColor = 'white';
            target_note_id.style.borderBottom = '10px solid #242424';
        }
        else if(target_note_id.className=="minorkey"){
            target_note_id.style.backgroundColor = 'black';
            target_note_id.style.borderBottom = '10px solid lightgray';
        }
        // console.log(`${event.key} tugmasi qo'yib yuborilindi!`)
    }

    
});

function playClcSnd() {

    
    target_note_id = event.target.id;

    
    clc_note_snd = new Audio(`sounds/${mus_ins}/${target_note_id[target_note_id.length-1]}.mp3`);
    console.log(target_note_id[target_note_id.length-1])
    clc_note_snd.play()
    clc_note_snd.playbackRate = pitch_value;


    if(is_redact==true){
        melody_list1.push(`d${dur_time/1000}`)
        dur_time=0
        melody_list1.push(`n${target_note_id[target_note_id.length-1]}`)
        // console.log(melody_list1)
    }

}

function changeIns() {
    if(mus_ins=="piano"){
        mus_ins = "sintezator"
    } else if(mus_ins=="sintezator"){
        mus_ins =  "piano"
    }

    if(is_redact==true){
        melody_list1.push(`m${mus_ins}`)
    }

    btn_changeIns.innerHTML = `Mode: ${mus_ins}`
}

function openRedactor() {
    if(redactor_open=="closed"){
        redactor_open="open"
        menu_full.style.height = menu_h_val
    } else if(redactor_open=="open"){
        redactor_open="closed"
        menu_full.style.height = 0
    }

    open_redactor.innerHTML = `Redactor: ${redactor_open}`
}

function changePitch() {
    pitch_value = pitch_range.value;
    picth_range_text.innerHTML = pitch_range.value;

    if(is_redact==true){
        melody_list1.push(`p${pitch_range.value}`)
    }
}


function KeyAnimateOn() {
    majorkeys_res = document.querySelectorAll('.majorkey');
    minorkeys_res = document.querySelectorAll('.minorkey');

    majorkeys_res.forEach(major => {
        // Пример операции: изменение цвета текста на красный
        major.style.backgroundColor = 'white';
        major.style.borderBottom = '10px solid #242424';
    });

    minorkeys_res.forEach(minor => {
        // Пример операции: изменение цвета текста на красный
        minor.style.backgroundColor = 'black';
        minor.style.borderBottom = '10px solid lightgray';
    });

    target_note_id = document.getElementById("button_" + step[1])
    if(target_note_id.className=="majorkey"){
        target_note_id.style.backgroundColor = 'lightgray';
        target_note_id.style.borderBottom = '1px solid black';

        sleep(200).then(() => {
            console.log("major!")
            target_note_id.style.backgroundColor = 'white';
            target_note_id.style.borderBottom = '10px solid #242424';
        })

    }
    else if(target_note_id.className=="minorkey"){
        target_note_id.style.backgroundColor = 'gray';
        target_note_id.style.borderBottom = '1px solid black';

        sleep(200).then(() => {
            console.log("minor!")
            target_note_id.style.backgroundColor = 'black';
            target_note_id.style.borderBottom = '10px solid lightgray';
        })
    }

    // sleep(200).then(() => {
        
    //     if(target_note_id.className=="majorkey"){
    //         target_note_id.style.backgroundColor = 'white';
    //         target_note_id.style.borderBottom = '10px solid #242424';
    //     }
    //     else if(target_note_id.className=="minorkey"){
    //         target_note_id.style.backgroundColor = 'black';
    //         target_note_id.style.borderBottom = '10px solid lightgray';
    //     }

    // })
}



// m -- mode     n -- note      d -- duration     p -- pitch
function playByList(index) {
    if (index < melody_list1.length) {

        wait_ms = 20

        step = melody_list1[index];

        if (step[0] === "m") {
            mus_ins = step.slice(1, step.length)
        }

        else if (step[0] === "d") {
            wait_ms = step.slice(1, step.length) * 1000
        }

        else if (step[0] === "p") {
            pitch_value = step.slice(1, step.length)
        }

        else if (step[0] === "n") {
            
            KeyAnimateOn()
            const clc_note_snd = new Audio(`sounds/${mus_ins}/${step[1]}.mp3`);
            clc_note_snd.playbackRate = pitch_value;
            clc_note_snd.play();
            
        }

        setTimeout(() => {
            playByList(index + 1);
        }, wait_ms);

    }
}

function makeMelody(){
    if(is_redact == false){
        is_redact = true
        makeMelBtn.innerHTML = "Stop"
        melody_list1.push(`m${mus_ins}`)
        melody_list1.push(`p${pitch_value}`)
    }
    else if(is_redact == true){
        is_redact = false
        makeMelBtn.innerHTML = "Continue"
        melody_list1.push(`m${mus_ins}`)
        melody_list1.push(`p${pitch_value}`)
    }
}

function melodyErase(){
    melody_list1 = []
    dur_time = 0
    makeMelBtn.innerHTML = "Start"
    is_redact = false
}

setInterval(() => {
    if(is_redact==true){
        dur_time+=100
    }
}, 100);