"use client"
import { useEffect, useState } from "react"
import { FaMapMarkerAlt } from "react-icons/fa"
import { useRestaurants } from "app/hooks/useRestaurant"

const Restaurants = () => {
    const [location, setLocation] = useState({ lat: 0, long: 0 })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords

                    setLocation({ lat: latitude, long: longitude })
                },
               
                (
                  
                  error
                ) => {
                  console.error("API Error:", error);
                    setError("Location access denied.")
                }
            )
        } else {
            setError("Geolocation is not supported.")
            setLoading(false)
        }
    }, [])
    const { data, isLoading } = useRestaurants({
        lat: location.lat,
        lon: location.long,
    })
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-purple-700 mb-4">
                Restaurants Near You
            </h1>

            {(loading || isLoading) && (
                <p className="text-lg">Fetching restaurants...</p>
            )}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data?.map((restaurant, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 shadow-md rounded-lg w-80"
                    >
                        <h2 className="text-xl font-semibold">
                            {restaurant.display_name}
                        </h2>
                        <p className="text-gray-600">
                            <FaMapMarkerAlt className="inline-block text-red-500" />{" "}
                            {restaurant.address
                                ? restaurant.address
                                : "Unknown location"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Restaurants
