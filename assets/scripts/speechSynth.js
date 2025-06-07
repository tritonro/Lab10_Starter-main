// speechSynth.js

const synth = window.speechSynthesis;
let voices;

window.addEventListener('DOMContentLoaded', init);

function init() {
  setTimeout(() => populateVoices(), 50);
  bindListeners();
}

function populateVoices() {
  const voiceSelect = document.querySelector('#voice-select');
  voices = synth.getVoices();
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.innerHTML = `${voice.name} (${voice.lang})`;
    option.setAttribute('value', `${voice.name} (${voice.lang})`);
    option.setAttribute('data-index', voiceSelect.children.length - 1)
    voiceSelect.appendChild(option);
  });
}

function bindListeners() {
  const talkBtn = document.querySelector('#explore > button');
  const textarea = document.querySelector('#explore > textarea');

  talkBtn.addEventListener('click', () => {
    let textToSpeak = textarea.value;
    let utterThis = new SpeechSynthesisUtterance(textToSpeak);
    utterThis.voice = voices[getOptionIndex()];
    synth.speak(utterThis);
    voices = synth.getVoices();
    let sandyESURI = "Sandy (Spanish (Spain))";
    if (textToSpeak.toLowerCase() == "rosalía" && (utterThis.voice.voiceURI == sandyESURI)){
      openMouth(true);
    }
    else{
      openMouth(false);
    }
  })
}

function getOptionIndex() {
  const voiceSelect = document.querySelector('#voice-select');
  const option = voiceSelect.options[voiceSelect.selectedIndex];
  return option.getAttribute('data-index');
}

function openMouth(rosalia=false) {
  let face = document.querySelector('#explore > img');
  if (rosalia == true && shouldRosalia){
    face.setAttribute('src', 'assets/images/rosalia-open.png');
  }
  else{
    face.setAttribute('src', 'assets/images/smiling-open.png');
  }
  setTimeout(() => {
    if (synth.speaking) {
      openMouth(rosalia);
    } else {
      face.setAttribute('src', 'assets/images/smiling.png');
    }
  }, 100);
}
