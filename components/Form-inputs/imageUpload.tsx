/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import React from "react";
type ImageInputProps = {
title: string;
imageUrl: string;
setImageUrl: any;
endpoint: any;
};
export default function ImageInput({
title,
imageUrl,
setImageUrl,
endpoint,
}: ImageInputProps) {
return (
<Card className="overflow-hidden max-w-2xl mx-auto h-[300px]">
  <CardHeader>
    <CardTitle>{title}</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid gap-2">
      <Image
        alt={title}
        className="h-40 w-40 mx-auto rounded-md object-contain"
        height="300"
        src={imageUrl}
        width="300"
      />
      <UploadButton
        className="col-span-full"
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
 
          setImageUrl(res[0].url);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  </CardContent>
</Card>
 
);
}
 