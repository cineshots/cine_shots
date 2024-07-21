import { getFormatedTime } from "@/utils/fetchData";
import {
    Card,
    CardHeader,
    CardBody,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
import DeleteDialog from "../DeleteDialog";
import { useState } from "react";

   
  export default function MovieListCard({item, onClick, changeStatus, onclick2}) {
    const [dialog, setDialog] = useState(false);


    return (
      <Card className="w-full flex-row px-[5px] relative bg-gray-50" variant="filled" color="#000">
        <DeleteDialog open={dialog} close={() => setDialog(false)} onClick={() => {onclick2();setDialog(false);}}/>
        <CardHeader 
          shadow={false}
          floated={false}
          className="m-0 w-3/7 shrink-0 py-[8px]"
        >
          <img
            src={item?.banner}
            alt="card-image"
            className="h-full w-[95px] object-cover rounded-[10px] bg-transparent"
          />
        </CardHeader>
        <CardBody className="p-[10px] flex flex-col gap-[5px] w-full" >
          <p className="pr-[5px] text-sm w-full	font-semibold flex items-center" >Name  :  {item?.name}
            <button onClick={() => setDialog(true)} type="button" className="ml-auto cursor-pointer"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 p-[5px] bg-blue-500 rounded-md text-white " >
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg></button>
            </p>
          <p className="text-sm font-normal">Genres  :  {item?.Genres}</p>
          <p className="text-sm font-normal">Created At  :  {getFormatedTime(item?.createdAt, "DD MMM YY hh:mm a")}</p>
          <p className="text-sm font-normal">Updated At  :  {getFormatedTime(item?.updatedAt, "DD MMM YY hh:mm a")}</p>
        {/* <p className="text-sm font-light">Time  :  {item?.time_stamp ?? "no data found"}</p> */}
          {/* <div className="flex w-max gap-[5px] -translate-x-[5px]">
            <Checkbox className="h-[18px] w-[18px]" containerProps={{style : {padding : '5px'}}} labelProps={{ style: { fontSize: '14px', fontWeight : '500' } }} color="amber" label="Download" defaultChecked={item?.status === 0} onChange={(e) => changeStatus(e.target.checked, 0, item?._id)}/>
            <Checkbox className="h-[18px] w-[18px]" containerProps={{style : {padding : '5px'}}} labelProps={{ style: { fontSize: '14px', fontWeight : '500' } }} color="teal" label="Watch" defaultChecked={item?.status === 1} onChange={(e) => changeStatus(e.target.checked, 1, item?._id)}/>
            <Checkbox className="h-[18px] w-[18px]" containerProps={{style : {padding : '5px'}}} labelProps={{ style: { fontSize: '14px', fontWeight : '500' } }} color="indigo" label="Upload" defaultChecked={item?.status === 2} onChange={(e) => changeStatus(e.target.checked, 2, item?._id)}/>
          </div> */}
          <Button color="blue" size="sm" onClick={onClick} className="mt-[2px] rounded-[100px]">View Movie Details</Button>
        </CardBody>
        
      </Card>
    );
  }