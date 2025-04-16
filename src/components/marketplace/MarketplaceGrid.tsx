
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Download, Eye } from "lucide-react";

type MarketplaceItem = {
  id: string;
  title: string;
  description: string;
  author: string;
  downloads: number;
  tags: string[];
  thumbnail?: string;
};

export default function MarketplaceGrid() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch marketplace items from Supabase
    setTimeout(() => {
      setItems([
        {
          id: "1",
          title: "SaaS Starter Kit",
          description: "A complete SaaS starter kit with authentication, billing, and user management",
          author: "LazyDev Team",
          downloads: 1287,
          tags: ["saas", "next.js", "stripe"]
        },
        {
          id: "2",
          title: "E-commerce Template",
          description: "A fully functional e-commerce site with product catalog, cart, and checkout",
          author: "Mark Johnson",
          downloads: 856,
          tags: ["e-commerce", "next.js", "stripe"]
        },
        {
          id: "3",
          title: "Blog Platform",
          description: "A modern blog platform with Markdown support and SEO optimization",
          author: "Sarah Williams",
          downloads: 643,
          tags: ["blog", "markdown", "seo"]
        },
        {
          id: "4",
          title: "Portfolio Site",
          description: "A clean portfolio site for developers and designers",
          author: "Alex Chen",
          downloads: 421,
          tags: ["portfolio", "animation", "tailwind"]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-40 bg-muted">
                <Skeleton className="h-full w-full" />
              </div>
              <CardHeader className="p-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Skeleton className="h-20 w-full" />
              </CardContent>
              <CardFooter className="flex justify-between p-4">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden neon-card-hover">
              <div className="h-40 bg-gradient-to-br from-purple-600/20 to-neon-green/10 flex items-center justify-center">
                {item.thumbnail ? (
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-muted-foreground/50">{item.title.substring(0, 2)}</span>
                )}
              </div>
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <CardTitle>{item.title}</CardTitle>
                  <Badge variant="outline" className="ml-2">
                    {item.downloads} <Download className="ml-1 h-3 w-3" />
                  </Badge>
                </div>
                <CardDescription>By {item.author}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {item.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/marketplace/${item.id}`}>
                    <Eye className="mr-2 h-4 w-4" /> Preview
                  </Link>
                </Button>
                <Button size="sm">Use Template</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
