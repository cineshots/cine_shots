import { getFormatedTime } from "@/utils/fetchData";
import {
    Card,
    CardHeader,
    CardBody,
  } from "@material-tailwind/react";

   
  export default function MovieListCard({item, onClick}) {
    return (
      <Card className="w-full max-w-[48rem] flex-row p-[10px]" onClick={onClick}>
        <CardHeader 
          shadow={false}
          floated={false}
          className="m-0 w-3/7 shrink-0 rounded-r-none"
        >
          <img
            src={item?.banner}
            alt="card-image"
            className="h-[150px] w-[100px] object-cover rounded-[10px]"
          />
        </CardHeader>
        <CardBody className="p-[10px]">
        <p className="text-base	font-semibold">Name  :  {item?.name}</p>
        <p className="text-sm font-normal">Genres  :  {item?.Genres}</p>
        <p className="text-sm font-normal">Created At  :  {getFormatedTime(item?.createdAt, "DD MMM YY hh:mm a")}</p>
        <p className="text-sm font-normal">Updated At  :  {getFormatedTime(item?.updatedAt, "DD MMM YY hh:mm a")}</p>
        <p className="text-sm font-light">Time  :  {item?.time_stamp ?? "no data found"}</p>
        
        </CardBody>
      </Card>
    );
  }