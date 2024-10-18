import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { toast } from "sonner";

interface EditArtistModalProps {
    artistId: Artist;
    onSave: (artist: Artist) => void;
    onClose: () => void;
}

const EditArtistModal: FunctionComponent<EditArtistModalProps> = ({ artistId, onSave, onClose }): ReactElement => {
    const [artist, setArtist] = useState<Artist | undefined>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/artist/${artistId}`);

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
            onClose();
        } catch (error) {
            console.error("Error updating artist:", error);
            toast.error(error as any);
        }
    };

    if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Artist</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={artist?.name || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={artist?.dob.split("T")[0]} // Convert to proper format
              onChange={handleChange}
            />
          </label>
          <label>
            Gender:
            <select name="gender" value={artist?.gender || ""} onChange={handleChange}>
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="o">Other</option>
            </select>
          </label>
          {/* Add more fields as needed */}
          <div className="modal-actions">
            <button type="submit" className="bg-blue-500 text-white">Save</button>
            <button type="button" onClick={onClose} className="bg-gray-500 text-white">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditArtistModal