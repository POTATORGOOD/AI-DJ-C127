song = "";

score_left = 0;
score_right = 0;

LeftWristX = 0;
LeftWristY = 0;
RightWristX = 0;
RightWristY = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('red');
    stroke('red');

    if (score_right > 0.003) {
        circle(RightWristX, RightWristY, 20);
        if (RightWristY > 0 && RightWristY <= 100) {
            song.rate(0.5);
            document.getElementById("var_speed").innerHTML = "Speed: 0.5x";
        }
        else if (RightWristY > 100 && RightWristY <= 200) {
            song.rate(1);
            document.getElementById("var_speed").innerHTML = "Speed: 1x";
        }
        else if (RightWristY > 200 && RightWristY <= 300) {
            song.rate(1.5);
            document.getElementById("var_speed").innerHTML = "Speed: 1.5x";
        }
        else if (RightWristY > 300 && RightWristY <= 400) {
            song.rate(2);
            document.getElementById("var_speed").innerHTML = "Speed: 2x";
        }
        else if (RightWristY > 400 && RightWristY <= 500) {
            song.rate(2.5);
            document.getElementById("var_speed").innerHTML = "Speed: 2.5x";
        }
    }

    if (score_left > 0.005) {
        circle(LeftWristX, LeftWristY, 20);
        num_left_wrist = Number(LeftWristY);
        remove_decimals = floor(num_left_wrist);
        volume = remove_decimals / 500;
        song.setVolume(volume);
        document.getElementById("var_volume").innerHTML = "Volume: " + volume;
    }
    }

function modelLoaded() {
    console.log('PoseNet Is Initialized')
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        score_left = results[0].pose.keypoints[9].score
        score_right = results[0].pose.keypoints[10].score

        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("left wrist x = " + LeftWristX + "left wrist y = " + LeftWristY + "right wrist x = " + RightWristX + "right wrist y = " + RightWristY)
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop() {
    song.stop();
}