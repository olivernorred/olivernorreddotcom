const select = {
	id: function(element) {
		return document.getElementById(element);
	},
	class: function(element) {
		return document.getElementsByClassName(element);
	},
	tag: function(element) {
		return document.getElementsByTagName(element);
	},
	one: function(element) {
		return document.querySelector(element);
	},
	all: function(element) {
		return document.querySelectorAll(element);
	}
};

// export {select};
