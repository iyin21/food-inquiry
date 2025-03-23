import { fetchUSDRate } from "@/services/usdRate"
import { useQuery } from "@tanstack/react-query"

export const useUsdRate = () => {
    const result = useQuery({
        queryKey: ["usdRate"],
        queryFn: () => fetchUSDRate(),
    })
    return result
}
