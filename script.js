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


document.addEventListener('keydown', function(event) {
    if (event.key.length == 1) {
        
        clc_note_snd = new Audio(`sounds/${mus_ins}/${event.key}.mp3`);
        clc_note_snd.play();

        clc_note_snd.playbackRate = pitch_value;
        

        target_note_id = document.getElementById("button_" + event.key)
        if(target_note_id.className=="majorkey"){
            target_note_id.style.backgroundColor = 'lightgray';
            target_note_id.style.borderBottom = '1px solid black';
        }
        else if(target_note_id.className=="minorkey"){
            target_note_id.style.backgroundColor = 'gray';
            target_note_id.style.borderBottom = '1px solid black';
        }
        console.log(`${event.key} tugmasi bosildi!`)

    }
});

document.addEventListener('keyup', function(event) {
    if (event.key.length == 1) {

        
        target_note_id = document.getElementById("button_" + event.key)
        
        if(target_note_id.className=="majorkey"){
            target_note_id.style.backgroundColor = 'white';
            target_note_id.style.borderBottom = '10px solid #242424';
        }
        else if(target_note_id.className=="minorkey"){
            target_note_id.style.backgroundColor = 'black';
            target_note_id.style.borderBottom = '10px solid lightgray';
        }
        console.log(`${event.key} tugmasi qo'yib yuborilindi!`)
    }

    
});

function playClcSnd() {

    
    target_note_id = event.target;
    target_note_list_mp = target_note_id.id

    
    clc_note_snd = new Audio(`sounds/${mus_ins}/${target_note_list_mp[target_note_list_mp.length-1]}.mp3`);
    clc_note_snd.play()
    clc_note_snd.playbackRate = pitch_value;

}

function changeIns() {
    if(mus_ins=="piano"){
        mus_ins = "sintezator"
    } else if(mus_ins=="sintezator"){
        mus_ins =  "piano"
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
}