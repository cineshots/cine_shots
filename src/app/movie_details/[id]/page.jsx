"use client"
import ContentWrapper from '@/components/ContentWrapper';
import React, { useEffect, useState } from 'react';
import { fetchDataFromApi, getFormatedTime } from "@/utils/fetchData";
import { Card, CardHeader, CardBody, Checkbox, Button, Input, Spinner} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MovieDetails = ({params}) => {

    const [data, setData] = useState(null);
    const [time, setTime] = useState ("");
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        setLoading(true);
        const response = await fetchDataFromApi('/api/movies_details', {id: params.id});
        setData(response?.items);
        setLoading(false);
    }

    const changeMovieStatus = async (event, status, id) => {
        if(event === false) return
        setLoading(true);
        const response = await fetchDataFromApi('/api/movies_status_update', {id, status});
        if(response?.success){
            toast.success(response?.message);
            fetchData();
        }else{
            toast.error(response?.error);
        }
        setLoading(false);
    }

    const updateMovieTimeStamp = async () => {
        setLoading(true);
        const response = await fetchDataFromApi('/api/movies_time_update', {time, id : params.id});
        if(response?.success){
            toast.success(response?.message);
            fetchData()
        }else{
            toast.error(response?.error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    },[])

    return (
        <ContentWrapper classname={'p-[10px]'}>
            <ToastContainer/>
            {
                loading ? (<div className="w-[100%] h-[100svh] absolute top-0 z-index-spinner flex items-center justify-center">
                    <Spinner color="teal" className="" />
                </div>) : null
            }
            {
                data ? (
                    <Card className="w-full flex-row px-[5px] relative bg-gray-50" variant="filled" color="#000" >
                        <CardHeader
                            shadow={false}
                            floated={false}
                            className="m-0 w-3/7 shrink-0 py-[8px]"
                        >
                            <img
                                src={data?.banner}
                                alt="card-image"
                                className="h-full w-[95px] object-cover rounded-[10px] bg-transparent"
                            />
                        </CardHeader>
                        <CardBody className="p-[10px]" >
                            <p className="pr-[5px] text-sm	font-semibold flex items-center" >Name  :  {data?.name}
                            </p>
                            <p className="text-sm font-normal">Genres  :  {data?.Genres}</p>
                            <p className="text-sm font-normal">Created At  :  {getFormatedTime(data?.createdAt, "DD MMM YY hh:mm a")}</p>
                            <p className="text-sm font-normal">Updated At  :  {getFormatedTime(data?.updatedAt, "DD MMM YY hh:mm a")}</p>
                            <p className="text-sm font-light">Time  :  {data?.time_stamp ?? "no data found"}</p>
                            <div className="flex w-max gap-[5px] -translate-x-[5px]">
                                <Checkbox className="h-[18px] w-[18px]" containerProps={{ style: { padding: '5px' } }} labelProps={{ style: { fontSize: '14px', fontWeight: '500' } }} color="amber" label="Download" defaultChecked={data?.status === 0} onChange={(e) => changeMovieStatus(e.target.checked, 0, data?._id)} />
                                <Checkbox className="h-[18px] w-[18px]" containerProps={{ style: { padding: '5px' } }} labelProps={{ style: { fontSize: '14px', fontWeight: '500' } }} color="teal" label="Watch" defaultChecked={data?.status === 1} onChange={(e) => changeMovieStatus(e.target.checked, 1, data?._id)} />
                                <Checkbox className="h-[18px] w-[18px]" containerProps={{ style: { padding: '5px' } }} labelProps={{ style: { fontSize: '14px', fontWeight: '500' } }} color="indigo" label="Upload" defaultChecked={data?.status === 2} onChange={(e) => changeMovieStatus(e.target.checked, 2, data?._id)} />
                            </div>

                            {/* <Button color="blue" size="sm" onClick={onClick} className="mt-[2px] rounded-[100px]">View Movie Details</Button> */}
                        </CardBody>

                    </Card>
                ) : null
            }

            <div className="w-full bg-gray-100 rounded-[10px] mt-[30px]">
                <Input label="Enter TimeStamp" placeholder='Enter timestamp' value={time} onChange={(e) => setTime(e.target.value)}/>
                <Button color="blue"  size="md" onClick={updateMovieTimeStamp} className="mt-[10px] rounded-[100px] w-full">Add Or Update TimeStamp</Button>
            </div>
        </ContentWrapper>
    )
}

export default MovieDetails