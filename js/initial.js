var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

var frame = -1;

var visualizers = [];
function visualizer(obj) {
	visualizers.push(this);
	this.initialFunction = obj.initialFunction;
	this.loopingFunction = obj.loopingFunction;
}
