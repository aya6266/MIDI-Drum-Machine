if (navigator.requestMIDIAccess){
  navigator.requestMIDIAccess().then(success, failure);
}

function success(midiAccess){
  // console.log(midiAccess);
  midiAccess.addEventListener("statechange", updateDevices);

  const inputs = midiAccess.inputs;
  console.log(inputs);

  inputs.forEach((input) => {
    input.addEventListener('midimessage', handleInput)
  }); 
 
}

function handleInput(input){
  const command = input.data[0];
  const note = input.data[1];
  const velocity = input.data[2];
  
  switch(command){
    case 144: //note On
    if(velocity > 0){
      // console.log(note)
      const audio = document.querySelector(`audio[key="${note}"]`);
      const key = document.querySelector(`div[key="${note}"]`);
      audio.currentTime = 0;
      audio.play();
      key.classList.add('playing');
    }
    else{
      const key = document.querySelector(`div[key="${note}"]`);
      key.classList.remove('playing');
    }
    break;
    case 128: // note off
      noteOff(note);// note is off
      break;
  }
}

// function noteOn(note, velocity){
//   console.log(note, velocity)
// }

function noteOff(note){
  console.log("note over")
}

function updateDevices(event){
  // console.log(event);
  // console.log(`Name: ${event.port.name}, Brand: ${event.port.manufacturer}, State: ${event.port.state}, Type: ${event.port.type}`)
}


function failure(){
  console.log("Could not connet MIDI");
}