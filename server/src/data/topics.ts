import type { TopicSeed } from "../types/shared.js";

export const topicSeed: TopicSeed[] = [
  {
    slug: "arrays",
    title: "Arrays",
    order: 1,
    problems: [
      {
        id: "arrays-two-sum",
        title: "Two Sum",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=KLlXCFG5TnA",
        leetcodeLink: "https://leetcode.com/problems/two-sum/",
        articleLink: "https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-array/"
      },
      {
        id: "arrays-best-time-buy-sell-stock",
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=1pkOgXD63yU",
        leetcodeLink: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        articleLink: "https://takeuforward.org/data-structure/stock-buy-and-sell/"
      },
      {
        id: "arrays-maximum-subarray",
        title: "Maximum Subarray",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=AHZpyENo7k4",
        leetcodeLink: "https://leetcode.com/problems/maximum-subarray/",
        articleLink: "https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/"
      }
    ]
  },
  {
    slug: "binary-search",
    title: "Binary Search",
    order: 2,
    problems: [
      {
        id: "binary-search-search-insert-position",
        title: "Search Insert Position",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=K-RYzDZkzCI",
        leetcodeLink: "https://leetcode.com/problems/search-insert-position/",
        articleLink: "https://takeuforward.org/data-structure/search-insert-position/"
      },
      {
        id: "binary-search-first-last-position",
        title: "Find First and Last Position of Element",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=4sQL7R5ySUU",
        leetcodeLink: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
        articleLink: "https://takeuforward.org/data-structure/first-and-last-occurrences-in-array/"
      },
      {
        id: "binary-search-median-sorted-arrays",
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=q6IEA26hvXc",
        leetcodeLink: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
        articleLink: "https://takeuforward.org/data-structure/median-of-two-sorted-arrays-of-different-sizes/"
      }
    ]
  },
  {
    slug: "linked-list",
    title: "Linked List",
    order: 3,
    problems: [
      {
        id: "linked-list-reverse-list",
        title: "Reverse Linked List",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=D2vI2DNJGd8",
        leetcodeLink: "https://leetcode.com/problems/reverse-linked-list/",
        articleLink: "https://takeuforward.org/data-structure/reverse-a-linked-list/"
      },
      {
        id: "linked-list-middle-node",
        title: "Middle of the Linked List",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=sGdwSH8RK-o",
        leetcodeLink: "https://leetcode.com/problems/middle-of-the-linked-list/",
        articleLink: "https://takeuforward.org/data-structure/find-middle-element-in-a-linked-list/"
      },
      {
        id: "linked-list-lru-cache",
        title: "LRU Cache",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=7ABFKPK2hD4",
        leetcodeLink: "https://leetcode.com/problems/lru-cache/",
        articleLink: "https://takeuforward.org/interviews-topics/lru-cache/"
      }
    ]
  },
  {
    slug: "dynamic-programming",
    title: "Dynamic Programming",
    order: 4,
    problems: [
      {
        id: "dp-climbing-stairs",
        title: "Climbing Stairs",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=mLfjzJsN8us",
        leetcodeLink: "https://leetcode.com/problems/climbing-stairs/",
        articleLink: "https://takeuforward.org/data-structure/dynamic-programming-climbing-stairs/"
      },
      {
        id: "dp-house-robber",
        title: "House Robber",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=GrMBfJNk_NY",
        leetcodeLink: "https://leetcode.com/problems/house-robber/",
        articleLink: "https://takeuforward.org/data-structure/house-robber-dp-6/"
      },
      {
        id: "dp-edit-distance",
        title: "Edit Distance",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=fJaKO8FbDdo",
        leetcodeLink: "https://leetcode.com/problems/edit-distance/",
        articleLink: "https://takeuforward.org/data-structure/edit-distance-dp-33/"
      }
    ]
  },
  {
    slug: "strings",
    title: "Strings",
    order: 5,
    problems: [
      {
        id: "strings-valid-palindrome",
        title: "Valid Palindrome",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=jJXJ16kPFWg",
        leetcodeLink: "https://leetcode.com/problems/valid-palindrome/",
        articleLink: "https://www.geeksforgeeks.org/dsa/palindrome-string/"
      },
      {
        id: "strings-longest-substring-without-repeating",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=wiGpQwVHdE0",
        leetcodeLink: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        articleLink: "https://www.geeksforgeeks.org/dsa/length-of-the-longest-substring-without-repeating-characters/"
      },
      {
        id: "strings-longest-palindromic-substring",
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=XYQecbcd6_c",
        leetcodeLink: "https://leetcode.com/problems/longest-palindromic-substring/",
        articleLink: "https://www.geeksforgeeks.org/dsa/longest-palindromic-substring/"
      }
    ]
  },
  {
    slug: "stacks-queues",
    title: "Stacks & Queues",
    order: 6,
    problems: [
      {
        id: "stacks-queues-valid-parentheses",
        title: "Valid Parentheses",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=WTzjTskDFMg",
        leetcodeLink: "https://leetcode.com/problems/valid-parentheses/",
        articleLink: "https://www.geeksforgeeks.org/dsa/check-for-balanced-parentheses-in-an-expression/"
      },
      {
        id: "stacks-queues-min-stack",
        title: "Min Stack",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=qkLl7nAwDPo",
        leetcodeLink: "https://leetcode.com/problems/min-stack/",
        articleLink: "https://www.geeksforgeeks.org/dsa/design-and-implement-special-stack-data-structure/"
      },
      {
        id: "stacks-queues-daily-temperatures",
        title: "Daily Temperatures",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=cTBiBSnjO3c",
        leetcodeLink: "https://leetcode.com/problems/daily-temperatures/",
        articleLink: "https://www.geeksforgeeks.org/dsa/next-greater-element/"
      }
    ]
  },
  {
    slug: "trees",
    title: "Trees",
    order: 7,
    problems: [
      {
        id: "trees-maximum-depth",
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=hTM3phVI6YQ",
        leetcodeLink: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
        articleLink: "https://www.geeksforgeeks.org/dsa/write-a-c-program-to-find-the-maximum-depth-or-height-of-a-tree/"
      },
      {
        id: "trees-invert-binary-tree",
        title: "Invert Binary Tree",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=OnSn2XEQ4MY",
        leetcodeLink: "https://leetcode.com/problems/invert-binary-tree/",
        articleLink: "https://www.geeksforgeeks.org/dsa/write-an-efficient-c-function-to-convert-a-tree-into-its-mirror-tree/"
      },
      {
        id: "trees-level-order-traversal",
        title: "Binary Tree Level Order Traversal",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=6ZnyEApgFYg",
        leetcodeLink: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
        articleLink: "https://www.geeksforgeeks.org/dsa/level-order-tree-traversal/"
      }
    ]
  },
  {
    slug: "graphs",
    title: "Graphs",
    order: 8,
    problems: [
      {
        id: "graphs-number-of-islands",
        title: "Number of Islands",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=pV2kpPD66nE",
        leetcodeLink: "https://leetcode.com/problems/number-of-islands/",
        articleLink: "https://www.geeksforgeeks.org/dsa/find-the-number-of-islands-using-dfs/"
      },
      {
        id: "graphs-clone-graph",
        title: "Clone Graph",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=mQeF6bN8hMk",
        leetcodeLink: "https://leetcode.com/problems/clone-graph/",
        articleLink: "https://www.geeksforgeeks.org/dsa/clone-an-undirected-graph/"
      },
      {
        id: "graphs-course-schedule",
        title: "Course Schedule",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=EgI5nU9etnU",
        leetcodeLink: "https://leetcode.com/problems/course-schedule/",
        articleLink: "https://www.geeksforgeeks.org/dsa/topological-sorting/"
      }
    ]
  },
  {
    slug: "recursion-backtracking",
    title: "Recursion & Backtracking",
    order: 9,
    problems: [
      {
        id: "backtracking-subsets",
        title: "Subsets",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=REOH22Xwdkk",
        leetcodeLink: "https://leetcode.com/problems/subsets/",
        articleLink: "https://www.geeksforgeeks.org/dsa/backtracking-to-find-all-subsets/"
      },
      {
        id: "backtracking-combination-sum",
        title: "Combination Sum",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=GBKI9VSKdGg",
        leetcodeLink: "https://leetcode.com/problems/combination-sum/",
        articleLink: "https://www.geeksforgeeks.org/dsa/combinational-sum/"
      },
      {
        id: "backtracking-word-search",
        title: "Word Search",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=pfiQ_PS1g8E",
        leetcodeLink: "https://leetcode.com/problems/word-search/",
        articleLink: "https://www.geeksforgeeks.org/dsa/search-a-word-in-a-2d-grid-of-characters/"
      }
    ]
  },
  {
    slug: "heaps-priority-queue",
    title: "Heaps & Priority Queue",
    order: 10,
    problems: [
      {
        id: "heaps-kth-largest-element",
        title: "Kth Largest Element in an Array",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=XEmy13g1Qxc",
        leetcodeLink: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        articleLink: "https://www.geeksforgeeks.org/dsa/k-largestor-smallest-elements-in-an-array/"
      },
      {
        id: "heaps-top-k-frequent-elements",
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=YPTqKIgVk-k",
        leetcodeLink: "https://leetcode.com/problems/top-k-frequent-elements/",
        articleLink: "https://www.geeksforgeeks.org/dsa/find-k-numbers-occurrences-given-array/"
      },
      {
        id: "heaps-merge-k-sorted-lists",
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=q5a5OiGbT6Q",
        leetcodeLink: "https://leetcode.com/problems/merge-k-sorted-lists/",
        articleLink: "https://www.geeksforgeeks.org/dsa/merge-k-sorted-linked-lists/"
      }
    ]
  }
];

