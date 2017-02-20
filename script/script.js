angular.module('myApp', [])
    .directive('balls', function ($timeout) {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {

                element.addClass('circle');

                scope.$watch(attrs.x, function (x) {
                    element.css('left', x + ' px');
                });

                scope.$watch(attrs.y, function (y) {
                    element.css('top', y + ' px');
                });
                scope.$watch(attrs.color, function (color) {
                    element.css('background', color);
                });
            }
        };
    })
    .controller('myCtrl', function ($scope, $timeout) {
        function buildCircle() {
            var maxSpeed = 200;

            return {
                color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
                x: Math.min(380, Math.max(20, (380 * Math.random()))),
                y: Math.min(180, Math.max(20, (180 * Math.random()))),
                velX: Math.random() * maxSpeed,
                velY: Math.random() * maxSpeed
            };
        }


        $scope.shapes = [];
        var quan = parseInt($scope.ballCount);

        $scope.insertVal = function (ballcount) {
            var count = parseInt(ballcount);
            for (i = 0; i < count; i++) {
                $scope.shapes.push(buildShape());

            }

            // Start timer-based, changes of the shape properties
            animator($scope.shapes, $timeout);

        }

    });


function animation(shapes, $timeout) {
    (function tick() {
        var i;
        var now = new Date().getTime();
        var maxX = 400;
        var maxY = 400;


        for (i = 0; i < shapes.length; i++) {
            var shape = shapes[i];
            var elapsed = (shape.timestamp || now) - now;

            shape.timestamp = now;
            shape.x += elapsed * shape.velX / 1000;
            shape.y += elapsed * shape.velY / 1000;

            if (shape.x > maxX) {
                shape.x = 2 * maxX - shape.x;
                shape.velX *= 1;
            }
            if (shape.x < 30) {
                shape.x = 30;
                shape.velX *= 1;
            }

            if (shape.y > maxY) {
                shape.y = 2 * maxY - shape.y;
                shape.velY *= 1;
            }
            if (shape.y < 20) {
                shape.y = 20;
                shape.velY *= 1;
            }

            //console.log(i + " x:" + shape.x + " y:" + shape.y);
        }

        $timeout(tick, 30);
    })();
}