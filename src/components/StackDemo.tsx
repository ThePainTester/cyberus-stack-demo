import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';

interface StackItem {
  id: number;
  value: string;
}

const StackDemo = () => {
  const [stack, setStack] = useState<StackItem[]>([]);
  const [register, setRegister] = useState('');
  const [nextId, setNextId] = useState(1);

  const push = () => {
    if (register.trim() === '') return;
    
    const newItem: StackItem = {
      id: nextId,
      value: register.trim()
    };
    
    setStack(prev => [...prev, newItem]);
    setRegister('');
    setNextId(prev => prev + 1);
  };

  const pop = () => {
    if (stack.length === 0) return;
    setStack(prev => prev.slice(0, -1));
  };

  const clear = () => {
    setStack([]);
    setRegister('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      push();
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Stack Operations Demo
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn how LIFO (Last In, First Out) stack operations work
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUp className="h-5 w-5 text-primary" />
                Stack Controls
              </CardTitle>
              <CardDescription>
                Enter values and use push/pop operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Register</label>
                <Input
                  value={register}
                  onChange={(e) => setRegister(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter value to push"
                  className="text-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button
                  onClick={push}
                  disabled={register.trim() === ''}
                  variant="stack"
                  size="wide"
                  className="flex-col gap-1 h-16"
                >
                  <ArrowUp className="h-5 w-5" />
                  Push
                </Button>
                
                <Button
                  onClick={pop}
                  disabled={stack.length === 0}
                  variant="stack-destructive"
                  size="wide"
                  className="flex-col gap-1 h-16"
                >
                  <ArrowDown className="h-5 w-5" />
                  Pop
                </Button>
                
                <Button
                  onClick={clear}
                  disabled={stack.length === 0}
                  variant="outline"
                  size="wide"
                  className="flex-col gap-1 h-16"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear
                </Button>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Stack Info</h3>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Size:</span> {stack.length}</p>
                  <p><span className="font-medium">Top:</span> {stack.length > 0 ? stack[stack.length - 1].value : 'Empty'}</p>
                  <p><span className="font-medium">Bottom:</span> {stack.length > 0 ? stack[0].value : 'Empty'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stack Visualization */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-5 h-5 bg-stack-item rounded"></div>
                Stack Visualization
              </CardTitle>
              <CardDescription>
                Visual representation of the stack (top to bottom)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-stack-container border-2 border-stack-container-border rounded-lg p-4 min-h-[400px]">
                <div className="flex flex-col-reverse gap-2">
                  {stack.length === 0 ? (
                    <div className="text-center text-muted-foreground py-20">
                      <div className="text-6xl mb-4">📦</div>
                      <p className="text-lg font-medium">Stack is empty</p>
                      <p className="text-sm">Push some values to see them here</p>
                    </div>
                  ) : (
                    stack.map((item, index) => (
                      <div
                        key={item.id}
                        className={`
                          relative bg-stack-item text-stack-item-foreground 
                          px-4 py-3 rounded-lg shadow-md font-mono text-lg
                          border-2 transition-all duration-300
                          ${index === stack.length - 1 
                            ? 'border-stack-accent ring-2 ring-stack-accent/30 shadow-lg' 
                            : 'border-stack-item'
                          }
                        `}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{item.value}</span>
                          <div className="text-xs opacity-80">
                            {index === stack.length - 1 && (
                              <span className="bg-stack-accent text-stack-accent-foreground px-2 py-1 rounded-full">
                                TOP
                              </span>
                            )}
                            {index === 0 && stack.length > 1 && (
                              <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full">
                                BOTTOM
                              </span>
                            )}
                          </div>
                        </div>
                        {index === stack.length - 1 && (
                          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                            <ArrowUp className="h-5 w-5 text-stack-accent animate-pulse" />
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Operations History */}
        <Card className="mt-8 border-2">
          <CardHeader>
            <CardTitle>How Stack Operations Work</CardTitle>
            <CardDescription>
              Understanding LIFO (Last In, First Out) principle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-primary">Push Operation</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Adds a new element to the top of the stack</li>
                  <li>• Increases stack size by 1</li>
                  <li>• The new element becomes the new "top"</li>
                  <li>• Time complexity: O(1)</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-destructive">Pop Operation</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Removes the top element from the stack</li>
                  <li>• Decreases stack size by 1</li>
                  <li>• The next element becomes the new "top"</li>
                  <li>• Time complexity: O(1)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StackDemo;