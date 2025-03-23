import { GrClose } from "react-icons/gr"

const UsdRateModal = ({
    setShowModal,
    cost,
    usdRate,
}: {
    setShowModal: (val: boolean) => void
    cost: number
    usdRate: number
}) => {
    return (
        <div className="fixed inset-4 bg-opacity-50 backdrop-blur-xs flex items-center justify-center">
            <div className="bg-white p-6 rounded-md  h-[200px] w-[350px]">
                <div className="flex justify-end">
                    <GrClose
                        onClick={() => setShowModal(false)}
                        onKeyDown={() => setShowModal(false)}
                        aria-hidden="true"
                        aria-label="close icon"
                        className="cursor-pointer"
                    />
                </div>
                <div className="flex items-center justify-between mt-2">
                    <h5 className="font-bold text-2xl md:text-[28px]">
                        Conversion Rate
                    </h5>
                </div>
                <p className="mt-2 text-lg">This is ₦{cost} converted to naira</p>
                <p>USD Equivalent: <span className="font-bold mt-1">${(cost * usdRate).toFixed(2)}</span> </p>
            </div>
        </div>
    )
}

export default UsdRateModal
