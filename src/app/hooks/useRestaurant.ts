import { fetchRestautrants } from "@/services/restaurant"
import { useQuery } from "@tanstack/react-query"

export function useRestaurants({ lat, lon }: { lat: number; lon: number }) {
    const result = useQuery({
        queryKey: ["recipes", lat, lon],
        queryFn: () => fetchRestautrants({ lat, lon }),
        enabled: !!lat && !!lon,
    })
    return result
}
