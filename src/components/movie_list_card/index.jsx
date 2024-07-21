import { getFormatedTime } from "@/utils/fetchData";
import {
    Card,
    CardHeader,
    CardBody,
    Checkbox,
    Button,
  } from "@material-tailwind/react";

   
  export default function MovieListCard({item, onClick, changeStatus}) {
    return (
      <Card className="w-full flex-row px-[5px] relative bg-gray-50" variant="filled" color="#000">
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
        <CardBody className="p-[10px] flex flex-col gap-[5px]" >
          <p className="pr-[5px] text-sm	font-semibold flex items-center" >Name  :  {item?.name} </p>
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