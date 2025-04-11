
import { Search, Sliders } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MarketplaceSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  sortOrder: "popular" | "recent";
  onSortOrderChange: (value: "popular" | "recent") => void;
}

export function MarketplaceSearch({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  sortOrder,
  onSortOrderChange
}: MarketplaceSearchProps) {
  return (
    <div className="mb-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input 
            placeholder="Search projects..." 
            className="pl-9 focus-visible:ring-neon-green/50"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="min-w-[160px] focus:ring-neon-green/50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="vue.js">Vue.js</SelectItem>
              <SelectItem value="flutter">Flutter</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortOrder} onValueChange={(value) => onSortOrderChange(value as "popular" | "recent")}>
            <SelectTrigger className="min-w-[120px] focus:ring-neon-green/50">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="recent">Recent</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon" className="hover:bg-neon-green/10 hover:border-neon-green">
            <Sliders className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
