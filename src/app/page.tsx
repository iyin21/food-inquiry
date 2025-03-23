"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRecipeSearch } from "./hooks/useRecipes"
import { useUsdRate } from "./hooks/useUsdRate"
import loadingAnimation from "../../public/loading.json"
import UsdRateModal from "./ui/home/usdRateModal"
import { Hits } from "@/types/recipe"
import { Button } from "./ui/home/button"
import Link from "next/link"
import { FiSearch } from "react-icons/fi"
import dynamic from "next/dynamic"
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

interface RecipeInterface {
    image: string
    label: string
    calories: number
    cost: number
}
export default function Home() {
    const [query, setQuery] = useState("")

    const [recipes, setRecipes] = useState<RecipeInterface[]>([])
    const [cost, setCost] = useState(0)
    const [showModal, setShowModal] = useState(false)

    const { data, refetch, isFetching } = useRecipeSearch({ q: query })
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
        <div className={`min-h-screen`}>
            {!data && !isFetching ? (
                <div
                    className={`px-8 bg-[url("/foodBackground1.jpeg")] bg-cover md:pt-60 pt-40  items-center  min-h-screen `}
                >
                    <h1 className="text-3xl font-bold text-purple-700 text-center ">
                        Food Inquiry App
                    </h1>
                    <div className="flex justify-center mt-2 text-center">
                        <Link
                            href={"/restaurants"}
                            className="text-lg underline  font-semibold"
                        >
                            <span className="text-center">
                                Click here to view Restaurants nearby
                            </span>
                        </Link>
                    </div>
                    <p className="text-center mt-2 text-lg font-semibold text-white  drop-shadow-lg">
                        Search for any food recipe below and get their calorie
                        count and cost
                    </p>

                    <div className="flex justify-center mt-6">
                        <div className="flex bg-white [#F4F4F4]  items-center rounded-md  px-4 py-3 md:w-2/4 justify-between">
                            <input
                                className="pl-2 outline-none"
                                type="text"
                                placeholder={"Search for a recipe..."}
                                value={query}
                                onChange={(e) =>
                                    setQuery(e.target.value)
                                }
                            />
                            <button
                                className="ml-2  text-white p-2 rounded-md bg-[white] hover:bg-[#F4F4F4] cursor-pointer"
                                onClick={() => {query && refetch(); setQuery("")}}
                                disabled={isFetching}
                            >
                                <FiSearch
                                    size="22px"
                                    color="#868686"
                                    className=""
                                />
                            </button>
                        </div>
                    </div>
                </div>
            ) : isFetching ? (
                <Lottie
                    animationData={loadingAnimation}
                    className="w-20 mx-auto mt-40  "
                />
            ) : (
                <div>
                    <div
                        className=" p-4  gap-4 items-center
                    flex justify-between flex-wrap"
                    >
                        <h1 className="text-2xl font-bold text-purple-700 text-center ">
                            Food Inquiry App
                        </h1>
                        <div className="flex ">
                            <div className="flex bg-[#F4F4F4]  items-center rounded-full  px-4 py-3  justify-between">
                                <FiSearch
                                    size="22px"
                                    color="#868686"
                                    className=""
                                />
                                <input
                                    className="pl-2 outline-none"
                                    type="text"
                                    placeholder="Search a recipe..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            <Button
                                className="ml-2 bg-purple-600 text-white p-2 rounded-md"
                                onClick={() => {
                                    query && refetch()
                                    setQuery("")
                                }}
                                disabled={isFetching}
                            >
                                {isFetching ? "Searching..." : "Search"}
                            </Button>
                        </div>
                        <div className="flex justify-center mt-2">
                            <Link
                                href={"/restaurants"}
                                className="text-lg underline text-center "
                            >
                                Click here to view Restaurants nearby
                            </Link>
                        </div>
                    </div>
                    {recipes && recipes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6 p-4">
                            {recipes.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white  rounded-lg shadow-lg"
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.label}
                                        width={300}
                                        height={200}
                                        className="w-full h-50 object-cover rounded-md"
                                    />
                                    <div className=" p-4  ">
                                        <h2 className="text-[16px] font-semibold mt-2">
                                            {item.label}
                                        </h2>
                                        <p className="text-[14px]">
                                            Calories:{" "}
                                            {Math.floor(item.calories)} kcal
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
                    ) : (
                        <div className="h-full w-full flex items-center justify-center pt-20 font-semibold px-2">
                            <p className="text-purple-500">
                                No recipe matches your search. Try Searching for
                                another
                            </p>
                        </div>
                    )}
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
