
public class Solution {

    private final class MaxPairConnectivity {
        int firstHighestConnectivity;
        int secondHighestConnectivity;
        int citiesWithFirstHighestConnectivity;
        int citiesWithSecondHighestConnectivity;
    }
    MaxPairConnectivity maxPair;

    public int maximalNetworkRank(int numberOfCities, int[][] roads) {
        if (roads.length == 0) {
            return 0;
        }
        maxPair = new MaxPairConnectivity();
        int[] numberOfConnections = new int[numberOfCities];
        for (int[] road : roads) {
            numberOfConnections[road[0]]++;
            numberOfConnections[road[1]]++;
        }

        findFirstAndSecondHighestConnectivity(numberOfConnections);
        findNumberOfCitiesPerFirstAndSecondHighestConnectivity(numberOfConnections);
        return calculateMaximalNetworkRank(roads, numberOfConnections);
    }

    private int calculateMaximalNetworkRank(int[][] roads, int[] numberOfConnections) {

        int directPairs = 0;
        int max1 = maxPair.firstHighestConnectivity;
        int max2 = maxPair.secondHighestConnectivity;
        for (int[] road : roads) {
            int c1 = numberOfConnections[road[0]];
            int c2 = numberOfConnections[road[1]];
            if ((c1 == max1 && c2 == max2) || (c1 == max2 && c2 == max1)) {
                directPairs++;
            }
        }

        int n1 = maxPair.citiesWithFirstHighestConnectivity;
        int n2 = maxPair.citiesWithSecondHighestConnectivity;
        int maxNonoverlappingPairs = (max1 == max2) ? (n1 * (n1 - 1) / 2) : n2;

        return (maxNonoverlappingPairs != directPairs) ? (max1 + max2) : (max1 + max2 - 1);
    }

    private void findFirstAndSecondHighestConnectivity(int[] numberOfConnections) {
        for (int connections : numberOfConnections) {
            if (connections > maxPair.firstHighestConnectivity) {
                maxPair.secondHighestConnectivity = maxPair.firstHighestConnectivity;
                maxPair.firstHighestConnectivity = connections;
            } else if (connections > maxPair.secondHighestConnectivity && connections <= maxPair.firstHighestConnectivity) {
                maxPair.secondHighestConnectivity = connections;
            }
        }
    }

    private void findNumberOfCitiesPerFirstAndSecondHighestConnectivity(int[] numberOfConnections) {
        for (int connections : numberOfConnections) {
            if (maxPair.firstHighestConnectivity == connections) {
                ++maxPair.citiesWithFirstHighestConnectivity;
            }
            if (maxPair.secondHighestConnectivity == connections) {
                ++maxPair.citiesWithSecondHighestConnectivity;
            }
        }
    }
}
