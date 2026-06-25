function changeLanguage(lang){

if(lang === "en"){
window.location.href = "pages/en/home.html";
}

else if(lang === "hi"){
window.location.href = "pages/hi/home.html";
}

else if(lang === "mr"){
window.location.href = "pages/mr/home.html";
}

}
function sendWhatsApp(){

let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;
let event = document.getElementById("event").value;
let date = document.getElementById("date").value;
let location = document.getElementById("location").value;
let message = document.getElementById("message").value;

if(name === "" || phone === "" || event === "" || date === "" || location === ""){
alert("Please fill all required fields");
return;
}

let text =
"📸 NEW SHOOT BOOKING %0A%0A" +
"👤 Name: " + name + "%0A" +
"📞 Phone: " + phone + "%0A" +
"📷 Shoot Type: " + event + "%0A" +
"📅 Date: " + date + "%0A" +
"📍 Location: " + location + "%0A" +
"📝 Details: " + message;

window.open(
"https://wa.me/919834532026?text=" + text,
"_blank"
);

}