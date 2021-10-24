img=" "
stat=" "
objects= []; 

function preload()
{
}

function setup()
{
    canvas= createCanvas(350, 350);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    video.size(350, 350);
    objectdetector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="STATUS : Detecting Objects";
}

function modelLoaded()
{
    console.log("MODEL IS INITIALIZED");
    stat=true;
    objectdetector.detect(video, gotResults);
}
function gotResults(error, results)
{
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw()
{
    image(video, 0, 0, 350, 350);
    if(stat!=" "){
        r= random(255);
        g= random(255);
        b= random(255);
        objectdetector.detect(video, gotResults);
    for(var i=0; i<objects.length; i++)
    {
        document.getElementById("status").innerHTML="Status : Objects Detected ";
        document.getElementById("number_of_objects").innerHTML="Number of objects detected = " + objects.length;
        fill(r, g, b);
        percent=floor(objects[i].confidence * 100);
        text(objects[i].label + "    " + percent + " % ", objects[i].x, objects[i].y);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
}