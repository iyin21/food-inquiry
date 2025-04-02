import { axiosInstance } from "./api.services"

import { RecipeResponse } from "@/types/recipe"

export const fetchRecipes = async ({ q }: { q: string }) => {
    const response = await axiosInstance.get<RecipeResponse>("/search", {
        headers: {
            "Edamam-Account-User":process.env.NEXT_PUBLIC_EDAMAN_ACCOUNT_USER,
        },
        params: {
            app_id: process.env.NEXT_PUBLIC_EDAMAN_APP_ID,
            app_key: process.env.NEXT_PUBLIC_EDAMAN_APP_KEY,
            q,
        },
    })
    return response.data
}
