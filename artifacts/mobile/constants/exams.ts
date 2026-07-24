export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Exam {
  catKey: string;
  title: string;
  passScore: number;
  questions: ExamQuestion[];
}

export const EXAMS: Exam[] = [
  {
    catKey: 'html',
    title: 'HTML Certification',
    passScore: 3,
    questions: [
      {
        id: 'html-1',
        question: 'What does HTML stand for?',
        options: [
          'HyperText Markup Language',
          'High-Tech Markup Language',
          'HyperTransfer Media Language',
          'Home Text Management Language',
        ],
        correctIndex: 0,
      },
      {
        id: 'html-2',
        question: 'Which tag creates the largest heading?',
        options: ['<h6>', '<head>', '<h1>', '<h0>'],
        correctIndex: 2,
      },
      {
        id: 'html-3',
        question: "What attribute specifies a link's destination?",
        options: ['src', 'href', 'link', 'url'],
        correctIndex: 1,
      },
      {
        id: 'html-4',
        question: 'Which tag creates an unordered list?',
        options: ['<ol>', '<list>', '<li>', '<ul>'],
        correctIndex: 3,
      },
      {
        id: 'html-5',
        question: 'How do you create a line break in HTML?',
        options: ['<newline>', '<break>', '<br>', '<lb>'],
        correctIndex: 2,
      },
    ],
  },
  {
    catKey: 'css',
    title: 'CSS Certification',
    passScore: 3,
    questions: [
      {
        id: 'css-1',
        question: 'What does CSS stand for?',
        options: [
          'Creative Style Sheets',
          'Cascading Style Sheets',
          'Computer Style System',
          'Colorful Style Script',
        ],
        correctIndex: 1,
      },
      {
        id: 'css-2',
        question: 'Which property sets the text color?',
        options: ['font-color', 'text-style', 'color', 'foreground'],
        correctIndex: 2,
      },
      {
        id: 'css-3',
        question: 'What property rounds element corners?',
        options: ['corner-style', 'circle', 'border-curve', 'border-radius'],
        correctIndex: 3,
      },
      {
        id: 'css-4',
        question: 'Which display value creates a flex container?',
        options: ['inline', 'flex', 'block', 'float'],
        correctIndex: 1,
      },
      {
        id: 'css-5',
        question: 'What does "margin" control?',
        options: [
          'Text alignment',
          'Space inside the element',
          'Space outside the element',
          'Font size',
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    catKey: 'js',
    title: 'JavaScript Certification',
    passScore: 3,
    questions: [
      {
        id: 'js-1',
        question: 'Which keyword declares a variable that can be reassigned?',
        options: ['const', 'var', 'let', 'declare'],
        correctIndex: 2,
      },
      {
        id: 'js-2',
        question: 'What does console.log() do?',
        options: [
          'Logs errors to a file',
          'Opens a debug panel',
          'Shows an alert box',
          'Prints a value to the console',
        ],
        correctIndex: 3,
      },
      {
        id: 'js-3',
        question: 'How do you select an element by its id?',
        options: [
          'document.getElementByClass()',
          'document.querySelector()',
          'document.getElementById()',
          'document.findById()',
        ],
        correctIndex: 2,
      },
      {
        id: 'js-4',
        question: 'Which operator checks strict equality?',
        options: ['==', '===', '=', '!=='],
        correctIndex: 1,
      },
      {
        id: 'js-5',
        question: 'How do you add an event listener?',
        options: [
          'element.onEvent()',
          'element.listenTo()',
          'element.addEventListener()',
          'element.attachEvent()',
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    catKey: 'php',
    title: 'PHP Certification',
    passScore: 3,
    questions: [
      {
        id: 'php-1',
        question: 'How do PHP variables start?',
        options: ['@', '#', '&', '$'],
        correctIndex: 3,
      },
      {
        id: 'php-2',
        question: 'Which function outputs text in PHP?',
        options: ['print_text()', 'console.log()', 'echo', 'alert()'],
        correctIndex: 2,
      },
      {
        id: 'php-3',
        question: 'Which tag opens a PHP block?',
        options: ['<php>', '<script type="php">', '<?php', '<%'],
        correctIndex: 2,
      },
      {
        id: 'php-4',
        question: 'How is POST form data accessed?',
        options: ['$POST', '$_POST', 'POST[]', '$form->post'],
        correctIndex: 1,
      },
      {
        id: 'php-5',
        question: 'Which PHP class connects to MySQL?',
        options: ['mysql_connect()', 'new mysqli()', 'db_link()', 'sql_open()'],
        correctIndex: 1,
      },
    ],
  },
  {
    catKey: 'c',
    title: 'C Certification',
    passScore: 3,
    questions: [
      {
        id: 'c-1',
        question: 'Where does every C program start?',
        options: ['run()', 'start()', 'begin()', 'main()'],
        correctIndex: 3,
      },
      {
        id: 'c-2',
        question: 'Which header provides printf?',
        options: ['math.h', 'stdlib.h', 'stdio.h', 'string.h'],
        correctIndex: 2,
      },
      {
        id: 'c-3',
        question: 'How do you declare an integer in C?',
        options: ['integer x', 'number x', 'int x', 'var x'],
        correctIndex: 2,
      },
      {
        id: 'c-4',
        question: 'What does %d do in printf?',
        options: [
          'Formats a decimal float',
          'Formats a double',
          'Formats an integer',
          'Formats a string',
        ],
        correctIndex: 2,
      },
      {
        id: 'c-5',
        question: 'Which command compiles a C file?',
        options: ['run main.c', 'cc -run main.c', 'compile main.c', 'gcc main.c'],
        correctIndex: 3,
      },
    ],
  },
  {
    catKey: 'cpp',
    title: 'C++ Certification',
    passScore: 3,
    questions: [
      {
        id: 'cpp-1',
        question: 'Which header provides cout?',
        options: ['cstdlib', 'cstring', 'iostream', 'cmath'],
        correctIndex: 2,
      },
      {
        id: 'cpp-2',
        question: 'How do you output in C++?',
        options: ['printf()', 'std::cout <<', 'echo', 'print()'],
        correctIndex: 1,
      },
      {
        id: 'cpp-3',
        question: 'What keyword defines a class?',
        options: ['struct', 'object', 'type', 'class'],
        correctIndex: 3,
      },
      {
        id: 'cpp-4',
        question: 'What does "public:" mean in a class?',
        options: [
          'The class is open source',
          'Those members are externally accessible',
          'The class is in global scope',
          'Those methods are static',
        ],
        correctIndex: 1,
      },
      {
        id: 'cpp-5',
        question: 'What is std::vector?',
        options: [
          'A 2D coordinate type',
          'A pointer type',
          'A string container',
          'A resizable typed array',
        ],
        correctIndex: 3,
      },
    ],
  },
  {
    catKey: 'java',
    title: 'Java Certification',
    passScore: 3,
    questions: [
      {
        id: 'java-1',
        question: 'Java programs compile to which format?',
        options: ['Machine code', 'Assembly', 'Bytecode', 'HTML'],
        correctIndex: 2,
      },
      {
        id: 'java-2',
        question: "What is the correct entry point signature?",
        options: [
          'public void run()',
          'public static void main(String[] args)',
          'static void start()',
          'public init()',
        ],
        correctIndex: 1,
      },
      {
        id: 'java-3',
        question: 'How do you print a line in Java?',
        options: ['echo', 'printf()', 'console.log()', 'System.out.println()'],
        correctIndex: 3,
      },
      {
        id: 'java-4',
        question: 'What does JVM stand for?',
        options: [
          'Java Variable Method',
          'Java Verified Module',
          'Java Virtual Machine',
          'Just Variable Method',
        ],
        correctIndex: 2,
      },
      {
        id: 'java-5',
        question: 'Which is true about String in Java?',
        options: [
          'It is a primitive like int',
          'It is a character array only',
          'It is a class (with capital S)',
          'It is a keyword',
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    catKey: 'python',
    title: 'Python Certification',
    passScore: 3,
    questions: [
      {
        id: 'py-1',
        question: 'How do you print in Python?',
        options: ['echo', 'console.log()', 'System.out.println()', 'print()'],
        correctIndex: 3,
      },
      {
        id: 'py-2',
        question: 'Which keyword defines a function?',
        options: ['function', 'func', 'define', 'def'],
        correctIndex: 3,
      },
      {
        id: 'py-3',
        question: 'How do you start a comment in Python?',
        options: ['//', '/*', '--', '#'],
        correctIndex: 3,
      },
      {
        id: 'py-4',
        question: 'Which syntax creates a Python list?',
        options: ['{1, 2, 3}', '(1, 2, 3)', '[1, 2, 3]', '<1, 2, 3>'],
        correctIndex: 2,
      },
      {
        id: 'py-5',
        question: 'What does "for item in list:" do?',
        options: [
          'Loops by index only',
          'Creates a new list',
          'Iterates each element directly',
          'Filters the list',
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    catKey: 'csharp',
    title: 'C# Certification',
    passScore: 3,
    questions: [
      {
        id: 'cs-1',
        question: 'C# was developed by which company?',
        options: ['Oracle', 'Google', 'Apple', 'Microsoft'],
        correctIndex: 3,
      },
      {
        id: 'cs-2',
        question: 'How do you print in C#?',
        options: ['echo', 'print()', 'System.out.println()', 'Console.WriteLine()'],
        correctIndex: 3,
      },
      {
        id: 'cs-3',
        question: 'What does "var" do in C#?',
        options: [
          'Declares a variant type',
          'Creates a nullable variable',
          'Lets the compiler infer the type',
          'Declares a dynamic variable',
        ],
        correctIndex: 2,
      },
      {
        id: 'cs-4',
        question: 'Which runtime executes C# code?',
        options: ['JVM', 'Node.js', 'Python VM', '.NET CLR'],
        correctIndex: 3,
      },
      {
        id: 'cs-5',
        question: 'How do you embed a value in a C# string?',
        options: [
          'Using printf format specifiers',
          'String concatenation only',
          'Using $"..." interpolation',
          'With String.format()',
        ],
        correctIndex: 2,
      },
    ],
  },
];

export function getExamByCat(catKey: string): Exam | undefined {
  return EXAMS.find((e) => e.catKey === catKey);
}
