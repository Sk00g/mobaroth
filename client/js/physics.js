
var rectIntersects = function (rectA, rectB) {
    var l1 = {x: rectA.x, y: rectA.y};
    var r1 = {x: rectA.x + rectA.w, y: rectA.y + rectA.h};
    var l2 = {x: rectB.x, y: rectB.y};
    var r2 = {x: rectB.x + rectB.w, y: rectB.y + rectB.h};

    // If one rectangle is on left side of other
    if (l1.x > r2.x || l2.x > r1.x)
        return false;

    // If one rectangle is above other
    if (l1.y > r2.y || l2.y > r1.y)
        return false;

    return true;
}

export var normalize = function(vec2) {
    var length = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);

    vec2.x = vec2.x / length;
    vec2.y = vec2.y / length;
}


export var detectCollisions = function (entityList, collisionCallback) {
    var clearedEntities = [];
    
    for (var i = 0; i < entityList.length; i++) {
        clearedEntities.push(entityList[i]);

        for (var n = 0; n < entityList.length; n++) {
            if (i == n || clearedEntities.indexOf(entityList[n]) != -1)
                continue;

            var response = rectIntersects(entityList[i], entityList[n]);

            if (rectIntersects(entityList[i], entityList[n]))
                collisionCallback(entityList[i], entityList[n]);
        }
    }
}
