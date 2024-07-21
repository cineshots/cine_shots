import React from "react";
import {
  Button,
  Dialog,
  DialogFooter,
} from "@material-tailwind/react";
 
export default function DeleteDialog({open, close, onClick}) {

  return (
    <>
     
      <Dialog open={open} handler={open}>
        <p className="w-full flex items-center justify-center text-lg p-[16px] font-semibold">Are you sure want to delete</p>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={close}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={onClick}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}