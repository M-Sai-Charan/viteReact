import { useEffect, useState } from "react";
import "./RecipeDetails.css";

interface RecipeDetailsProps {
    id: number;
    onBack: () => void;
}

export default function RecipeDetails({ id, onBack }: RecipeDetailsProps) {
    const [recipe, setRecipe] = useState<any>(null);
    const API_KEY = "30af05ceb9f2454a91d54a5a81bfcd0e";

    useEffect(() => {
        fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
            .then((res) => res.json())
            .then((data) => setRecipe(data));
    }, [id]);

    if (!recipe) return <p className="loading">Loading...</p>;

    return (
        <div className="recipe-details">
            <button className="back-btn" onClick={onBack}>⬅ Back to Results</button>

            <div className="header-section">
                <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                <div className="recipe-info">
                    <h2>{recipe.title}</h2>
                    <p><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>
                    <p><strong>Servings:</strong> {recipe.servings}</p>
                    <p><strong>Health Score:</strong> {recipe.healthScore}/100</p>
                </div>
            </div>

            <div className="details-section">
                <div className="ingredients">
                    <h3>🛒 Ingredients</h3>
                    <ul>
                        {recipe.extendedIngredients.map((ing: any) => (
                            <li key={ing.id}>
                                <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ing.image}`} alt={ing.name} />
                                <span>{ing.original}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="instructions">
                    <h3>👨‍🍳 Instructions</h3>
                    {recipe.analyzedInstructions.length > 0 ? (
                        <ol>
                            {recipe.analyzedInstructions[0].steps.map((step: any) => (
                                <li key={step.number}>{step.step}</li>
                            ))}
                        </ol>
                    ) : (
                        <p dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
                    )}
                </div>
            </div>
        </div>
    );
}
