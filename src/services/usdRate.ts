import axios from "axios"
import { ExchangeRateResponse } from "@/types/exchangeRate"

export const fetchUSDRate = async () => {
    const response = await axios.get<ExchangeRateResponse>(
        "https://api.exchangerate-api.com/v4/latest/NGN",
        
    )
    return response.data
}
