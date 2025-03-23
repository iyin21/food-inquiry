import { axiosInstance } from "./api.services"
import { RecipeResponse } from "@/types/recipe"

export const fetchRecipes = async ({ q }: { q: string }) => {
    const response = await axiosInstance.get<RecipeResponse>("/search", {
        headers: {
            "Edamam-Account-User": "Iyin",
        },
        params: {
            app_id: "c143d570",
            app_key: "e77a6064c858b48d64b0882f232203a5",
            q,
        },
    })
    return response.data
}
