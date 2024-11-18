import addProperty from "@/actions/addProperty"

const PropertyAddForm = () => {
    return (
        <form action={addProperty}>
            <h2 className='text-3xl mb-5'>Add President</h2>
            <div>
                <label htmlFor="name">Property Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="border p-2 w-full"
                    required
                />
            </div>
            <div>
                <label htmlFor="yearsInOffice">Years in Office:</label>
                <input
                    type="text"
                    id="yearsInOffice"
                    name="yearsInOffice"
                    className="border p-2 w-full"
                    required
                />
            </div>

            <div>
                <label>Vice Presidents:</label>
                <input
                    type="text"
                    name="vicePresidents"
                    className="border p-2 w-full mb-2"
                    required
                />
            </div>
            <div>
                <label htmlFor="photo">Photo URL:</label>
                <input
                    type="text"
                    id="photo"
                    name="photo"
                    className="border p-2 w-full"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Submit Property
            </button>
        </form>
    )
}

export default PropertyAddForm