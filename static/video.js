define('video', ['gif'], function (Animated_GIF) {
    'use strict';

    function VideoShooter(videoElement) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        canvas.width = videoElement.width;
        canvas.height = videoElement.height;

        this.getShot = function (callback, numFrames, interval) {
            numFrames = numFrames !== undefined ? numFrames : 3;
            interval = interval !== undefined ? interval : 0.1; // In seconds
            
            var pendingFrames = numFrames;
            var ag = new Animated_GIF({ workerPath: '/static/quantizer.js' });
            ag.setSize(canvas.width, canvas.height);
            ag.setDelay(interval);

            captureFrame();

            function captureFrame() {
                ag.addFrame(videoElement);
                pendingFrames--;

                if(pendingFrames > 0) {
                    setTimeout(captureFrame, interval * 1000); // timeouts are in milliseconds
                } else {
                    ag.getBase64GIF(callback);
                }
            }

        };
    };

    return VideoShooter;
});
