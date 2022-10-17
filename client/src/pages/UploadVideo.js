import React, { useState } from "react";
import AWS from "aws-sdk";
import { useAuthUser } from "use-eazy-auth";
import PageTitle from "../components/Typography/PageTitle";
import {
  Card,
  CardBody,
  Input,
  Label,
  Dropdown,
  DropdownItem,
  HelperText,
  Button,
} from "@windmill/react-ui";

const S3_BUCKET = "uploadedvideos121";
const REGION = "ap-south-1";

AWS.config.update({
  accessKeyId: "AKIAXM23T6GRHU64RJ77",
  secretAccessKey: "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",
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const UploadVideo = () => {
  const { user } = useAuthUser();
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file) => {
    const params = {
      Body: file,
      Bucket: S3_BUCKET,
      Key: user.username + Date(),
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <div>
      <PageTitle>Upload Video</PageTitle>
      <Card>
        <CardBody>
          <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
            You can upload the videos here we will analyze and make it live on
            the platform!
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <Input type="file" onChange={handleFileInput} />
          </p>
          <HelperText valid>
            The Video uploading progress is {progress}%
          </HelperText>
          <br />
          <br />

          <Button onClick={() => uploadFile(selectedFile)}>
            {" "}
            Upload to S3
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default UploadVideo;
