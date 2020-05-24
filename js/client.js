let headerHeight = document.getElementById('header').clientHeight;
let contentHeight = document.getElementById('content').clientHeight;
let rootHeight = document.getElementById('root').clientHeight;
let galeryHeight = rootHeight - (headerHeight+contentHeight);
let controlHeight = document.getElementById('seriesControl').clientHeight;
let seriesSliderHeight = galeryHeight - controlHeight;
document.getElementById('galery').style.height = galeryHeight + "px";
document.getElementById('seriesSlider').style.height = seriesSliderHeight + "px";