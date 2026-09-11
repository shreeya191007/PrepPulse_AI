export const initialNotes = [
  {
    id: "note-1",
    name: "CS101_Data_Structures_Lecture_4.pdf",
    size: "1.2 MB",
    uploadedAt: "10 mins ago",
    status: "parsed",
    content: "Binary Search Trees (BST) guarantee O(log n) average time complexity for insertion, deletion, and lookup. In the worst-case scenario (unbalanced tree), operations degrade to O(n)."
  }
];

export const mockFlashcards = [
  {
    id: "card-1",
    question: "What is the worst-case time complexity of an operation in an unbalanced BST?",
    answer: "O(n) - because the tree deconstructs into a linked list when items are inserted in sorted order.",
    category: "Data Structures",
    status: "unlearned"
  },
  {
    id: "card-2",
    question: "Explain the main advantage of dynamic programming over recursion.",
    answer: "Dynamic Programming stores subproblem solutions (memoization/tabulation) to avoid redundant computation, reducing time complexity from exponential to polynomial.",
    category: "Algorithms",
    status: "unlearned"
  },
  {
    id: "card-3",
    question: "What is the difference between process and thread?",
    answer: "A process is an independent executing program with its own memory space, whereas a thread is a lightweight execution unit inside a process sharing its parent's memory.",
    category: "Operating Systems",
    status: "unlearned"
  }
];

export const mockQuizzes = [
  {
    id: "quiz-1",
    question: "Which invariant must hold true for all nodes in a valid Binary Search Tree?",
    options: [
      "The left child must be greater than the parent.",
      "All nodes in the left subtree must be less than the root node, and all in the right subtree greater.",
      "The tree must always remain balanced after every insertion.",
      "Every node must have exactly two child nodes."
    ],
    correctIndex: 1,
    explanation: "By definition, a BST requires every node in the left subtree to have a key smaller than its parent, and every node in the right subtree to have a key larger."
  },
  {
    id: "quiz-2",
    question: "What is the space complexity of an in-place QuickSort implementation on average?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctIndex: 1,
    explanation: "QuickSort uses O(log n) auxiliary space due to the recursive call stack under average conditions."
  }
];

export const mockInterviewResponses = [
  {
    text: "Great explanation! Your distinction between time complexities was sharp. To improve your answer further, consider discussing **balancing strategies** like AVL or Red-Black trees that prevent O(n) worst-case performance.",
    metrics: { clarity: 92, technicalDepth: 88, actionability: 95 }
  },
  {
    text: "Good start. You accurately identified the trade-offs, but try using the **STAR method** (Situation, Task, Action, Result) when answering system design questions.",
    metrics: { clarity: 80, technicalDepth: 75, actionability: 90 }
  }
];