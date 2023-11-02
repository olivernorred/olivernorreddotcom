// AUDIO CONTROLLERS

const supportsAudio = !!document.createElement("audio").canPlayType('audio/mp3');
if (supportsAudio) {
const playIconSVG = `<svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M381.522-202.999q-32.087 20.261-65.109 3-33.022-17.261-33.022-55.349v-451.304q0-38.088 33.022-55.349 33.022-17.261 65.109 3L734.87-533.348q30.522 17.826 30.522 52.631 0 34.804-30.522 52.065L381.522-202.999Z"/></svg>`
const pauseIconSVG = `<svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M662.578-174.694q-48.191 0-81.428-33.132-33.237-33.131-33.237-81.826v-382.131q0-47.904 33.134-81.43 33.134-33.527 81.833-33.527h24q47.908 0 81.428 33.526 33.52 33.527 33.52 81.431v382.131q0 48.695-33.53 81.826-33.53 33.132-81.72 33.132h-24Zm-389.458 0q-47.908 0-81.428-33.132-33.52-33.131-33.52-81.826v-382.131q0-47.904 33.53-81.43 33.53-33.527 81.72-33.527h24q48.191 0 81.428 33.526 33.237 33.527 33.237 81.431v382.131q0 48.695-33.134 81.826-33.134 33.132-81.833 33.132h-24Z"/></svg>`


function initializeControls(largerContainer) {
	


	largerContainer.querySelectorAll(".audio-container").forEach(container => {

		const audio = container.querySelector(".audio");
		const audioControls = container.querySelector(".audio-controls")

		const playPause = container.querySelector(".playpause");
		playPause.innerHTML = playIconSVG;
		const progress = container.querySelector(".progress-bar");
		const progressBar = container.querySelector(".progress-bar-fallback");
		const progressTimestamp = container.querySelector(".progress-timestamp");
		const elapsedTime = container.querySelector(".elapsed-time");
		const duration = container.querySelector(".duration");
		const audioAnnotationSVG = container.querySelector(".audio-annotation-svg");

		audio.controls = false;

		playPause.addEventListener("click", (e) => {
			togglePlayPause();
			if (container.matches(':focus-within')) {
				console.log("contains active")
			}
		});
		container.addEventListener("click", ()=>{
			playPause.focus();
		})
		
		function togglePlayPause() {
			if (audio.paused || audio.ended) {
				audio.play();
			} else {
				audio.pause();
			}
			updatePlayPauseIcon()
		}
		function updatePlayPauseIcon() {
			if (audio.paused) {
				playPause.innerHTML = playIconSVG;
			}
			else {
				playPause.innerHTML = pauseIconSVG;
			}
		}

		audio.addEventListener("loadedmetadata", () => {
			progress.setAttribute("max", audio.duration);
			elapsedTime.innerHTML = secondsToMinutes(0);
			duration.innerHTML = secondsToMinutes(audio.duration);
			drawSVGAnnotation();
		});


		audio.addEventListener("timeupdate", () => {
			progress.value = audio.currentTime;
			progressBar.style.width = `${Math.floor(
				(audio.currentTime * 100) / audio.duration,
			)}%`;
			elapsedTime.innerHTML = secondsToMinutes(audio.currentTime);
		});

		progress.draggingMouse = false;
		progress.addEventListener("mousedown", (e) => {
			scrubAudio(e)
			progress.draggingMouse = true;
		})
		document.addEventListener("mousemove", (e) => {
			if (progress.draggingMouse) {
				scrubAudio(e)
			}
		});
		function scrubAudio(event) {
			const rect = progress.getBoundingClientRect();
			const pos = (event.pageX - rect.left) / progress.offsetWidth;
			audio.currentTime = pos * audio.duration;
		}
		
		window.addEventListener("mouseup", (e) => {
			progress.draggingMouse = false;
			// volumeSlider.draggingMouse = false;
		});

		// audio annotation drawing

		function drawSVGAnnotation() {
			const annotationGroup = audioAnnotationSVG.querySelector(".annotation-group");

			let startPercent = secondsToPercent(minutesToSeconds(audioAnnotationSVG.getAttribute("annotationstart")), audio.duration);
			let endPercent = secondsToPercent(minutesToSeconds(audioAnnotationSVG.getAttribute("annotationend")), audio.duration);

			const triangleWidth = 2;
			let startMarkerPoints = `
					${startPercent},0
					${startPercent},10
					${startPercent + triangleWidth},10
				`.trim();
			let endMarkerPoints = `
					${endPercent},0
					${endPercent},10
					${endPercent - triangleWidth},10
				`.trim();

			annotationGroup.innerHTML = 
				`
				<rect x="${startPercent}" y="${3}" width="${endPercent-startPercent}" height="${7}"></rect>
				<polygon points="${startMarkerPoints}"></polygon>	
				<polygon points="${endMarkerPoints}"></polygon>	
				`.trim();
			
			annotationGroup.addEventListener("click", ()=>{
				audio.currentTime = minutesToSeconds(audioAnnotationSVG.getAttribute("annotationstart"));
				audio.play();
				updatePlayPauseIcon();
			})
			
		}
		
	});

}


function secondsToMinutes(seconds) {
	let secondsNumber = (typeof (seconds) == String) ? Math.floor(parseFloat(seconds)) : Math.floor(seconds);
	let minutes = Math.floor(secondsNumber / 60);
	let remainder = (("" + (secondsNumber%60)).length < 2) ? "0" + (secondsNumber % 60) : "" + (secondsNumber % 60);
	return `${minutes}:${remainder}`;
}
function minutesToSeconds(timeStamp) {
	let timeStampString = "" + timeStamp;
	let minutesNumber = parseInt(timeStampString.split(":")[0]);
	let seconds = (minutesNumber * 60) + parseInt(timeStampString.split(":")[1]);
	return seconds;
}
function secondsToPercent(seconds, duration) {
	let percent = (seconds / duration) * 100; 
	return percent;
}





function injectAudioPlayers(){
	document.querySelectorAll("annotatedaudio").forEach(component => {
		const audioTitle = component.getAttribute("audiotitle");
		const audioArtist = component.getAttribute("audioartist");
		const audioSrc = component.getAttribute("audiosrc");
		const audioSrcType = audioSrc.split(".").last()
		const annotationStart = component.getAttribute("annotationstart");
		const annotationEnd = component.getAttribute("annotationend");



		const injection = 
		`
		<figure class="audio-container">
			<figcaption>
				<cite>${audioTitle} </cite> &mdash; ${audioArtist}
			</figcaption>

			<audio class="audio" controls preload>
				<source src="${audioSrc} " type="audio/${audioSrcType}" />
			</audio>

			<ul class="audio-controls">
				<li class="playpause-container"><button class="playpause material-symbols-rounded">play_arrow</button></li>
				<li class="progress-bar-list-item">
					<progress class="progress-bar" value="0" min="0">
						<span class="progress-bar-fallback"></span>
					</progress>
				</li>
				<li class="progress-timestamp"><span class="elapsed-time"></span> / <span class="duration"></span></li>

				<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="audio-annotation-svg" viewbox="0 0 100 20" annotationstart="${annotationStart}} " annotationend="${annotationEnd}">
					<g class="annotation-group"></g>
				</svg>
			</ul>
		</figure>
		`

		component.innerHTML = injection;

		initializeControls(component);
	});
}

if (!Array.prototype.last) {
	Array.prototype.last = function () {
		return this[this.length - 1];
	};
};

document.addEventListener("DOMContentLoaded", injectAudioPlayers);

initializeControls(document);
// close if statement checking for audio compatibility
}
