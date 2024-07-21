
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Switch, Input, Card, CardHeader, CardBody, Typography, CardFooter, Button} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import { DialogSizes } from "../movie_upload_dialog";
import { fetchDataFromApi } from "@/utils/fetchData";
import MovieListCard from "../movie_list_card";
import { useRouter } from 'next/navigation';

const tablist = [
    {
      label: "Download",
      value: 0,
    },
    {
      label: "Watch",
      value: 1,
    },
    {
      label: "Upload",
      value: 2,
    },
];


const TabsCustomAnimation = ({params}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(Number(0));
  const [page, setPage] = React.useState(1);
  const [dialog, setDialog] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await fetchDataFromApi('/api/movies_list', {page, activeTab, category : params.category});
    setData(response);


  }

  useEffect(() => {
    fetchData();
  }, [page, activeTab])
  

    return (
        <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent pt-2"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
          }}
        >
          {tablist?.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={activeTab === value ? "text-gray-900" : ""}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="relative">
        <DialogSizes open={dialog} onClick={() => setDialog(!dialog)} category={params.category}/>
             {tablist.map(({ value }) => (
            <TabPanel key={value} value={value} className="p-0">
              <Card className="h-full w-full">
                <CardHeader
                  floated={false}
                  shadow={false}
                  className="rounded-none  mx-2 my-1"
                >
                  <div className="grid grid-cols-9 gap-[5px] justify-center items-center h-[55px]">
                    <div className="col-span-5">
                      <Input
                        label="Search"
                        icon={<MagnifyingGlassIcon className="h-5" />}
                      />
                    </div>

                       <Button variant="gradient" className="flex items-center gap-[5px] col-span-4 h-[45px] px-5" onClick={() => setDialog(!dialog)}>
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={2}
                           stroke="currentColor"
                           className="h-5 w-5"
                         >
                           <path
                             strokeLinecap="round"
                             strokeLinejoin="round"
                             d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                           />
                         </svg>
                         Upload Movies
                       </Button>

                  </div>
                </CardHeader>
                <CardBody className=" px-[10px] py-0 flex flex-col gap-[10px] overflow-scroll table-height">
                  {
                    data && data?.items?.map((row, index) => (
                      <MovieListCard item={row} onClick={() => router.push(`/movie_details/${row?._id}`)} key={index}/>
                    ))
                  }
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 absolute bottom-0 bg-white w-full">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    Page {page} of {data?.totalPages }
                  </Typography>
                  <div className="flex gap-2">
                    <Button variant="outlined" size="sm"  onClick={() => setPage(page - 1)} disabled={page === 1}>
                      Previous
                    </Button>
                    <Button variant="outlined" size="sm"  onClick={() => setPage(page + 1)} disabled={page === data?.totalPages}>
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabPanel>
          ))} 
    
        </TabsBody>
      </Tabs>
    );
  }

export default TabsCustomAnimation;