function sockMerchant(n: number, ar: number[]): number {
    // Create a Map to store the count of each color
    const colorCount: Map<number, number> = new Map();

    // Count the occurrences of each color in the array
    for (const color of ar) {
        colorCount.set(color, (colorCount.get(color) || 0) + 1);
    }

    // Calculate the number of pairs for each color
    let totalPairs: number = 0;
    for (const count of colorCount.values()) {
        totalPairs += Math.floor(count / 2);
    }

    return totalPairs;
}
