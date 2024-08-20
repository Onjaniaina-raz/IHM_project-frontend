import { Paper } from '@mui/material';
import { IconPictureInPicture } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  setMediaUrl: (url: string) => string;
}
const FileUploader = ({ fieldChange, setMediaUrl }: FileUploaderProps) => {

  const [files, setFiles] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState('');

  const onDrop = useCallback((acceptedFile: FileWithPath[]) => {
    const file = acceptedFile[0];
    setFiles([file]);
    fieldChange([file]);
    const url = URL.createObjectURL(file);
    setMediaUrl(url);
    setFileUrl(url);
  }, [fieldChange, setMediaUrl]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.gif', '.jpg', '.jpeg', '.svg']
    }
  })

  return (
    <>
      <div {...getRootProps()} className='w-full h-full'>
        <input {...getInputProps()} className="cursor-pointer" />
        {
          fileUrl ?
            (
              <div className="flex justify-center">
                <Paper className="my-auto">
                  <img src={fileUrl}
                    className='w-full object-cover'
                    style={{ height: '230px' }}
                    alt="image"
                  />
                </Paper>
              </div>
            ) : (
                <div className="flex justify-center cursor-pointer relative">
                  <IconPictureInPicture className='relative bottom-3 w-full text-theme-color-1 transform hover:scale-105 transtion-all duration-200 ease-in-out' style={{ height: '200px' }} />
                  <div className='absolute font-barlow text-theme-color-1 font-semibold bottom-0 text-lg'><p>add <span className='px-1'>a</span> profile <span className='ps-1'> pic </span></p></div>
                </div>
            )
        }
      </div>
    </>
  )

}

export default FileUploader
