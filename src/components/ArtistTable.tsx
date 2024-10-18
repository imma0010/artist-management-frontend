"use client";
import { FunctionComponent, ReactElement } from "react";

interface ArtistTableProps {
  artists: Artist[]; // Changed Artists[] to Artist[] for clarity
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
} 

const ArtistTable: FunctionComponent<ArtistTableProps> = ({ artists, currentPage, totalPages, onPreviousPage, onNextPage }): ReactElement => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Artist Table</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Date of Birth</th>
            <th className="px-4 py-2 border">Gender</th>
            <th className="px-4 py-2 border">Address</th>
            <th className="px-4 py-2 border">First Release Year</th>
            <th className="px-4 py-2 border">No. of Albums Released</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {artists.length > 0 ? (
            artists.map((artist, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{artist.name}</td>
                <td className="px-4 py-2 border">{artist.dob.split("T")[0]}</td>
                <td className="px-4 py-2 border">{artist.gender === "m" ? "Male" : artist.gender === "f" ? "Female" : artist.gender === "o" ? "Other" : "N/A"}</td>
                <td className="px-4 py-2 border">{artist.address}</td>
                <td className="px-4 py-2 border">{artist.first_release_year}</td>
                <td className="px-4 py-2 border">{artist.no_of_albums_released}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="px-4 py-2 text-center">
                No artists found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ArtistTable;
