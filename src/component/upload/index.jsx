import React from 'react';
import Axios from 'axios';

function Upload() {
  const [precentUpload, setprecentUpload] = React.useState(0);

  const changePdf = async (e) => {
    // append new form
    const form = new FormData();
    form.append('pdfFile', e.target.files[0]);
    // upload
    try {
      const res = await Axios.post('http://localhost:5000/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          setprecentUpload(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      });
      console.log(res.data);
    } catch (error) {}
  };
  return (
    <div>
      {console.log(precentUpload)}

      <form>
        <input type="file" name="hahah" onChange={changePdf} />
        {precentUpload}
      </form>
    </div>
  );
}

export default Upload;
