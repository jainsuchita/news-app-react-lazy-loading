function swap(cost_matrix, ind1, ind2) {
    [cost_matrix[ind1], cost_matrix[ind2]] = [cost_matrix[ind2], cost_matrix[ind1]];
}

function minimumDiscount(cost_matrix, start_index, end_index) {
    let result = { solution: [], cost: Infinity };

    if (start_index == end_index) {
        result.cost = 0;
        result.solution.push(cost_matrix[start_index]);
    }
    else {
        for (let i = end_index; i >= start_index; i--) {
            let noOfDaysWaited = 0;

            // create all the permutes
            swap(cost_matrix, end_index, i);

            // calculate the cost C(start : end-1)
            let partialResult = { solution: [], cost: Infinity };
            partialResult = minimumDiscount(cost_matrix, start_index, end_index - 1);

            // calculate the cost C(end)
            // Calculate the number of days waited
            for (let increment = start_index; increment <= (end_index - 1); increment++) {
                noOfDaysWaited += cost_matrix[increment].days;
            }

            // Discount for the last work which was delayed
            let costOfDelayedWork = noOfDaysWaited * cost_matrix[end_index].discount;

            if ((partialResult.cost + costOfDelayedWork) < result.cost) {
                result.cost = partialResult.cost + costOfDelayedWork;
                // We have a better result, clear the previous result 
                result.solution.length = 0;
                partialResult.solution.push(cost_matrix[end_index]);
                result.solution = [...result.solution, ...partialResult.solution];
            }
            else if ((partialResult.cost + costOfDelayedWork) == result.cost) {
                partialResult.solution.push(cost_matrix[end_index]);
                result.solution = [...result.solution, ...partialResult.solution];
            }

            swap(cost_matrix, i, end_index);

            partialResult.solution.length = 0;
        }
    }

    return result;
}

function printResult(result, cost_matrix) {
    let result_array = [];
    result.solution.map((item) => {
        result_array.push(item.id);
        return result_array;
    });
    let r = result_array.splice(0, cost_matrix.length);
    console.log(r);
    console.log(result_array);
    console.log("Best Cost", result.cost)
}

function init() {

    let cost_matrix = [
        { id: 1, days: 3, discount: 4 },
        { id: 2, days: 1, discount: 1000 },
        { id: 3, days: 2, discount: 2 },
        { id: 4, days: 5, discount: 5 },
    ];

    let result = minimumDiscount(cost_matrix, 0, cost_matrix.length - 1);
    printResult(result, cost_matrix);
}

init();


// I used recursion to solve this type of problem.

// I am trying to get best possible solution for all the permutations possible.

// For example: -
//     function minimumdiscount() {

//         // to get all the permutations
//         [1 2 3 4] -> {
//             [1 2 3][4],
//             [1 2 4][3],
//             [1 3 4][2],
//             [2 3 4][1]
//                 }

//         // for all the above permutations get the best cost
//         recursively call to get least cost = minimumdiscount([1 2 3])
//             + cost of adding[4]

//         // store the version with least cost.
//     }
