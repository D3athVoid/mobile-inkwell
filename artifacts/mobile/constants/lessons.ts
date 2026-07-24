export interface Lesson {
  slug: string;
  title: string;
  summary: string;
  body: string;
  code?: string;
  html?: string;
  css?: string;
  js?: string;
}

export interface Category {
  key: string;
  label: string;
  color: string;
  tagline: string;
  runnable: boolean;
  filename?: string;
  lessons: Lesson[];
}

export const CATEGORIES: Category[] = [
  {
    key: 'html',
    label: 'HTML',
    color: '#c9622b',
    tagline: 'Structure the page',
    runnable: true,
    lessons: [
      {
        slug: 'intro',
        title: 'Your First Element',
        summary: 'Tags, elements, and the skeleton every page shares.',
        body: 'An HTML element is a start tag, some content, and an end tag. Browsers read the tags and decide how to lay everything out — nothing renders until you tell it what it is.\n\nEvery page needs the same three landmarks: <!DOCTYPE html> so the browser knows the rules, an <html> root, and a <body> for anything visible.\n\nChange the heading and paragraph below and press Run to see it update.',
        html: '<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Hello, Inkwell</h1>\n    <p>Edit this paragraph, then press Run.</p>\n  </body>\n</html>',
        css: 'body {\n  font-family: sans-serif;\n  padding: 24px;\n}',
        js: '',
      },
      {
        slug: 'attributes',
        title: 'Attributes & Links',
        summary: 'Give elements extra instructions — hrefs, sources, and ids.',
        body: 'Attributes live inside the opening tag and add information the browser needs: where a link goes, where an image lives, which element a style targets.\n\nAn attribute is always name="value". A link needs href; an image needs src.\n\nTry adding a second link, or point the image at a different URL.',
        html: '<a href="https://example.com">Visit example.com</a>\n<p>Attributes go inside the opening tag.</p>\n<img src="https://placehold.co/200x100" alt="placeholder">',
        css: 'body { font-family: sans-serif; padding: 24px; }\na { color: #c9622b; }',
        js: '',
      },
      {
        slug: 'lists-tables',
        title: 'Lists & Tables',
        summary: 'Group items and line up data in rows and columns.',
        body: '<ul> makes an unordered list, <ol> an ordered one, and each item is a <li>. Tables use <table> with <tr> for rows and <td> for cells.\n\nTry adding a third row to the table.',
        html: '<ul>\n  <li>Learn HTML</li>\n  <li>Learn CSS</li>\n</ul>\n\n<table border="1">\n  <tr><th>Language</th><th>Job</th></tr>\n  <tr><td>HTML</td><td>Structure</td></tr>\n</table>',
        css: 'body { font-family: sans-serif; padding: 24px; }\ntable { border-collapse: collapse; margin-top: 12px; }\ntd, th { padding: 6px 12px; }',
        js: '',
      },
    ],
  },
  {
    key: 'css',
    label: 'CSS',
    color: '#2d5c4c',
    tagline: 'Style what you built',
    runnable: true,
    lessons: [
      {
        slug: 'selectors',
        title: 'Selectors & the Box Model',
        summary: 'Target elements, then control their padding, border, and margin.',
        body: 'A selector points at elements: a tag name (p), a class (.card), or an id (#header). Every element is a box with content → padding → border → margin, working outward.\n\nTry raising the padding or adding a border-radius to the card.',
        html: '<div class="card">\n  <h2>Box Model</h2>\n  <p>Padding sits inside the border. Margin sits outside it.</p>\n</div>',
        css: '.card {\n  background: #fdf6ec;\n  border: 2px solid #2d5c4c;\n  padding: 20px;\n  margin: 20px;\n  border-radius: 4px;\n  font-family: sans-serif;\n}',
        js: '',
      },
      {
        slug: 'flexbox',
        title: 'Flexbox Layout',
        summary: 'Line elements up in a row or column without floats or hacks.',
        body: 'Set display: flex on a parent and its children line up along a row by default. justify-content spaces them out; align-items lines them up vertically; gap adds space between them.\n\nChange justify-content to center or space-between and watch the boxes move.',
        html: '<div class="row">\n  <div class="box">1</div>\n  <div class="box">2</div>\n  <div class="box">3</div>\n</div>',
        css: '.row {\n  display: flex;\n  gap: 12px;\n  justify-content: flex-start;\n  padding: 24px;\n}\n.box {\n  background: #2d5c4c;\n  color: white;\n  width: 60px;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: sans-serif;\n  border-radius: 4px;\n}',
        js: '',
      },
      {
        slug: 'transitions',
        title: 'Transitions',
        summary: 'Animate a property change instead of snapping to it.',
        body: 'The transition property tells the browser to animate a property change over time instead of jumping straight to it. Pair it with a :hover state.\n\nHover the button, then try changing the transition duration.',
        html: '<button class="grow">Hover me</button>',
        css: 'button.grow {\n  padding: 12px 20px;\n  font-family: sans-serif;\n  background: #2d5c4c;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  transition: transform 0.25s ease;\n}\nbutton.grow:hover {\n  transform: scale(1.1);\n}',
        js: '',
      },
    ],
  },
  {
    key: 'js',
    label: 'JavaScript',
    color: '#3b5fe0',
    tagline: 'Make it interactive',
    runnable: true,
    lessons: [
      {
        slug: 'variables',
        title: 'Variables & Console',
        summary: 'Store values, then log them to see what your code is doing.',
        body: 'let declares a variable that can change; const declares one that cannot be reassigned. console.log() prints a value — open the Console tab below the preview to see it.\n\nChange the values and press Run.',
        html: '<h2>Open the Console tab to see output</h2>',
        css: 'body { font-family: sans-serif; padding: 24px; }',
        js: 'let name = "learner";\nconst greeting = "Hello, " + name + "!";\nconsole.log(greeting);',
      },
      {
        slug: 'dom',
        title: 'Touching the DOM',
        summary: 'Select an element and change what it shows, live.',
        body: 'document.getElementById() grabs an element by its id. Once you have it, you can read or change its textContent, styles, or attributes.\n\nClick the button — its script updates the paragraph above it.',
        html: '<p id="msg">Nothing clicked yet.</p>\n<button id="btn">Click me</button>',
        css: 'body { font-family: sans-serif; padding: 24px; }\nbutton { padding: 8px 16px; }',
        js: 'document.getElementById("btn").addEventListener("click", function () {\n  document.getElementById("msg").textContent = "Button was clicked!";\n});',
      },
      {
        slug: 'events',
        title: 'Events & Functions',
        summary: 'Respond to what the user does.',
        body: 'An event listener waits for something to happen — a click, a keypress, a page load — and runs a function when it does. Functions let you name a block of logic and reuse it.\n\nTry typing into the input; the count updates as you type.',
        html: '<input id="box" placeholder="Type here">\n<p id="count">Characters: 0</p>',
        css: 'body { font-family: sans-serif; padding: 24px; }',
        js: 'function updateCount() {\n  const value = document.getElementById("box").value;\n  document.getElementById("count").textContent = "Characters: " + value.length;\n}\ndocument.getElementById("box").addEventListener("input", updateCount);',
      },
    ],
  },
  {
    key: 'php',
    label: 'PHP',
    color: '#8a3ffc',
    tagline: 'Run it on the server',
    runnable: false,
    filename: 'index.php',
    lessons: [
      {
        slug: 'basics',
        title: 'Echo & Variables',
        summary: 'PHP runs before the page reaches the browser.',
        body: 'PHP code lives between <?php and ?> and runs on the server, before HTML is sent out. echo writes text into the page. Variables start with $.\n\nPHP needs a server to run, so this editor shows syntax highlighting only. Copy the code and run it with php -S localhost:8000, or on any PHP host.',
        code: '<?php\n$name = "learner";\necho "<h1>Hello, " . $name . "!</h1>";\n?>\n<p>This line is plain HTML.</p>',
      },
      {
        slug: 'forms',
        title: 'Handling Form Data',
        summary: 'Read what a visitor typed once they submit a form.',
        body: 'When a form\'s method is POST, the submitted fields arrive in PHP\'s $_POST array, keyed by each input\'s name.\n\nSave this as handle.php on a PHP server and submit the form to see it run.',
        code: '<form method="POST" action="handle.php">\n  <input name="username" placeholder="Your name">\n  <button type="submit">Send</button>\n</form>\n\n<?php\n// handle.php\nif ($_SERVER[\'REQUEST_METHOD\'] === \'POST\') {\n  echo "Hello, " . htmlspecialchars($_POST[\'username\']);\n}\n?>',
      },
      {
        slug: 'mysql',
        title: 'Connecting to MySQL',
        summary: 'The pattern behind almost every PHP + MySQL app.',
        body: 'Most PHP sites talk to a MySQL database with mysqli or PDO. The shape is always the same: connect, prepare a query, run it, read the rows.\n\nThis needs a real database to run — copy it into a project connected to MySQL.',
        code: '<?php\n$conn = new mysqli("localhost", "user", "pass", "my_db");\n$result = $conn->query("SELECT title FROM lessons");\nwhile ($row = $result->fetch_assoc()) {\n  echo "<li>" . htmlspecialchars($row[\'title\']) . "</li>";\n}\n$conn->close();\n?>',
      },
    ],
  },
  {
    key: 'c',
    label: 'C',
    color: '#5c6bc0',
    tagline: 'Close to the machine',
    runnable: false,
    filename: 'main.c',
    lessons: [
      {
        slug: 'intro',
        title: 'Hello, World',
        summary: 'Every C program starts at main().',
        body: 'A C program needs a main() function — that\'s where execution begins. #include <stdio.h> pulls in the standard input/output library so printf is available.\n\nC is compiled, not interpreted: save this as main.c, then run gcc main.c -o main && ./main to see it print.',
        code: '#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!\\n");\n    return 0;\n}',
      },
      {
        slug: 'variables',
        title: 'Variables & Types',
        summary: "C makes you say what kind of data you're storing.",
        body: 'Unlike JavaScript, C requires a type for every variable: int for whole numbers, float/double for decimals, char for a single character. The size is fixed once you choose it.',
        code: '#include <stdio.h>\n\nint main(void) {\n    int age = 30;\n    double price = 19.99;\n    char grade = \'A\';\n\n    printf("Age: %d\\n", age);\n    printf("Price: %.2f\\n", price);\n    printf("Grade: %c\\n", grade);\n    return 0;\n}',
      },
      {
        slug: 'functions',
        title: 'Functions & Loops',
        summary: 'Reusable blocks of logic, and repeating a block on purpose.',
        body: 'A function declares the type it returns before its name. A for loop repeats a block a set number of times — useful for anything counted.',
        code: '#include <stdio.h>\n\nint square(int n) {\n    return n * n;\n}\n\nint main(void) {\n    for (int i = 1; i <= 5; i++) {\n        printf("%d squared is %d\\n", i, square(i));\n    }\n    return 0;\n}',
      },
    ],
  },
  {
    key: 'cpp',
    label: 'C++',
    color: '#00599c',
    tagline: 'C with objects',
    runnable: false,
    filename: 'main.cpp',
    lessons: [
      {
        slug: 'intro',
        title: 'Hello, World',
        summary: 'iostream replaces printf with cout.',
        body: 'C++ builds on C but adds <iostream> for input/output. std::cout << sends values to the console; << chains as many as you like.\n\nCompile with g++ main.cpp -o main && ./main',
        code: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
      },
      {
        slug: 'classes',
        title: 'Classes & Objects',
        summary: 'Bundle data and the functions that act on it.',
        body: 'A class groups related data (members) with the functions that operate on it (methods). public: marks what outside code is allowed to touch.',
        code: '#include <iostream>\n#include <string>\n\nclass Dog {\npublic:\n    std::string name;\n\n    void bark() {\n        std::cout << name << " says woof!" << std::endl;\n    }\n};\n\nint main() {\n    Dog d;\n    d.name = "Rex";\n    d.bark();\n    return 0;\n}',
      },
      {
        slug: 'vectors',
        title: 'Vectors',
        summary: 'A resizable array from the standard library.',
        body: 'std::vector is a growable list — like a JavaScript array, but typed. A range-based for loop walks every element without needing an index.',
        code: '#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> scores = {90, 85, 77};\n    scores.push_back(100);\n\n    for (int s : scores) {\n        std::cout << s << std::endl;\n    }\n    return 0;\n}',
      },
    ],
  },
  {
    key: 'java',
    label: 'Java',
    color: '#e76f00',
    tagline: 'Write once, run anywhere',
    runnable: false,
    filename: 'Main.java',
    lessons: [
      {
        slug: 'intro',
        title: 'Hello, World',
        summary: 'Every Java file starts with a class.',
        body: 'Java code always lives inside a class, and execution starts at public static void main(String[] args). The file name must match the public class name.\n\nCompile with javac Main.java, then run java Main.',
        code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
      },
      {
        slug: 'variables',
        title: 'Variables & Types',
        summary: 'Like C, Java wants to know the type up front.',
        body: 'Common types: int, double, boolean, and String for text (capitalized, since it\'s a class, not a primitive).',
        code: 'public class Main {\n    public static void main(String[] args) {\n        int age = 30;\n        double price = 19.99;\n        String name = "learner";\n\n        System.out.println(name + " is " + age + " years old.");\n        System.out.println("Price: " + price);\n    }\n}',
      },
      {
        slug: 'methods',
        title: 'Methods & Loops',
        summary: 'Named blocks of logic, called by other code.',
        body: 'A method declares a return type, a name, and parameters. static methods belong to the class itself rather than an instance of it.',
        code: 'public class Main {\n    static int square(int n) {\n        return n * n;\n    }\n\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) {\n            System.out.println(i + " squared is " + square(i));\n        }\n    }\n}',
      },
    ],
  },
  {
    key: 'python',
    label: 'Python',
    color: '#3776ab',
    tagline: 'Readable by design',
    runnable: false,
    filename: 'main.py',
    lessons: [
      {
        slug: 'intro',
        title: 'Hello, World',
        summary: 'No types, no semicolons, no boilerplate.',
        body: 'Python reads close to plain English. print() writes to the console, and indentation — not braces — defines a block.\n\nRun it with python3 main.py.',
        code: 'print("Hello, World!")',
      },
      {
        slug: 'lists',
        title: 'Lists & Loops',
        summary: 'A built-in, flexible collection type.',
        body: 'A Python list holds any mix of values and grows as needed. for item in list: walks every element directly, without an index variable.',
        code: 'scores = [90, 85, 77]\nscores.append(100)\n\nfor s in scores:\n    print(s)',
      },
      {
        slug: 'functions',
        title: 'Functions',
        summary: 'Defined with def, no return type declared.',
        body: 'def starts a function definition. Python infers types at runtime, so there\'s no type to declare up front — just name the parameters.',
        code: 'def square(n):\n    return n * n\n\nfor i in range(1, 6):\n    print(f"{i} squared is {square(i)}")',
      },
    ],
  },
  {
    key: 'csharp',
    label: 'C#',
    color: '#68217a',
    tagline: "Microsoft's managed language",
    runnable: false,
    filename: 'Program.cs',
    lessons: [
      {
        slug: 'intro',
        title: 'Hello, World',
        summary: "Console.WriteLine is C#'s print statement.",
        body: 'Modern C# supports a minimal top-level style — no explicit class or Main needed for a simple script. Console.WriteLine prints a line.\n\nRun it with dotnet run inside a new console project.',
        code: 'Console.WriteLine("Hello, World!");',
      },
      {
        slug: 'variables',
        title: 'Variables & Types',
        summary: 'Statically typed, with type inference available.',
        body: 'C# is statically typed like Java, but var lets the compiler infer the type from the assigned value.',
        code: 'int age = 30;\ndouble price = 19.99;\nvar name = "learner"; // inferred as string\n\nConsole.WriteLine($"{name} is {age} years old.");\nConsole.WriteLine($"Price: {price}");',
      },
      {
        slug: 'methods',
        title: 'Methods & Loops',
        summary: 'Static methods and a classic for loop.',
        body: 'A static method belongs to the class rather than an instance. String interpolation with $"..." embeds expressions directly in text.',
        code: 'static int Square(int n) => n * n;\n\nfor (int i = 1; i <= 5; i++) {\n    Console.WriteLine($"{i} squared is {Square(i)}");\n}',
      },
    ],
  },
];

export function getCategoryByKey(key: string): Category | undefined {
  return CATEGORIES.find((c) => c.key === key);
}

export function getLessonBySlug(catKey: string, slug: string): Lesson | undefined {
  const cat = getCategoryByKey(catKey);
  return cat?.lessons.find((l) => l.slug === slug);
}

export function getLessonNeighbors(
  catKey: string,
  slug: string
): { prev: Lesson | null; next: Lesson | null } {
  const cat = getCategoryByKey(catKey);
  if (!cat) return { prev: null, next: null };
  const idx = cat.lessons.findIndex((l) => l.slug === slug);
  return {
    prev: idx > 0 ? cat.lessons[idx - 1] : null,
    next: idx < cat.lessons.length - 1 ? cat.lessons[idx + 1] : null,
  };
}

export const TOTAL_LESSONS = CATEGORIES.reduce((sum, c) => sum + c.lessons.length, 0);
