let fft, mic, micState;
let notenames =
{
    "127": "G9",
    "126": "F#9/Gb9.82",
    "125": "F9",
    "124": "E9",
    "123": "D#9/Eb9",
    "122": "D9",
    "121": "C#9/Db9",
    "120": "C9",
    "119": "B8",
    "118": "A#8/Bb8",
    "117": "A8",
    "116": "G#8/Ab8",
    "115": "G8",
    "114": "F#8/Gb8",
    "113": "F8",
    "112": "E8",
    "111": "D#8/Eb8",
    "110": "D8",
    "109": "C#8/Db8",
    "108": "C8",
    "107": "B7",
    "106": "A#7/Bb7",
    "105": "A7",
    "104": "G#7/Ab7",
    "103": "G7",
    "102": "F#7/Gb7",
    "101": "F7",
    "100": "E7",
    "99": "D#7/Eb7",
    "98": "D7",
    "97": "C#7/Db7",
    "96": "C7",
    "95": "B6",
    "94": "A#6/Bb6",
    "93": "A6",
    "92": "G#6/Ab6",
    "91": "G6",
    "90": "F#6/Gb6",
    "89": "F6",
    "88": "E6",
    "87": "D#6/Eb6",
    "86": "D6",
    "85": "C#6/Db6",
    "84": "C6",
    "83": "B5",
    "82": "A#5/Bb5",
    "81": "A5",
    "80": "G#5/Ab5",
    "79": "G5",
    "78": "F#5/Gb5",
    "77": "F5",
    "76": "E5",
    "75": "D#5/Eb5",
    "74": "D5",
    "73": "C#5/Db5",
    "72": "C5",
    "71": "B4",
    "70": "A#4/Bb4",
    "69": "A4",
    "68": "G#4/Ab4",
    "67": "G4",
    "66": "F#4/Gb4",
    "65": "F4",
    "64": "E4",
    "63": "D#4/Eb4",
    "62": "D4",
    "61": "C#4/Db4",
    "60": "C4",
    "59": "B3",
    "58": "A#3/Bb3",
    "57": "A3",
    "56": "G#3/Ab3",
    "55": "G3",
    "54": "F#3/G",
    "53": "F3",
    "52": "E3",
    "51": "D#3/E",
    "50": "D3",
    "49": "C#3/D",
    "48": "C3",
    "47": "B2",
    "46": "A#2/B",
    "45": "A2",
    "44": "G#2/A",
    "43": "G2",
    "42": "F#2/G",
    "41": "F2",
    "40": "E2",
    "39": "D#2/E",
    "38": "D2",
    "37": "C#2/D",
    "36": "C2",
    "35": "B1",
    "34": "A#1",
    "33": "A1",
    "32": "G#1/A",
    "31": "G1",
    "30": "F#1/Gb1",
    "29":	"F1",
    "28":	"E1",
    "27":	"D#1/E",
    "26":	"D1",
    "25":	"C#1/D",
    "24":	"C1",
    "23":	"B0",
    "22":	"A#0/B",
    "21":	"A0"
};
/*
48000Hz sample rate, 1024 bins
48000/1024 = 46.875Hz frequency spacing
Goes up from 0 in 46.875Hz steps until the 1024/2 = 512th band
This gives a frequency range of around 24000Hz
*/

function setup() {
	let cnv = createCanvas(600, 600);
    cnv.mousePressed(toggleMic);
	textSize(30);
	mic = new p5.AudioIn();
	fft = new p5.FFT(.9, 1024);
    fft.setInput(mic);
	colorMode(HSB);
    micState = false;
}

function draw() {
	background(10);

	let spectrum = fft.analyze();
	noStroke();
	for (let i = 0; i < spectrum.length; i++)
	{
		let x = map(i, 0, spectrum.length, 0, width);
		let h = -height + map(spectrum[i], 0, 255, height, 0);
		let color = map(spectrum[i], 0, 255, 360, 0);
		fill(color, 100, 100);
		rect(x, height, width / spectrum.length, h);
	}
    let freq = spectrum.indexOf(max(spectrum.slice(0, 512))) * 46.875;
	let note = freqToMidi(freq);
    let name = notenames[note];

	fill(255);
    text(`Freq: ${round(freq)} Hz  Note: ${name ? name : "None"}`, 50, 50);
}

function toggleMic() {
    if (micState === false) {
        micState = true;
        mic.start()
    } else if (micState === true) {
        micState = false;
        mic.stop()
    }
}
