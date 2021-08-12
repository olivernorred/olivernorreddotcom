---
title: I fixed legit-marquees
date: 2021-06-14
---


# {{title}}
## Oliver Norred, 14 June 2021

There was an issue with [legit-marquees](https://github.com/olivernorred/legit-marquees), my favorite software I’ve written. I wrote a [blog post](http://localhost:8080/blog/these-marquees-are-legit/) about it when I first made it, but I didn’t realize until now that it had a major bug:

<svg class="legit-marquee" viewBox="0 0 630 402" content="If there was more than one marquee on a page, only the first would work!" contentrepeat="1" pathd="m64.83499,256.33333c2,-104 189,-125 86,-169c-103,-44 242,-50 306,65c64,115 190,172 18,193c-172,21 -208,14 -268,-40c-60,-54 -144,55 -142,-49z" speed="4" textsize="36"></svg>


So I’ve fixed it.


<svg viewBox="0 50 669 302" class="legit-marquee" content="I promise it totally works now!" contentrepeat="1" id="demo1" pathd="m-9,284.33333c536,-214 -154,-319 177,-43c331,276 -65,-309 521,-97" speed="4" textsize="50"></svg>


I beg you to [use it in your next project](https://github.com/olivernorred/legit-marquees)!


<script src='/js/legitmarquees.js'></script>