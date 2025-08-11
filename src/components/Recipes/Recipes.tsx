import { useState } from "react";
import RecipeDetails from "./RecipeDetails";
import RecipeInput from "./RecipeInput";
import RecipeList from "./RecipeList";


export default function Recipes() {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const API_KEY = "30af05ceb9f2454a91d54a5a81bfcd0e";

    const searchRecipes = (query: string) => {
        fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=12&apiKey=${API_KEY}`)
            .then((res) => res.json())
            .then((data) => setRecipes(data.results));
    };

    return (
        <div>
            {selectedId ? (
                <RecipeDetails id={selectedId} onBack={() => setSelectedId(null)} />
            ) : (
                <>
                    <RecipeInput onSearch={searchRecipes} />
                    <RecipeList recipes={recipes} onSelect={(id) => setSelectedId(id)} />
                </>
            )}
        </div>
    );
}
