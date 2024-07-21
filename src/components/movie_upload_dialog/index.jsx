import React, { useState } from "react";
import { Button, Dialog, DialogBody, DialogFooter, Input, Typography} from "@material-tailwind/react";
import { fetchDataFromApi } from "@/utils/fetchData";


export function DialogSizes({ open, onClick, category }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        image : "",
        name : "",
        genres : ""
    })

    const uploadMoviesDetails = async () => {
        setLoading(true);
        const response = await fetchDataFromApi('/api/movies_upload', {image : form.image, name : form?.name, genres : form?.genres, category});
        if(response?.success){
            onClick();
        }else{
            setError(response?.error);
        }
        setLoading(false);
    }

    return (
        <>  
            <Dialog
                open={open}
                size={"xs"}
                // handler={onClick}
                className=""
            >
                <p className="text-base text-center font-semibold p-[10px]"> Upload Movie Details Here</p>
                <DialogBody>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-5">
                            Poster Link
                        </Typography>
                        <Input
                            type="text"
                            size="lg"
                            placeholder="Poster Link"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={form?.image}
                            onChange={(e) => setForm({...form, image : e.target.value})}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-5">
                            Movie Name
                        </Typography>
                        <Input
                            type="text"
                            size="lg"
                            placeholder="Movie Name"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={form?.name}
                            onChange={(e) => setForm({...form, name : e.target.value})}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-5">
                            Genres
                        </Typography>
                        <Input
                            type="text"
                            size="lg"
                            placeholder="Genres"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={form?.genres}
                            onChange={(e) => setForm({...form, genres : e.target.value})}
                        />
                    </div>
                    <p className="pt-[10px] text-red-600 text-sm">{error}</p>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={onClick}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={() => uploadMoviesDetails()} loading={loading}
                    >
                        <span>Upload</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}