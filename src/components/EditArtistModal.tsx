import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { toast } from "sonner";

interface EditArtistModalProps {
    artistId: string;
    onSave: (artist: Artist) => void;
    onClose: () => void;
}

const EditArtistModal: FunctionComponent<EditArtistModalProps> = ({ artistId, onSave, onClose }): ReactElement => {
    const [artist, setArtist] = useState<Artist | undefined>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/artist/${artistId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": localStorage.getItem("token") || " ",
                        "Content-Type": "application/json",
                    },
                });

                const result = await response.json();
                setArtist(result.data);
            } catch (error) {
                toast.error(error as any);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchArtist();
    }, [artistId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setArtist({ ...artist, [e.target.name]: e.target.value } as Artist);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            onSave(artist as Artist);
        } catch (error) {
            console.error("Error updating artist:", error);
            toast.error(error as any);
        }
    };

    if (loading) {
    return <div>Loading...</div>;
  }

  return ( 
        <div
          id="artist-modal"
          className="fixed backdrop-blur-sm top-0 right-0 left-0 z-50 justify-center items-center w-full h-[calc(100%-1rem)] max-h-full flex overflow-y-auto overflow-x-hidden"
          role="dialog"
          aria-hidden="true"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Artist Details
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center"
                  onClick={() => onClose()}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Modal body */}
              <div className="p-6">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Artist Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={artist?.name}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter artist name"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="gender"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Gender
                    </label>
                    <select
                      name="gender"
                      id="gender"
                      value={artist?.gender}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    >
                        <option value="">Select Gender</option>
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                        <option value="o">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="dob"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Date of Birth
                    </label>
                    <input
                      name="dob"
                      type="date"
                      id="dob"
                      value={artist?.dob.split("T")[0]}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address
                    </label>
                    <input
                      name="address"
                      type="text"
                      id="address"
                      value={artist?.address}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter address"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="firstReleaseYear"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Release Year
                    </label>
                    <input
                      name="first_release_year"
                      type="number"
                      id="firstReleaseYear"
                      value={artist?.first_release_year}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter first release year"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="noOfAlbumsReleased"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Number of Albums Released
                    </label>
                    <input
                      name="no_of_albums_released"
                      type="number"
                      id="noOfAlbumsReleased"
                      value={artist?.no_of_albums_released}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter number of albums released"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    Edit Artist
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
  );
}

export default EditArtistModal