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
  Alert,
  Button,
} from "@windmill/react-ui";
import { ChartsIcon } from "../icons";
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
  const [progress1, setProgress1] = useState(0);
  const [change, setChange] = useState(false);
  const [change1, setChange1] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile1, setSelectedFile1] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    setChange(true);
  };
  const handleFileInput1 = (e) => {
    setSelectedFile1(e.target.files[0]);
    setChange1(true);
  };

  const uploadFile = (file) => {
    const params = {
      Body: file,
      Bucket: S3_BUCKET,
      Key: user.username + " " + Date(),
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
  const uploadFile1 = (file1) => {
    const params = {
      Body: file1,
      Bucket: S3_BUCKET,
      Key: user.username + " excel file " + Date(),
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt1) => {
        setProgress1(Math.round((evt1.loaded / evt1.total) * 100));
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
          <Label>
            <span>Video</span>
            <p className="text-gray-600 dark:text-gray-400">
              <Input type="file" onChange={handleFileInput} required />
            </p>
            <HelperText valid>
              The Video uploading progress is {progress}%
            </HelperText>
          </Label>
          <br />
          <a href="https://uploadedvideos121.s3.ap-south-1.amazonaws.com/kerela_blasters%40fcthis+is+excelTue+Oct+18+2022+23%3A15%3A08+GMT%2B0530+(India+Standard+Time)">
            <Button layout="outline" iconRight={ChartsIcon}>
              {" "}
              Download the template spreadsheet
            </Button>
          </a>
          <br />
          <br />
          <Label>
            <span>Spreadsheet</span>
            <p className="text-gray-600 dark:text-gray-400">
              <Input type="file" onChange={handleFileInput1} required />
            </p>
            <HelperText valid>
              The Spreadsheet uploading progress is {progress1}%
            </HelperText>
          </Label>
          <br />
          <br />
          {change1 && change ? (
            <>
              {" "}
              <Button
                onClick={() => {
                  uploadFile(selectedFile);
                  uploadFile1(selectedFile1);
                }}
              >
                {" "}
                Upload Files
              </Button>{" "}
            </>
          ) : (
            <>
              {" "}
              <Button
                disabled
                onClick={() => {
                  uploadFile(selectedFile);
                  uploadFile1(selectedFile1);
                }}
              >
                {" "}
                Upload Files
              </Button>{" "}
            </>
          )}
          {progress + progress1 == 200 ? (
               (setTimeout(function () {
                  window.location.reload();
                }, 3000)) &&
            <>
                {" "}
              <div
                class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
                role="alert"
              >
                <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                  New
                </span>
                <span class="font-semibold mr-2 text-left flex-auto">
                  File has been transferred sucessfully.
                </span>
                <svg
                  class="fill-current opacity-75 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                </svg>
              </div>
            </>
          ) : (
            <></>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default UploadVideo;
