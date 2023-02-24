---
title: Quick Sketch Timer App
tags: workitems
description: "A prototype for a timer app for practicing sketching. Every line was hand-drawn."
coverimage: "/images/work/sketchtimer/sketchtimer-cover.png"
date: 2020-01-03
---
<style>
	img {
		border: 1px dashed black;
		padding: .3rem;
	}
	audio {
		display: block;
		width: 50%;
	}
	video {
		margin: auto; width: 50%;
		position: relative;
	}
	.pausedvideo::after {
		content: "paused";
		position: absolute;
		top: 50%; left: 50%;
		transform: translate(-50%, -50%);
	}
</style>

# Quick Sketch

A niche timer app for artists, designers, and illustrators to practice quick sketching. Every line was hand-drawn.

<video muted controls autoplay loop style="aspect-ratio: 1080 / 1920">
<source src="/images/work/sketchtimer/sketchtimer_tapthrough-withaudio.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>




<!-- <iframe width="383" height="681" src="https://www.youtube.com/embed/DalDezU417E" title="Oliver Norred - Quick Sketch Timer Prototype" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->

I was inspired by the theme of this app to design micro-interactions using pen and paper. All the animations are drawn frame by frame on paper.

## Animations indicate interactability

<video autoplay muted loop style="aspect-ratio: 1080 / 1080;">
<source src="/images/work/sketchtimer/shaking_buttons_micro.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

<p class="caption">Every button has a subtle two-frame tilting animation to indicate that it is interactable.</p>

## Animated countdown

<video autoplay muted loop style="aspect-ratio: 1080 / 1080">
<source src="/images/work/sketchtimer/countdown_micro.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

## Sound design

<audio controls>
  <source src="/images/work/sketchtimer/countdown_to_complete_audio.mp3" type="audio/mp3">
  Your browser does not support the audio tag.
</audio>

The vocal countdown and triumphant timer-end sound were a short exercise in sound design. I have to assume that when a user is sketching, they are not watching the app screen; thus an audio cue is not only fun, it is necessary.