prediction_1="";
prediction_2="";

Webcam.set(
{
 width:350,
 height:300,
 image_format: "tiff",
 tiff_quality:100
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_Snapshot()
{
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id="Captured_image" src="'+data_uri+'"/>'; 
    });
}

console.log("ml5_version",ml5.version);

Classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/32REfrz4F/model.json",modeLoaded);

function modeLoaded()
{
    console.log("modeLoaded");
}

function speak()
{
    var synth = window.speechSynthesis;

    speak_data1="the first prediction is " + prediction_1;
    speak_data2="the second prediction is " + prediction_2;

    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);  
}

function check()
{
    img = document.getElementById("Captured_image");
    Classifier.classify(img , gotResults);
}

function gotResults(error , results)
{
    if (error) {
        console.error(error);
    }else 
    {
      console.log(results);
      document.getElementById("result_emotion_name").innerHTML = results[0].label;
      document.getElementById("result_emotion_name2").innerHTML = results[1].label;

      prediction_1 = results[0].label;
      prediction_2 = results[1].label;

      speak();

      if (results[0].label == "Amazing") 
      {
       document.getElementById("update_emoji").innerHTML = "&#128076;";   
      }

      if (results[0].label == "Best") 
      {
       document.getElementById("update_emoji").innerHTML = "&#128077;";   
      }

      if (results[0].label == "Victory") 
      {
       document.getElementById("update_emoji").innerHTML = "&#9996;";   
      }

      if (results[1].label == "Amazing") 
      {
       document.getElementById("update_emoji2").innerHTML = "&#128076;";   
      }
      if (results[1].label == "Best") 
      {
       document.getElementById("update_emoji2").innerHTML = "&#128077;";   
      }

      if (results[1].label == "Victory") 
      {
       document.getElementById("update_emoji2").innerHTML = "&#9996;";   
      }
    }
}