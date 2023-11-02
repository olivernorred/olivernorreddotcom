// AUDIO CONTROLLERS

const supportsAudio = !!document.createElement("audio").canPlayType('audio/mp3');
if (supportsAudio) {
const playIconSVG = `<svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M381.522-202.999q-32.087 20.261-65.109 3-33.022-17.261-33.022-55.349v-451.304q0-38.088 33.022-55.349 33.022-17.261 65.109 3L734.87-533.348q30.522 17.826 30.522 52.631 0 34.804-30.522 52.065L381.522-202.999Z"/></svg>`
const pauseIconSVG = `<svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M662.578-174.694q-48.191 0-81.428-33.132-33.237-33.131-33.237-81.826v-382.131q0-47.904 33.134-81.43 33.134-33.527 81.833-33.527h24q47.908 0 81.428 33.526 33.52 33.527 33.52 81.431v382.131q0 48.695-33.53 81.826-33.53 33.132-81.72 33.132h-24Zm-389.458 0q-47.908 0-81.428-33.132-33.52-33.131-33.52-81.826v-382.131q0-47.904 33.53-81.43 33.53-33.527 81.72-33.527h24q48.191 0 81.428 33.526 33.237 33.527 33.237 81.431v382.131q0 48.695-33.134 81.826-33.134 33.132-81.833 33.132h-24Z"/></svg>`


function initializeControls(largerContainer) {
	


	Array.from(largerContainer.querySelectorAll(".audio-container")).forEach(container => {

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
	Array.from(document.querySelectorAll("annotatedaudio")).forEach(component => {
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

window.mobileCheck = function () {
	let check = false;
	(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};