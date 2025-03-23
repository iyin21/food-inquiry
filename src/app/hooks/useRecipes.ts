import { fetchRecipes } from "@/services/recipes"
import { useQuery } from "@tanstack/react-query"

export function useRecipeSearch({ q }: { q: string }) {
    const result = useQuery({
        queryKey: ["recipes"],
        queryFn: () => fetchRecipes({ q }),
        enabled: false
    })
    return result
}
