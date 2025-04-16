
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code, Play, Eye, Settings, Github, Save, Download } from "lucide-react";
import CodeEditor from "@/components/project/CodeEditor";
import ProjectPreview from "@/components/project/ProjectPreview";

interface ProjectWorkspaceProps {
  projectId: string;
}

export default function ProjectWorkspace({ projectId }: ProjectWorkspaceProps) {
  const [activeTab, setActiveTab] = useState("edit");
  const [devMode, setDevMode] = useState(false);
  
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Project header */}
      <div className="flex h-12 items-center justify-between border-b bg-background px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Project {projectId}</h1>
          <div className="text-xs text-muted-foreground">Last saved: 2 minutes ago</div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost">
            <Github className="mr-1 h-4 w-4" /> Connect
          </Button>
          <Button size="sm" variant="outline">
            <Save className="mr-1 h-4 w-4" /> Save
          </Button>
          <Button size="sm">
            <Download className="mr-1 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* Dev mode toggle */}
      <div className="flex h-10 items-center border-b bg-muted/40 px-4">
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">Dev Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={devMode}
              onChange={() => setDevMode(!devMode)}
            />
            <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-green"></div>
          </label>
        </div>
      </div>
      
      {/* Project workspace */}
      {devMode ? (
        <ResizablePanelGroup
          direction="horizontal"
          className="flex-1"
        >
          <ResizablePanel defaultSize={50} minSize={30}>
            <Tabs defaultValue="code" className="h-full">
              <div className="flex items-center border-b px-4">
                <TabsList className="bg-transparent p-0">
                  <TabsTrigger 
                    value="code"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
                  >
                    <Code className="mr-2 h-4 w-4" /> Code
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
                  >
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="code" className="h-[calc(100%-41px)] p-0 m-0 border-0">
                <CodeEditor />
              </TabsContent>
              
              <TabsContent value="settings" className="h-[calc(100%-41px)] p-4 m-0 border-0">
                <h2 className="text-lg font-semibold">Project Settings</h2>
                <p className="text-muted-foreground">Configure your project settings here.</p>
                {/* Settings content would go here */}
              </TabsContent>
            </Tabs>
          </ResizablePanel>
          
          <ResizableHandle withHandle className="bg-muted" />
          
          <ResizablePanel defaultSize={50} minSize={30}>
            <Tabs defaultValue="preview" className="h-full">
              <div className="flex items-center justify-between border-b px-4">
                <TabsList className="bg-transparent p-0">
                  <TabsTrigger 
                    value="preview"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
                  >
                    <Eye className="mr-2 h-4 w-4" /> Preview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="console"
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
                  >
                    <Code className="mr-2 h-4 w-4" /> Console
                  </TabsTrigger>
                </TabsList>
                
                <Button size="sm" variant="outline" className="h-8">
                  <Play className="mr-2 h-3 w-3" /> Run
                </Button>
              </div>
              
              <TabsContent value="preview" className="h-[calc(100%-41px)] p-0 m-0 border-0">
                <ProjectPreview />
              </TabsContent>
              
              <TabsContent value="console" className="h-[calc(100%-41px)] p-0 m-0 border-0">
                <ScrollArea className="h-full p-4 bg-black font-mono text-white text-sm">
                  <div className="space-y-1">
                    <p className="opacity-50">// Console output</p>
                    <p>App started at: {new Date().toLocaleTimeString()}</p>
                    <p className="text-green-400">✓ Compiled successfully</p>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <div className="flex items-center border-b px-4">
              <TabsList className="bg-transparent p-0">
                <TabsTrigger 
                  value="edit"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
                >
                  Edit
                </TabsTrigger>
                <TabsTrigger 
                  value="preview"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
                >
                  Preview
                </TabsTrigger>
              </TabsList>
              
              <div className="ml-auto">
                <Button size="sm" variant="outline" className="h-8">
                  <Play className="mr-2 h-3 w-3" /> Run
                </Button>
              </div>
            </div>
            
            <TabsContent value="edit" className="h-[calc(100%-41px)] p-4 m-0 border-0">
              {/* AI editing interface would go here */}
              <div className="flex flex-col h-full">
                <div className="flex-1 border rounded-lg p-4 overflow-auto">
                  <h2 className="text-lg font-semibold mb-4">AI Editor</h2>
                  <p className="text-muted-foreground">
                    Type your instructions here to edit your project using AI.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="h-[calc(100%-41px)] p-0 m-0 border-0">
              <ProjectPreview />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
