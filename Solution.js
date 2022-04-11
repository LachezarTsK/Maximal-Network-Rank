
/**
 * @param {number} numberOfCities
 * @param {number[][]} roads
 * @return {number}
 */
var maximalNetworkRank = function (numberOfCities, roads) {
    if (roads.length === 0) {
        return 0;
    }

    this.maxPair = new MaxPairConnectivity();
    const numberOfConnections = new Array(numberOfCities).fill(0);
    for (let road of roads) {
        numberOfConnections[road[0]]++;
        numberOfConnections[road[1]]++;
    }

    findFirstAndSecondHighestConnectivity(numberOfConnections);
    findNumberOfCitiesPerFirstAndSecondHighestConnectivity(numberOfConnections);
    return calculateMaximalNetworkRank(roads, numberOfConnections);
};

function MaxPairConnectivity() {
    this.firstHighestConnectivity = 0;
    this.secondHighestConnectivity = 0;
    this.citiesWithFirstHighestConnectivity = 0;
    this.citiesWithSecondHighestConnectivity = 0;
}

/**
 * @param {number[][]} roads
 * @param {number[]} numberOfConnections
 * @return {number}
 */
function calculateMaximalNetworkRank(roads, numberOfConnections) {

    let directPairs = 0;
    let max1 = this.maxPair.firstHighestConnectivity;
    let max2 = this.maxPair.secondHighestConnectivity;
    for (let road of roads) {
        let c1 = numberOfConnections[road[0]];
        let c2 = numberOfConnections[road[1]];
        if ((c1 === max1 && c2 === max2) || (c1 === max2 && c2 === max1)) {
            directPairs++;
        }
    }

    let n1 = this.maxPair.citiesWithFirstHighestConnectivity;
    let n2 = this.maxPair.citiesWithSecondHighestConnectivity;
    let maxNonoverlappingPairs = (max1 === max2) ? (n1 * (n1 - 1) / 2) : n2;

    return (maxNonoverlappingPairs !== directPairs) ? (max1 + max2) : (max1 + max2 - 1);
}

/**
 * @param {number[]} numberOfConnections
 * @return {void}
 */
function findFirstAndSecondHighestConnectivity(numberOfConnections) {
    for (let connections of numberOfConnections) {
        if (connections > this.maxPair.firstHighestConnectivity) {
            this.maxPair.secondHighestConnectivity = this.maxPair.firstHighestConnectivity;
            maxPair.firstHighestConnectivity = connections;
        } else if (connections > this.maxPair.secondHighestConnectivity && connections <= this.maxPair.firstHighestConnectivity) {
            this.maxPair.secondHighestConnectivity = connections;
        }
    }
}

/**
 * @param {number[]} numberOfConnections
 * @return {void}
 */
function findNumberOfCitiesPerFirstAndSecondHighestConnectivity(numberOfConnections) {
    for (let connections of numberOfConnections) {
        if (this.maxPair.firstHighestConnectivity === connections) {
            ++this.maxPair.citiesWithFirstHighestConnectivity;
        }
        if (this.maxPair.secondHighestConnectivity === connections) {
            ++this.maxPair.citiesWithSecondHighestConnectivity;
        }
    }
}
