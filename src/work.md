---
layout: base.html
title: Work \
active: work
---

<link rel="stylesheet" href="/css/workstyles.css">

<div id="portfoliosticky">
<div id="portfoliogrid">

{% for item in collections.workitems %}
<section class="workitem">

<a href="{{ item.url }}"></a>
<img src="{{ item.data.coverimage }}">
<div class="subcard">

# {{ item.data.title }}

{{item.data.description}}

</div>

</section>
{% endfor %}

</div>
</div>

