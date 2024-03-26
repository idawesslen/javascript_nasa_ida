// ordningen!!!! 
// hämta in antalen tecken som user skriver in
// kontrollera att user skrivit 4 tecken
// är vilkoret uppfyllt ska btn bli aktiv
// är inte vilkoret uppfyllt ska inte btn vara aktiv
// när vi klickar i input ska fokus lyssnare läggas på
// när vi klickar utanför input ska blur lyssnare läggas pp
// när vi klickar på btn gör en kontroll om det finns någoti input och om det inte finns något ska btn bli disable. 
// när vi klickar på btn ska input rensas. 


// Bildsida info:  https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=
// APIKey:YE9R3SXdo67uJoN3VZQKxFJy9nabVT8pecdpoCiM

//variabel till api
const apiForNasa = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=YE9R3SXdo67uJoN3VZQKxFJy9nabVT8pecdpoCiM`
const picContainer = document.getElementById('imgs'); // Hämta referensen id till din HTML-container



//variabel
const labelname = document.querySelector('#namelabel'); // label 
const btnsave = document.querySelector('#btn-save'); // för knappen
const displayUsername = document.querySelector('#displayUsername'); // det som skrivs ut från label


const modeSwitch = document.getElementById('modeSwitch');//hämta info till en variabel
const body = document.body; //variabel för body

//eventlyssnare som lyssnar på förändringar i statusen för switch
modeSwitch.addEventListener('change', () => {
    if (modeSwitch.checked) { // om den är ifylld
        // Dark mode
        body.classList.add('dark-mode'); //lägg till classer
        body.classList.remove('light-mode');
    } else { // ej ifylld
        // Light mode
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    }
});


//öra som lyssnar på när man lyfter en tangent. 
labelname.addEventListener('keyup', () => {
    // console.log('du trycker');
    // console.log(labelname.value);
    let getValueLenght = labelname.value.length;
     //kontrollera om user har skrvit 4 tecken 
    if(getValueLenght > 3){ //större än tre
        console.log('det är mer än 3 tecken');
        btnsave.disabled = false; // om falskt var disable
    }else{
        console.log('det är mindre än 3 tecken');
        btnsave.disabled = true; //om sant var orginal, tbc till disabled
    }
}) 

// öra för när input-elementet får fokus
labelname.addEventListener('focus', () => {
    labelname.style.border = '2px solid #242348';// ge en färg border vid focus
});

// öra, tappar fokus
labelname.addEventListener('blur', () => {
    labelname.style.border = '2px solid transparent'; //¨återställ¨ så den ej syns.
});

// Eventlyssnare för när knappen "Spara" klickas på
btnsave.addEventListener('click', (event) => {

    event.preventDefault(); // Stoppa standardbeteendet för knappen
    const name = labelname.value; // Hämta värdet från input-fältet
    displayUsername.textContent = "Welcome " + name; // Uppdatera texten i displayUsername-elementet med det inskrivna namnet
    labelname.value = ''; // Rensa input-fältet
    btnsave.disabled = true; // Inaktivera knappen igen
});

//hämta datan 
fetch(apiForNasa)
    .then(response => response.json()) // respons till json 
    .then(data => { //datan ska göra..
    const latestSpacePics = data.photos.slice(0, 6); // varibel för datan 
    // console.log(latestSpacePics);
    if(latestSpacePics.length !==0){ //om det finns data gör vi..
        // console.log('Det finns data');
        latestSpacePics.forEach(pic =>{ // för varje bild i arrayen så..
            const newCard = createCard(pic); // variabel för skapade cards i funktion för varje bild i arrayen.
            picContainer.append(newCard); // picContainer är variabel för det i html, vi lägger till nya cards i via funktion.  
        });
    }else {
        console.log('Det finns ingen data');
        // Ingen bild hittades, lägg till meddelande
        const noImagesMessage = document.createElement('h3');
        noImagesMessage.textContent = 'Inga bilder hittades från NASA..';
        picContainer.appendChild(noImagesMessage);
    }
    });
    
function createCard(photo) { // funktion för pic
    // console.log('createcard körs');
    //skapa html element
     
    //div till hela, card
    const card = document.createElement('div');// En div.. 
    card.classList.add('card'); //med classen card
    // console.log(card);

    // div till bild
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('movie-pic');
    

    //bild
    const img = document.createElement('img');
    img.src = photo.img_src; //lägga till src till bild
  
    // text
    const h3 = document.createElement('h3');  
    //h3.textContent = `Kamera: ${photo.camera.full_name}, Datum: ${photo.earth_date}`;//för att koppla text till h3
    h3.textContent = `Kamera: ${photo.camera.full_name}, Datum: ${photo.earth_date}`;

    imgDiv.append(img);//lägger till img i imgdiv   
    card.append(imgDiv); // lägga till imgDiv i card
    card.appendChild(h3); // lägg till h3 i card div 
    return card;//skickar tillbaka till
}

