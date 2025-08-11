import { useState } from "react";
import "./RecipeInput.css";

interface RecipeInputProps {
  onSearch: (query: string) => void;
}

export default function RecipeInput({ onSearch }: RecipeInputProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form className="recipe-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
