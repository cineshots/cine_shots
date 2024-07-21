"use client"
import ContentWrapper from "@/components/ContentWrapper";
import { fetchDataFromApi } from "@/utils/fetchData";
import { Card, Input, Button, Typography} from "@material-tailwind/react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';


  const Login = () =>  {
    const router = useRouter();
    const [user, setUser] = useState ({
      name : "",
      password : ""
    })
    const [loading, setLoading] = useState(false);

    const Login = async () => {
      setLoading(true);
      const response = await fetchDataFromApi('/api/login', {name : user?.name, password : user?.password});
      if(response?.success){
        toast.success(response?.message);
        router.replace("/home");
      }else{
        toast.error(response?.error);
      }
      setLoading(false);
    }

    return (
       <ContentWrapper classname={'flex justify-center items-center'}>
        <ToastContainer />
        <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you again !
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="username"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={user?.name}
              onChange={(e) => setUser({...user, name : e.target.value})}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={user?.password}
              onChange={(e) => setUser({...user, password : e.target.value})}
            />
          </div>
          
          <Button className="mt-6 flex items-cenetr justify-center" fullWidth loading={loading} onClick={Login}>
            sign in
          </Button>
          
        </form>
      </Card>
       </ContentWrapper>
    );
  }


export default Login