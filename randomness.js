var maxArea = function (heights) {
    var list = [];
    for (var index = 1; index <= heights.length; index++) {
        var eachCorr = {
            x_corr: index,
            y_corr: heights[index - 1]
        }
        list.push(eachCorr);
    }

    var mainResult = reCursion(list, list.length-1,0,1);

    console.log(list);
    console.log(mainResult);

    return mainResult;
    //last vertical line * each vertical line from index=1; 
    //x-corr*(last vertical - each vertical), y-corr*(smaller vertical line)
};

function reCursion(arr, index) {
    //lastX and lastY use recursion to loop
    var currentX = arr[index].x_corr;
    var currentY = arr[index].y_corr;
    var chosenY = 0;
    var area = 0;
    var result = [];
    var maxAreaAns = 0;

    for (var i = index - 1; i >= 0; i--) {
        if (currentY > arr[i].y_corr) {
            chosenY = arr[i].y_corr;
        } else {
            chosenY = currentY;
        }
        area = (currentX - arr[i].x_corr) * chosenY;
        console.log(`area = ${area} with i = ${i}, currentX=${currentX}, currentY=${currentY}`); 
        result.push(area);
    }

    if (index === 0) {
        console.log(result)
        maxAreaAns = Math.max(...result);
        return maxAreaAns;
    }else {
        return reCursion(arr, index - 1);
    }
}

maxArea([10,2,3,1,6,4,8,7])