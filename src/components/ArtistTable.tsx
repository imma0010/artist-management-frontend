"use client";
import { FunctionComponent, ReactElement } from "react";

interface ArtistTableProps {
  artists: Artist[]; // Changed Artists[] to Artist[] for clarity
} 

const ArtistTable: FunctionComponent<ArtistTableProps> = ({ artists }): ReactElement => {
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
            <th className="px-4 py-2 border">Created At</th>
            <th className="px-4 py-2 border">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {artists.length > 0 ? (
            artists.map((artist, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{artist.name}</td>
                <td className="px-4 py-2 border">{artist.dob}</td>
                <td className="px-4 py-2 border">{artist.gender}</td>
                <td className="px-4 py-2 border">{artist.address}</td>
                <td className="px-4 py-2 border">{artist.first_release_year}</td>
                <td className="px-4 py-2 border">{artist.no_of_albums_released}</td>
                <td className="px-4 py-2 border">{artist.created_at}</td>
                <td className="px-4 py-2 border">{artist.updated_at}</td>
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
    </div>
  );
};

export default ArtistTable;
