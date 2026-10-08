M.AutoInit();
const elem = document.getElementById("person_animation");
const current_pos = elem.getBoundingClientRect();
let x = current_pos.left;
let y = current_pos.top;
const speed = 5;
const arrows = ["ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown"];

let held_keys = new Set();

function set_new_pos(new_x, new_y) {
    x = Math.min(Math.max(new_x,0),document.documentElement.clientWidth - current_pos.width);
    y = Math.min(Math.max(new_y,0),document.documentElement.clientHeight - current_pos.height);
    elem.style.top = y + "px";
    elem.style.left = x + "px";
}

function check_key(e){
    if (e.type == "keydown"&& arrows.includes(e.key)){
        e.preventDefault();
        held_keys.add(e.key);
    }

    if (e.type == "keyup" && arrows.includes(e.key)){
        e.preventDefault();
        held_keys.delete(e.key)
    }
}


setInterval(frame, 16)

function frame() {
    if (held_keys.size > 0){
        let new_x = x + speed*held_keys.has("ArrowRight")-speed*held_keys.has("ArrowLeft");
        let new_y = y + speed*held_keys.has("ArrowDown")-speed*held_keys.has("ArrowUp");
        set_new_pos(new_x, new_y);
    }
}
document.addEventListener("keydown",check_key);
document.addEventListener("keyup",check_key);