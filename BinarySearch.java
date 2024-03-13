public class BinarySearch {
    // Returns the index of target in sorted array arr, or -1 if not found
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            // If target is present at mid
            if (arr[mid] == target)
                return mid;

            // If target greater, ignore left half
            if (arr[mid] < target)
                left = mid + 1;
            // If target is smaller, ignore right half
            else
                right = mid - 1;
        }

        // If target is not found in array
        return -1;
    }

    // Test the binary search function
    public static void main(String[] args) {
        int[] arr = { 2, 4, 6, 8, 10, 12, 14 };
        int target = 10;
        int index = binarySearch(arr, target);

        if (index != -1)
            System.out.println(target + " found at index " + index);
        else
            System.out.println(target + " not found in the array.");
    }
}
