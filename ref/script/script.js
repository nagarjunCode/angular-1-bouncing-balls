angular.module('animateApp', [])
    .directive('ball', function ($timeout) {
        return {

            restrict: 'E',
            link: function (scope, element, attrs) {

                element.addClass('circle');

                scope.$watch(attrs.x, function (x) {
                    element.css('left', x + 'px');
                });
                scope.$watch(attrs.y, function (y) {
                    element.css('top', y + 'px');
                });
                scope.$watch(attrs.color, function (color) {
                    element.css('backgroundColor', color);
                });
            }
        };
    })

.controller('AnimateCtrl', function ($scope, $timeout) {

    function buildShape() {

        var maxVelocity = 200;
        return {
            color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
            x: Math.min(380, Math.max(20, (Math.random() * 380))),
            y: Math.min(180, Math.max(20, (Math.random() * 180))),

            velX: (Math.random() * maxVelocity),
            velY: (Math.random() * maxVelocity)
        };
    }







    $scope.insertVal = function (ballcount) {
        $scope.shapes = []
        var count = parseInt(ballcount);
        for (i = 0; i < count; i++) {
            $scope.shapes.push(buildShape());

        }


        animator($scope.shapes, $timeout);

    }

});







function animator(shapes, $timeout) {
    (function tick() {
        var i;
        var now = new Date().getTime();
        var maxX = 600;
        var maxY = 600;



        for (i = 0; i < shapes.length; i++) {
            var shape = shapes[i];
            var elapsed = (shape.timestamp || now) - now;


            shape.timestamp = now;
            shape.x += elapsed * shape.velX / 1000;
            shape.y += elapsed * shape.velY / 1000;


            if (shape.x > maxX) { //right
                shape.x = 2 * maxX - shape.x;
                shape.velX *= -1;
            }
            if (shape.x < 30) { //left
                shape.x = 30;
                shape.velX *= -1;
            }

            if (shape.y > maxY) {
                shape.y = 2 * maxY - shape.y; //bottom
                shape.velY *= -1;
            }
            if (shape.y < 20) { //up
                shape.y = 20;
                shape.velY *= -1;
            }



        }
        for (var I = 0; I < shapes.length; I++)
            for (var J = I + 1; J < shapes.length; J++)
                if (checkCollision(shapes, I, J))
                    console.log("collision " + I + " " + J);
        $timeout(tick, 10);
    })();
}

function checkCollision(shapes, i, j) {
    var radius = 10;
    var shapeA = shapes[i];
    var shapeB = shapes[j];
    var A_x = parseFloat(shapeA.x) + radius;
    var A_y = parseFloat(shapeA.y) - radius;
    var B_y = parseFloat(shapeB.y) - radius;
    if (A_x + (2 * radius) > B_x && A_x < B_x + (2 * radius) && A_y + (2 * radius) > B_y && A_y < B_y + (2 * radius)) {

        shapeA.velX *= -1;
        shapeA.velY *= -1;
        shapeB.velX *= -1;
        shapeB.velY *= -1;

        return 1;

    }
    return 0;
}