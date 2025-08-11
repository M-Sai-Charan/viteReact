import "./RecipeList.css";

interface Recipe {
    id: number;
    title: string;
    image: string;
}

interface RecipeListProps {
    recipes: Recipe[];
    onSelect: (id: number) => void;
}

export default function RecipeList({ recipes, onSelect }: RecipeListProps) {
    return (
        <div className="recipe-list">
            {recipes.map((recipe) => (
                <div key={recipe.id} className="recipe-card" onClick={() => onSelect(recipe.id)}>
                    <img src={recipe.image} alt={recipe.title} />
                    <h3>{recipe.title}</h3>
                </div>
            ))}
        </div>
    );
}
