---
layout: base.html
title: Work \
active: work
---

<link rel="stylesheet" href="/css/workstyles.css">




{%- for item in collections.workitems -%}
<section class="workitem">

<a href="{{ item.url }}"></a>
<div class="cardsplit">
<img src="{{ item.data.coverimage }}">
<div class="subcard">

# {{ item.data.title }}

{{item.data.description}}

</div>
</div>


</section>

{%- if forloop.index == 3 -%}
<!-- Cookbook link -->
<!-- 
<section class="workitem">

<a href="/cookbook/"></a>
<img src="/images/work/cookbookcollab/cookbook_cover.png">
<div class="subcard">

# Cookbook Collab

A mini-site for recipes beloved to my friends and family

</div>

</section> -->
{%- endif -%}

{%- endfor %}

