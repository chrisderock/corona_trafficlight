document.write('<div id="ampel" style="width:54px;height:218px;background-color:#000;"> <div id="darkred" style="width:50px;height:50px;border:2px solid #fff;border-radius:26px;color:#fff;text-align:center;"></div> <div id="red" style="width:50px;height:50px;border:2px solid #fff;border-radius:26px;color:#fff;text-align:center;"></div> <div id="yellow" style="width:50px;height:50px;border:2px solid #fff;border-radius:26px;color:#fff;text-align:center;"></div> <div id="green" style="width:50px;height:50px;border:2px solid #fff;border-radius:26px;color:#fff;text-align:center;"></div></div>');
function loadData(objectId){
    /**
     * ObjectID can be found at
     * https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/917fc37a709542548cc3be077a786c17_0/geoservice
     * (just click on the card)
     */
    var green = document.getElementById('green');
    var yellow = document.getElementById('yellow');
    var red = document.getElementById('red');
    var darkred = document.getElementById('darkred');
    green.style.backgroundColor='#000';
    yellow.style.backgroundColor='#000';
    red.style.backgroundColor='#000';
    darkred.style.backgroundColor='#000';
    green.innerHTML='';
    yellow.innerHTML='';
    red.innerHTML='';
    darkred.innerHTML='';
    var req = new XMLHttpRequest();
    var url2="https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json&objectIds="+objectId;
    req.onreadystatechange = function(){
	if(this.readyState == 4){
	    var obj = JSON.parse(this.responseText);
	    var cnt = obj.features[0].attributes.cases7_per_100k;
	    console.log(cnt);
	    console.log(obj.features[0].attributes.last_update);
	    console
	    if(cnt < 25){
		green.style.backgroundColor='#5cb12d';
		green.innerHTML=Math.round(cnt);
		return;
	    }
	    if(cnt < 50){
		yellow.style.backgroundColor='#f6ff00';
		yellow.innerHTML=Math.round(cnt);
		return;
	    }
	    if(cnt < 100){
		red.style.backgroundColor='#ff0000';
		red.innerHTML=Math.round(cnt);
		return;
	    }
	    darkred.style.backgroundColor='#550808';
	    darkred.innerHTML=Math.round(cnt);
	}
    }
    req.open("GET",url2,true);
    req.send();
}
loadData(284);
