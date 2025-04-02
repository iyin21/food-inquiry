import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL


const RESTAURANT_BASE_URL="http://localhost:3000"


export const axiosInstance = axios.create({
    baseURL: BASE_URL,
})
export const axiosExchangeRateInstance = axios.create({
    baseURL: BASE_URL,
})

export const axiosRestaurantInstance = axios.create({
    baseURL: RESTAURANT_BASE_URL,
})
