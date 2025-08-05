import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Trash2, ChevronRight } from 'lucide-react';
import cyberusLogo from '@/assets/Cyberus-logo.png';

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
    const poppedItem = stack[stack.length - 1];
    setRegister(poppedItem.value); // Put popped value into register
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

  // Calculate memory addresses (simulated)
  const baseAddress = 0x7fff0000;
  const getAddress = (index: number) => baseAddress - (index * 8); // 8 bytes per stack slot

  return (
    <div className="min-h-screen bg-background p-6">
      <img src={cyberusLogo} alt="Cyberus Logo" className="h-20" />
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
              x86-64 Stack Operations Demo
            </h1>
            <p className="text-lg text-muted-foreground">
              Learn how the CPU stack works in RAM with RSP and RBP registers
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Controls */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowDown className="h-5 w-5 text-primary" />
                Stack Controls
              </CardTitle>
              <CardDescription>
                Push/Pop operations on the memory stack
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Register Value</label>
                <Input
                  value={register}
                  onChange={(e) => setRegister(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter value (e.g., 0x42, 100)"
                  className="text-lg font-mono"
                />
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Button
                  onClick={push}
                  disabled={register.trim() === ''}
                  variant="stack"
                  size="wide"
                  className="flex items-center justify-center gap-2 h-14"
                >
                  <ArrowDown className="h-5 w-5" />
                  PUSH (RSP -= 8)
                </Button>
                
                <Button
                  onClick={pop}
                  disabled={stack.length === 0}
                  variant="stack-destructive"
                  size="wide"
                  className="flex items-center justify-center gap-2 h-14"
                >
                  <ArrowUp className="h-5 w-5" />
                  POP (RSP += 8)
                </Button>
                
                <Button
                  onClick={clear}
                  disabled={stack.length === 0}
                  variant="outline"
                  size="wide"
                  className="flex items-center justify-center gap-2 h-12"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Stack
                </Button>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-3">
                <h3 className="font-semibold">Register State</h3>
                <div className="text-sm space-y-2 font-mono">
                  <div className="flex justify-between">
                    <span className="font-medium text-stack-accent">RSP:</span>
                    <span>{stack.length > 0 ? `0x${getAddress(stack.length - 1).toString(16)}` : '0x' + baseAddress.toString(16)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-primary">RBP:</span>
                    <span>{stack.length > 0 ? `0x${getAddress(0).toString(16)}` : 'null'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Size:</span>
                    <span>{stack.length} * 8 = {stack.length * 8} bytes</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stack Visualization */}
          <Card className="lg:col-span-2 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-5 h-5 bg-stack-item rounded"></div>
                Memory Stack (grows downward)
              </CardTitle>
              <CardDescription>
                Visual representation of stack in RAM with pointer registers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-stack-container border-2 border-stack-container-border rounded-lg p-4 min-h-[500px]">
                <div className="flex">
                  {/* Memory addresses column */}
                  <div className="w-32 text-right pr-4 text-xs font-mono text-muted-foreground">
                    <div className="h-8 p-2 flex items-center justify-end border-r border-stack-container-border">
                      Address
                    </div>
                    {stack.length === 0 ? (
                      <div className="h-[60px] flex items-center justify-end">
                        0x{baseAddress.toString(16)}
                      </div>
                    ) : (
                      stack.map((_, index) => (
                        <div key={index} className="h-[60px] flex items-center justify-end">
                          0x{getAddress(index).toString(16)}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Stack content */}
                  <div className="flex-1">
                    <div className="h-8 flex items-center px-4 text-sm font-semibold border-b border-stack-container-border">
                      Stack Memory
                    </div>
                    
                    {stack.length === 0 ? (
                      <div className="text-center text-muted-foreground py-20">
                        <div className="text-6xl mb-4">📍</div>
                        <p className="text-lg font-medium">Stack is empty</p>
                        <p className="text-sm">Push values to see them grow downward</p>
                      </div>
                    ) : (
                      stack.map((item, index) => (
                        <div
                          key={item.id}
                          className="relative bg-stack-item text-stack-item-foreground px-4 py-3 rounded-lg shadow-md font-mono text-lg border-2 border-stack-item animate-stack-push mb-2 h-[52px] flex items-center"
                        >
                          <div className="flex justify-between items-center w-full">
                            <span className="font-semibold">{item.value}</span>
                            <div className="text-xs">
                              {index === 0 && (
                                <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full">
                                  BASE
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Pointer indicators */}
                  <div className="w-24 pl-4">
                    <div className="h-8 flex items-center text-sm font-semibold">
                      Pointers
                    </div>
                    
                    {stack.length === 0 ? (
                      <div className="h-[60px] flex items-center">
                        <div className="flex items-center gap-1 text-stack-accent font-mono text-sm animate-pointer-blink">
                          <ChevronRight className="h-4 w-4" />
                          RSP
                        </div>
                      </div>
                    ) : (
                      stack.map((_, index) => (
                        <div key={index} className="h-[60px] flex items-center justify-start">
                          <div className="flex items-center gap-1 font-mono text-sm">
                            {index === 0 && (
                              <div className="flex items-center gap-1 text-primary">
                                <ChevronRight className="h-4 w-4" />
                                RBP
                              </div>
                            )}
                            {index === stack.length - 1 && (
                              <div className="flex items-center gap-1 text-stack-accent animate-pointer-blink">
                                <ChevronRight className="h-4 w-4" />
                                RSP
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Educational Content */}
        <Card className="mt-8 border-2">
          <CardHeader>
            <CardTitle>x86-64 Stack Architecture</CardTitle>
            <CardDescription>
              Understanding how the CPU stack works in memory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-primary">PUSH Operation</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Decrements RSP by 8 bytes (64-bit)</li>
                  <li>• Stores value at new RSP location</li>
                  <li>• Stack grows toward lower addresses</li>
                  <li>• Assembly: <code className="bg-muted px-1 rounded">push rax</code></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-destructive">POP Operation</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Reads value from current RSP location</li>
                  <li>• Increments RSP by 8 bytes</li>
                  <li>• Stack shrinks toward higher addresses</li>
                  <li>• Assembly: <code className="bg-muted px-1 rounded">pop rax</code></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-stack-accent">Stack Registers</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• <strong>RSP</strong>: Stack pointer (top of stack)</li>
                  <li>• <strong>RBP</strong>: Base pointer (frame base)</li>
                  <li>• Stack grows from high to low addresses</li>
                  <li>• Each slot is 8 bytes on x86-64</li>
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