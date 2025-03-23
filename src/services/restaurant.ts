import { axiosRestaurantInstance } from "./api.services"
import { RestaurantResponse } from "@/types/restaurant"

export const fetchRestautrants = async ({
    lat,
    lon,
}: {
    lat: number
    lon: number
}) => {
    const response = await axiosRestaurantInstance.get<RestaurantResponse[]>(
        "/api/restaurants",
        {
            params: {
               
                lat: lat,
                lon: lon,
                
            },
        }
    )
    return response.data
}
