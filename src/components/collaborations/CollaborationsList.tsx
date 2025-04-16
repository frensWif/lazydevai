
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { PlusCircle, Users } from "lucide-react";

type Collaboration = {
  id: string;
  name: string;
  description: string;
  updated_at: string;
  members: {
    id: string;
    name: string;
    avatar_url?: string;
  }[];
};

export default function CollaborationsList() {
  const { user } = useAuth();
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // In a real app, this would fetch the user's collaborations from Supabase
    setTimeout(() => {
      setCollaborations([
        {
          id: "1",
          name: "Team Dashboard",
          description: "A dashboard for our team with key metrics and progress tracking",
          updated_at: "2023-04-15T10:30:00Z",
          members: [
            { id: "1", name: "Alex Chen", avatar_url: "https://i.pravatar.cc/150?img=1" },
            { id: "2", name: "Sarah Williams", avatar_url: "https://i.pravatar.cc/150?img=2" },
            { id: "3", name: "Mark Johnson", avatar_url: "https://i.pravatar.cc/150?img=3" },
          ],
        },
        {
          id: "2",
          name: "Client Portal",
          description: "A portal for our clients to track project progress and submit requests",
          updated_at: "2023-04-12T14:20:00Z",
          members: [
            { id: "1", name: "Alex Chen", avatar_url: "https://i.pravatar.cc/150?img=1" },
            { id: "4", name: "Emily Brown", avatar_url: "https://i.pravatar.cc/150?img=4" },
          ],
        },
      ]);
      setLoading(false);
    }, 1000);
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Collaborative Projects</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> New Collaboration
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[1, 2].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="p-6">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <Skeleton className="h-20 w-full" />
              </CardContent>
              <CardFooter className="flex justify-between p-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-8 w-8 rounded-full" />
                  ))}
                </div>
                <Skeleton className="h-9 w-24" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {collaborations.map((collaboration) => (
            <Card key={collaboration.id} className="overflow-hidden neon-card-hover">
              <CardHeader>
                <CardTitle>{collaboration.name}</CardTitle>
                <CardDescription>
                  Last updated: {new Date(collaboration.updated_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{collaboration.description}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {collaboration.members.map((member) => (
                    <Avatar key={member.id} className="border-2 border-background h-8 w-8">
                      <AvatarImage src={member.avatar_url} alt={member.name} />
                      <AvatarFallback className="text-xs">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                    {collaboration.members.length}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                >
                  <Link href={`/project/${collaboration.id}`}>
                    Open
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {!loading && collaborations.length === 0 && (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-8 text-center">
          <Users className="h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-medium">No collaborations yet</h3>
          <p className="text-sm text-muted-foreground">
            Create a new collaboration or wait for invites from others.
          </p>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> New Collaboration
          </Button>
        </div>
      )}
    </div>
  );
}
