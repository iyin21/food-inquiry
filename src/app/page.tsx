"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRecipeSearch } from "./hooks/useRecipes"
import { useUsdRate } from "./hooks/useUsdRate"
//import Lottie from "lottie-react"
//import loadingAnimation from "../../public/loading.json"
import UsdRateModal from "./ui/home/usdRateModal"
import { Hits } from "@/types/recipe"
import { Button } from "./ui/home/button"
import Link from "next/link"
import { FiSearch } from "react-icons/fi"

interface RecipeInterface {
    image: string
    label: string
    calories: number
    cost: number
}
export default function Home() {
    const [query, setQuery] = useState("")
    const [searchText, setSearchText] = useState("")
    const [recipes, setRecipes] = useState<RecipeInterface[]>([])
    const [cost, setCost] = useState(0)
    const [showModal, setShowModal] = useState(false)

    
    const { data, isLoading } = useRecipeSearch({ q: searchText })
    const { data: usdRateData } = useUsdRate()
    
    useEffect(() => {
        if (data) {
            const recipeData = data?.hits.map((item: Hits) => ({
                image: item.recipe.image,
                label: item.recipe.label,
                calories: item.recipe.calories,
                cost: Math.floor(Math.random() * 5000) + 1000,
            }))

            setRecipes(recipeData || [])
        }
    }, [data])
    

    return (
        
        <div className="min-h-screen bg-purple-100 p-8">
            <h1 className="text-3xl font-bold text-purple-700 text-center">
                Food Inquiry App
            </h1>
            <div className="flex justify-center mt-2">
                <Link href={"/restaurants"} className="text-lg underline ">
                    Click here to view Restaurants nearby
                </Link>
            </div>
            <p className="text-center mt-2 text-lg">
                Search for any food recipe below and get their calorie count and
                cost
            </p>

            <div className="flex justify-center mt-6">
                <div className="flex bg-[#F4F4F4]  items-center rounded-md  px-4 py-3 border">
                    <FiSearch size="22px" color="#868686" />
                    <input
                        className="pl-2 outline-none"
                        type="text"
                        placeholder="Search for a recipe..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <Button
                    className="ml-2 bg-purple-600 text-white p-2 rounded-md"
                    onClick={() => setSearchText(query)}
                    disabled={isLoading}
                >
                    Search
                </Button>
            </div>
            {isLoading ? (
                <p>loading...</p>
            ) : (
                // <Lottie
                //     animationData={loadingAnimation}
                //     className="w-20 mx-auto mt-6"
                // />
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6 ">
                    {recipes.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white  rounded-lg shadow-lg"
                        >
                            <Image
                                src={item.image}
                                alt={item.label}
                                className="w-full h-50 object-cover rounded-md"
                            />
                            <div className=" p-4  ">
                                <h2 className="text-[16px] font-semibold mt-2">
                                    {item.label}
                                </h2>
                                <p className="text-[14px]">
                                    Calories: {Math.floor(item.calories)} kcal
                                </p>
                                <p className="text-[14px]">
                                    Cost: ₦{item.cost}
                                </p>
                                <Button
                                    className="mt-2 bg-purple-500 text-white p-2 rounded-md"
                                    onClick={() => {
                                        setCost(item.cost)
                                        setShowModal(true)
                                    }}
                                >
                                    Click to see USD
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {showModal && (
                <UsdRateModal
                    cost={cost}
                    setShowModal={setShowModal}
                    usdRate={usdRateData?.rates.USD || 0}
                />
            )}
        </div>
    )
}
