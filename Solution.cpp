
#include <vector>
using namespace std;

class Solution {

    struct MaxPairConnectivity {
        int firstHighestConnectivity;
        int secondHighestConnectivity;
        int citiesWithFirstHighestConnectivity;
        int citiesWithSecondHighestConnectivity;
    };    
    MaxPairConnectivity maxPair;

public:

    int maximalNetworkRank(int numberOfCities, vector<vector<int>>& roads) {
        if (roads.size() == 0) {
            return 0;
        }

        vector<int> numberOfConnections(numberOfCities);
        for (const auto& road : roads) {
            numberOfConnections[road[0]]++;
            numberOfConnections[road[1]]++;
        }

        findFirstAndSecondHighestConnectivity(numberOfConnections);
        findNumberOfCitiesPerFirstAndSecondHighestConnectivity(numberOfConnections);
        return calculateMaximalNetworkRank(roads, numberOfConnections);
    }
    
private:

    int calculateMaximalNetworkRank(const vector<vector<int>>& roads, const vector<int>& numberOfConnections) {

        int directPairs = 0;
        int max1 = maxPair.firstHighestConnectivity;
        int max2 = maxPair.secondHighestConnectivity;
        for (const auto& road : roads) {
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

    void findFirstAndSecondHighestConnectivity(const vector<int>& numberOfConnections) {
        for (const auto& connections : numberOfConnections) {
            if (connections > maxPair.firstHighestConnectivity) {
                maxPair.secondHighestConnectivity = maxPair.firstHighestConnectivity;
                maxPair.firstHighestConnectivity = connections;
            } else if (connections > maxPair.secondHighestConnectivity && connections <= maxPair.firstHighestConnectivity) {
                maxPair.secondHighestConnectivity = connections;
            }
        }
    }

    void findNumberOfCitiesPerFirstAndSecondHighestConnectivity(const vector<int>& numberOfConnections) {
        for (const auto& connections : numberOfConnections) {
            if (maxPair.firstHighestConnectivity == connections) {
                ++maxPair.citiesWithFirstHighestConnectivity;
            }
            if (maxPair.secondHighestConnectivity == connections) {
                ++maxPair.citiesWithSecondHighestConnectivity;
            }
        }
    }
};
