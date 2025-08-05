# Cyberus Memory Stack Demo

![Cyberus Logo](/src/assets/Cyberus-logo.png)  
*An interactive demonstration of memory stack operations*

## Project Overview

This project is an educational web application developed for Cyberus, a university club focused on computer science and programming education. The application provides an interactive visualization of how memory stacks work in computer systems.

## Features

- **Interactive Stack Visualization**: Watch the stack grow and shrink in real-time
- **Step-by-Step Execution**: Understand each operation with controlled execution
- **Visual Feedback**: Color-coded elements for better comprehension
- **Common Operations**: Supports push, and pop operations

## Getting Started

### Prerequisites

- Node.js
- npm or Yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ThePainTester/cyberus-stack-demo.git
   cd cyberus-stack-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## How to Use

1. **Push Operation**: Add a new value to the top of the stack
2. **Pop Operation**: Remove the top value from the stack
3. **Peek Operation**: View the top value without removing it
4. **Step Through**: Use the step controls to execute operations one at a time
5. **Reset**: Clear the stack and start over

## Project Structure

```
cyberus-stack-demo/
├── src/
│   ├── components/     # React components
│   ├── styles/        # CSS/SCSS files
│   ├── utils/         # Utility functions
│   └── App.tsx        # Main application component
├── public/            # Static files
└── README.md          # This file
```

## Contributing

We welcome contributions from the community! If you'd like to contribute to this project:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Developed for Cyberus University Club
- Built with React, TypeScript, and Vite

## What technologies are used for this project?

This project is built with:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS